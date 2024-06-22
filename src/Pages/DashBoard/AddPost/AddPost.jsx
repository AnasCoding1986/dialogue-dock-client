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
    <div className="hero min-h-screen bg-base-200">
      <div className="card w-1/2 shadow-2xl bg-[#e5f4fa]">
        {showForm ? (
          <>
            <h1 className="text-2xl uppercase border-y-4 py-4 text-center font-LuckiestGuy">Share your thought</h1>
            <form ref={formRef} onSubmit={handleAddPost} className="card-body">
              <div className="flex gap-2">
                <div className="w-1/2 form-control">
                  <label className="label">
                    <span className="label-text font-medium">Author Image</span>
                  </label>
                  <input name="image" type="text" defaultValue={aPhoto} placeholder="Image URL" className="input input-bordered w-full " />
                </div>
                <div className="w-1/2 form-control">
                  <label className="label">
                    <span className="label-text font-medium">Author Name</span>
                  </label>
                  <input name="name" type="text" defaultValue={aName} placeholder="Author Name" className="input input-bordered w-full " />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-1/2 form-control">
                  <label className="label">
                    <span className="label-text font-medium">Author Email</span>
                  </label>
                  <input name="email" type="email" defaultValue={aEmail} placeholder="Email" className="input input-bordered w-full " />
                </div>
                <div className="w-1/2 form-control">
                  <label className="label">
                    <span className="label-text font-medium">Post Title</span>
                  </label>
                  <input name="title" type="text" required placeholder="Post Title" className="input input-bordered w-full " />
                </div>
              </div>
              <div className="form-control flex items-center">
                <label className="label">
                  <span className="label-text font-medium">Description</span>
                </label>
                <textarea name="text" required className="textarea textarea-lg w-full" placeholder="Description"></textarea>
              </div>
              <div className="form-control flex items-center">
                <label className="label">
                  <span className="label-text font-medium">Select Tag</span>
                </label>
                <Select
                  options={options}
                  required
                  name='tag'
                  value={value}
                  placeholder="Select Tag"
                  onChange={setValue}
                  styles={{
                    container: (base) => ({
                      ...base,
                      width: '100%',
                    }),
                    control: (base) => ({
                      ...base,
                      width: '100%',
                      borderColor: '#bde9fa',
                    }),
                    menu: (base) => ({
                      ...base,
                      width: '100%',
                    }),
                  }}
                />
              </div>
              <div className="flex gap-2">
                <div className="w-1/2 form-control">
                  <label className="label">
                    <span className="label-text font-medium">UpVote</span>
                  </label>
                  <input name="upvote" type="number" defaultValue="0" min="0" readOnly className="input input-bordered w-full " />
                </div>
                <div className="w-1/2 form-control">
                  <label className="label">
                    <span className="label-text font-medium">DownVote</span>
                  </label>
                  <input name="downvote" type="number" defaultValue="0" min="0" readOnly className="input input-bordered w-full " />
                </div>
              </div>
              <div className="form-control mt-6">
                <input className="btn bg-[#A7E6FF] text-black border-none font-bold btn-primary" type="submit" value="Post" />
              </div>
            </form>
          </>
        ) : (
          <div className="card-body text-center">
            <p className="text-lg font-bold mb-4">Become a member to post more than five messages.</p>
            <button className="btn bg-[#A7E6FF] text-black border-none font-bold btn-primary" onClick={handleBecomeMember}>Become a Member</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPost;
