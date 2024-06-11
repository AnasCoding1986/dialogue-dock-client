import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";


const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res => {
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is admin now`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    return (
        <div>
            <div className="flex justify-evenly my-5">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto p-2">
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#3572EF] text-white font-bold">

                        <tr>
                            <th>#</th>
                            <th>User name</th>
                            <th>User email</th>
                            <th>Make admin</th>
                            <th>Subscription Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td>
                                    {
                                        user.role === "admin" 
                                        ?
                                        <p>
                                            Admin
                                        </p>
                                        :
                                        <button onClick={()=>handleMakeAdmin(user)} className="btn btn-sm bg-[#3572EF]"><FaUsers  className="text-white"/></button>
                                        
                                        
                                    }
                                </td>
                                <td>Blue</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;