import { useState, useEffect } from "react";
import useAllMsg from "../../../Hooks/useAllMsg";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#050C9C', '#3572EF', '#3ABEF9'];

const AdminProfile = () => {
    const [allMsg] = useAllMsg();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosSecure.get('/users');
                setUsers(res.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const res = await axiosSecure.get('/comments');
                setComments(res.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchUsers();
        fetchComments();
    }, [axiosSecure]);

    const allMsgCount = allMsg.length;
    const usersCount = users.length;
    const commentsCount = comments.length;

    const pieChartData = [
        { name: 'Messages', value: allMsgCount },
        { name: 'Users', value: usersCount },
        { name: 'Comments', value: commentsCount },
    ];

    // custom shape for pieChart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div>
            {/* <SectionTitle
                subHeading="Admin Profile"
            ></SectionTitle> */}
            <div className="text-center font-PermanentMarker py-5">
                <p className="text-[#050C9C] text-xl mb-10">--------Admin profile--------</p>
            </div>
            <div className="flex flex-col items-center justify-evenly h-screen w-full">
                <div className="card bg-base-100 shadow-xl px-20 py-2">
                    <div className="grid grid-cols-12 gap-2">
                        <div className="flex gap-5 col-span-7 p-2">
                            <div className="avatar">
                                <div className="w-10 rounded-full ring ring-[#050C9C] ring-offset-base-100 ring-offset-2">
                                    <img src={user.photoURL} alt="User Avatar" />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-5 flex justify-center items-center text-xl font-bold">
                            <div>
                                <h2 className="font-LuckiestGuy">{user.displayName}</h2>
                                <p>{user.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-96">
                    {/* Render other components or data here */}
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend></Legend>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
