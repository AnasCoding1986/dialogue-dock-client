import { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const { user } = useAuth();
  const aName = user?.displayName;
  const aPhoto = user?.photoURL;
  const aEmail = user?.email;
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [value, setValue] = useState(null);
  const [msgCount, setMsgCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const formRef = useRef(null);

  const options = [
    { value: 'coding', label: 'Coding' },
    { value: 'education', label: 'Education' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'environment', label: 'Environment' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'food', label: 'Food' },
    { value: 'health', label: 'Health' },
    { value: 'politics', label: 'Politics' },
    { value: 'travel', label: 'Travel' },
  ];

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  const currentUser = users.find(u => u.email === user.email);

  useEffect(() => {
    const fetchMsgCount = async () => {
      if (user) {
        const res = await axiosSecure.get(`/allMsg/count/${user.email}`);
        setMsgCount(res.data.count);
        setLoading(false);

        if (currentUser?.membership !== 'member' && res.data.count >= 5) {
          setShowForm(false);
        }
      }
    };
    fetchMsgCount();
  }, [user, axiosSecure, currentUser]);

  const handleAddPost = e => {
    e.preventDefault();

    const form = e.target;
    const photo = form.image.value;
    const name = form.name.value;
    const email = form.email.value;
    const title = form.title.value;
    const text = form.text.value;
    const tag = value?.value || '';
    const upvote = parseInt(form.upvote.value, 10);
    const downvote = parseInt(form.downvote.value, 10);

    const now = new Date();
    const postDate = now.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
    const postTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm am/pm

    const commentsCount = 0;
    const votesCount = 0;

    const msgItems = {
      photo,
      name,
      email,
      title,
      text,
      tag,
      upvote,
      downvote,
      postTime: `${postDate} ${postTime}`,
      commentsCount,
      votesCount
    };

    axiosSecure.post('/allMsg', msgItems)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Message posted successfully",
            showConfirmButton: false,
            timer: 1500
          });

          formRef.current.reset();
          setValue(null);
          setMsgCount(msgCount + 1);

          if (currentUser.membership !== 'member' && msgCount + 1 >= 5) {
            setShowForm(false);
          }
        }
      });
  }

  const handleBecomeMember = () => {
    navigate('/membership');
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hero min-h-screen bg-gray-50 py-10">
      <div className="card w-full max-w-3xl shadow-2xl bg-white rounded-2xl overflow-hidden border border-gray-100">
        {showForm ? (
          <>
            <h1 className="text-3xl font-montserrat font-bold text-center mb-6 text-primary">Share Your Thoughts</h1>
            <form ref={formRef} onSubmit={handleAddPost} className="card-body p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Author Image</span>
                  </label>
                  <input name="image" type="text" defaultValue={aPhoto} placeholder="Image URL" className="input input-bordered input-primary w-full bg-white" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Author Name</span>
                  </label>
                  <input name="name" type="text" defaultValue={aName} placeholder="Author Name" className="input input-bordered input-primary w-full bg-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Author Email</span>
                  </label>
                  <input name="email" type="email" defaultValue={aEmail} placeholder="Email" className="input input-bordered input-primary w-full bg-white" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Post Title</span>
                  </label>
                  <input name="title" type="text" required placeholder="Enter an engaging title" className="input input-bordered input-primary w-full bg-white" />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Description</span>
                </label>
                <textarea name="text" required className="textarea textarea-primary textarea-lg w-full bg-white h-32" placeholder="What's on your mind?"></textarea>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Select Tag</span>
                </label>
                <Select
                  options={options}
                  required
                  name='tag'
                  value={value}
                  placeholder="Select a category..."
                  onChange={setValue}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: '#14b8a6', // secondary color
                      borderRadius: '0.5rem',
                      padding: '2px',
                    }),
                  }}
                />
              </div>

              {/* Hidden Inputs for Votes */}
              <input name="upvote" type="hidden" defaultValue="0" />
              <input name="downvote" type="hidden" defaultValue="0" />

              <div className="form-control mt-6">
                <input className="btn btn-primary w-full text-white font-bold text-lg hover:btn-secondary transition-all" type="submit" value="Publish Post" />
              </div>
            </form>
          </>
        ) : (
          <div className="card-body text-center p-10">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Post Limit Reached</h2>
            <p className="text-gray-500 mb-6">Become a member to enjoy unlimited posting privileges and premium features.</p>
            <button className="btn btn-secondary w-full text-white font-bold" onClick={handleBecomeMember}>Upgrade Membership</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPost;
