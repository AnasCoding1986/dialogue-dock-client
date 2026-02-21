import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const PostFAB = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[40]">
            <Link
                to="/dashboard/addpost"
                className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-2xl hover:bg-secondary hover:scale-110 transition-all duration-300 group"
                title="Create a post"
            >
                <FaPlus className="text-xl group-hover:rotate-90 transition-transform duration-300" />
            </Link>
        </div>
    );
};

export default PostFAB;
