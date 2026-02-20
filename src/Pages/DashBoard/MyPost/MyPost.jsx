import { useState, useEffect } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import useAuth from "../../../Hooks/useAuth";
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import DashboardStats from '../../../Components/DashboardStats/DashboardStats';

const MyPost = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [allMsg, setAllMsg] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get('/allMsg')
            .then(res => {
                setAllMsg(res.data.messages);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [axiosSecure]);



    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/allMsg/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            const remaining = allMsg.filter(msg => msg._id !== id);
                            setAllMsg(remaining);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your post has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        });
    };

    const myPosts = allMsg.filter(myPost => myPost.email === user.email);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <SectionTitle
                heading={`hi ${user.displayName}`}
                subHeading="Your Post"
            ></SectionTitle>

            <div className="mb-8">
                <DashboardStats />
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Votes</th>
                            <th>Comments</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myPosts.map((myPost, index) => (
                            <tr key={myPost._id}>
                                <th>{index + 1}</th>
                                <td>{myPost.title}</td>
                                <td>{parseInt(myPost.upvote) - parseInt(myPost.downvote)}</td>
                                <td className='text-[#050C9C] text-xl'><FaRegComment /></td>
                                <td className='text-red-600 text-xl'>
                                    <MdDelete onClick={() => handleDelete(myPost._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPost;
