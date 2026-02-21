import { useState, useRef } from 'react';
import Select from 'react-select';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddPost = () => {
    const { user } = useAuth();
    const aName = user?.displayName;
    const aPhoto = user?.photoURL;
    const aEmail = user?.email;
    const axiosSecure = useAxiosSecure();

    const [value, setValue] = useState(null);
    const formRef = useRef(null); // Add a ref to the form

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

    const handleAddPost = async (e) => {
        e.preventDefault();

        const form = e.target;
        const photo = form.image.value;
        const name = form.name.value;
        const email = form.email.value;
        const title = form.title.value;
        const text = form.text.value;
        const tag = value?.value || ''; // Get the selected tag value
        const upvote = parseInt(form.upvote.value, 10); // Parse as integer
        const downvote = parseInt(form.downvote.value, 10); // Parse as integer

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
        const postTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format time as hh:mm AM/PM

        const commentsCount = 0; // Initial value as integer
        const votesCount = 0; // Initial value as integer

        const msgItems = {
            photo,
            name,
            email,
            title,
            text,
            tag,
            upvote,
            downvote,
            postTime: `${postDate} ${postTime}`, // Combine date and time
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

                formRef.current.reset(); // Reset the form
                setValue(null); // Reset the select value
            }
        } catch (error) {
            console.error('Error posting message:', error);
            console.error('Error response:', error.response);

            let errorMessage = "Could not post your message. Please try again.";

            if (error.response?.status === 401) {
                errorMessage = "Your session has expired. Please log in again.";
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
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="card w-1/2 shadow-2xl bg-[#e5f4fa]">
                <h1 className="text-2xl uppercase border-y-4 py-4 text-center font-LuckiestGuy">Share your thought</h1>

                {/* Community Ethics Notice */}
                <div className="mx-6 mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl mt-0.5">⚠️</span>
                        <div>
                            <h4 className="font-bold text-amber-800 text-sm mb-1">Community Guidelines</h4>
                            <ul className="text-xs text-amber-700 space-y-0.5 list-disc list-inside">
                                <li>Be respectful — no hate speech, harassment, or personal attacks</li>
                                <li>No spam, misleading content, or self-promotion</li>
                                <li>Respect others' privacy — don't share personal information</li>
                                <li>Stay on topic and contribute constructively</li>
                            </ul>
                            <p className="text-xs text-amber-600 mt-2 italic">Violating these rules may result in post removal or account action.</p>
                        </div>
                    </div>
                </div>

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
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            menuPlacement="auto"
                            styles={{
                                container: (base) => ({
                                    ...base,
                                    width: '100%',
                                }),
                                control: (base) => ({
                                    ...base,
                                    width: '100%',
                                    borderColor: '#bde9fa',
                                    minHeight: '45px',
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
                                    minHeight: '45px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: state.isFocused ? '#e5f4fa' : state.isSelected ? '#A7E6FF' : 'white',
                                    color: 'black',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#e5f4fa',
                                    },
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
            </div>
        </div>
    );
};

export default AddPost;
