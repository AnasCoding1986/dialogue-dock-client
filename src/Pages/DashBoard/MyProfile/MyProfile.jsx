import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import gold from "../../../assets/images/badge/goldBadge.jpg";
import silver from "../../../assets/images/badge/silverBadge.jpg";
import useAllMsg from "../../../Hooks/useAllMsg";
import SingleMsg from "../../Home/AllMsg/SingleMsg";

const MyProfile = () => {

    const [allMsg] = useAllMsg();
    const { user } = useAuth();

    const myPosts = allMsg.filter(myPost => myPost.email === user.email);

    // Sort posts by createdAt date in descending order and slice the first three
    const recentPosts = myPosts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });
  
    // Find the current user's data from the list of users
    const currentUser = users.find(u => u.email === user.email);

    return (
        <div>
            <div className="text-center font-PermanentMarker py-5">
                <p className="text-[#050C9C] text-xl">--------User profile--------</p>
            </div>
            <div className="flex flex-col items-center justify-evenly h-screen w-full">
                <div className="card bg-base-100 shadow-xl">
                    <div className="grid grid-cols-12 gap-2">
                        <div className="flex gap-5 col-span-7 p-2">
                            <div className="avatar">
                                <div className="w-10 rounded-full ring ring-[#050C9C] ring-offset-base-100 ring-offset-2">
                                    <img src={user.photoURL} alt="User Avatar" />
                                </div>
                            </div>
                            <div>
                                <h2 className="font-LuckiestGuy">{user.displayName}</h2>
                                <p>{user.email}</p>
                            </div>
                        </div>
                        <div className="col-span-5 flex justify-center items-center text-xl font-bold">
                            {
                                currentUser && currentUser.membership === "member"
                                    ?
                                    <div className="avatar">
                                        <div className="w-7 rounded-full ring bg-[#3572EF] ring-offset-base-100 ring-offset-2">
                                            <img src={gold} alt="Gold Badge" />
                                        </div>
                                    </div>
                                    :
                                    <div className="avatar">
                                        <div className="w-7 rounded-full ring bg-[#3572EF] ring-offset-base-100 ring-offset-2">
                                            <img src={silver} alt="Silver Badge" />
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {recentPosts.map(singleMsg => (
                        <SingleMsg key={singleMsg._id} singleMsg={singleMsg}></SingleMsg>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
