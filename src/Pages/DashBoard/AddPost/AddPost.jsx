import { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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


  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  const currentUser = users.find(u => u.email === user?.email);

  useEffect(() => {
    const fetchMsgCount = async () => {
      // If no user, stop loading immediately
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const res = await axiosSecure.get(`/allMsg/count/${user.email}`);
        setMsgCount(res.data.count);

        // Check if user should see form based on membership
        // validation against users list might be delayed if usersLoading is true,
        // but we don't want to block the whole UI.
        // We initially show form, and then hide it if we confirm they are limited.
        if (currentUser && currentUser.membership !== 'member' && res.data.count >= 5) {
          setShowForm(false);
        }
      } catch (error) {
        console.error('Error fetching message count:', error);
        setMsgCount(0);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchMsgCount();
    } else {
      setLoading(false);
    }
  }, [user?.email, axiosSecure, currentUser, usersLoading]);


  const handleAddPost = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!user?.email) {
      Swal.fire({
        icon: "error",
        title: "Not Logged In",
        text: "Please log in to post a message",
      });
      navigate('/login');
      return;
    }

    const form = e.target;
    const photo = form.image.value;
    const name = form.name.value;
    const email = form.email.value;
    const title = form.title.value;
    const text = form.text.value;
    const tag = value?.value || '';
    const upvote = parseInt(form.upvote.value, 10);
    const downvote = parseInt(form.downvote.value, 10);

    // Validate required fields
    if (!tag) {
      Swal.fire({
        icon: "error",
        title: "Missing Tag",
        text: "Please select a category for your post",
      });
      return;
    }

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

    console.log('Submitting post...', msgItems);

    try {
      const res = await axiosSecure.post('/allMsg', msgItems);

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

        if (currentUser && currentUser.membership !== 'member' && msgCount + 1 >= 5) {
          setShowForm(false);
        }

        // Redirect to home page posts section
        navigate('/#posts');
      }
    } catch (error) {
      console.error('Error posting message:', error);
      console.error('Error response:', error.response);

      let errorMessage = "Could not post your message. Please try again.";

      if (error.response?.status === 401) {
        errorMessage = "Your session has expired. Please log in again.";
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else if (error.response?.status === 403) {
        errorMessage = error.response?.data?.message || "You have reached the maximum number of posts allowed.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Post Failed",
        text: errorMessage,
      });
    }
  };

  const handleBecomeMember = () => {
    navigate('/membership');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>DialogueDock | Add Post</title>
      </Helmet>
      <div className="hero min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
        <div className="card w-full max-w-3xl shadow-2xl bg-white rounded-2xl overflow-hidden border border-gray-100 p-8">
          {showForm ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-primary mb-2">Share Your Thoughts</h1>
                <p className="text-gray-600">Connect with the community by sharing your ideas</p>
              </div>
              <form ref={formRef} onSubmit={handleAddPost} className="space-y-6">
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
                    maxMenuHeight={400}
                    menuPortalTarget={document.body}
                    menuPosition="fixed"
                    menuPlacement="auto"
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: '#14b8a6',
                        borderRadius: '0.5rem',
                        padding: '2px',
                      }),
                      menu: (base) => ({
                        ...base,
                        zIndex: 9999,
                      }),
                      menuPortal: (base) => ({
                        ...base,
                        zIndex: 9999,
                      }),
                      menuList: (base) => ({
                        ...base,
                        maxHeight: '400px',
                        padding: 0,
                      }),
                      option: (base, state) => ({
                        ...base,
                        padding: '12px 16px',
                        backgroundColor: state.isFocused ? '#ccfbf1' : state.isSelected ? '#14b8a6' : 'white',
                        color: state.isSelected ? 'white' : 'black',
                        cursor: 'pointer',
                      }),
                    }}
                  />
                </div>

                {/* Hidden Inputs for Votes */}
                <input name="upvote" type="hidden" defaultValue="0" />
                <input name="downvote" type="hidden" defaultValue="0" />

                <div className="form-control mt-8">
                  <button
                    type="submit"
                    className="btn btn-primary w-full text-white font-bold text-lg hover:btn-secondary transition-all shadow-lg hover:shadow-primary/30"
                  >
                    📤 Publish Post
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="card-body text-center p-10">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Post Limit Reached</h2>
              <p className="text-gray-500 mb-6">You've posted {msgCount} times. Become a member to enjoy unlimited posting privileges and premium features!</p>
              <button className="btn btn-secondary w-full text-white font-bold shadow-lg hover:shadow-secondary/30 transition-all" onClick={handleBecomeMember}>✨ Upgrade Membership</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddPost;
