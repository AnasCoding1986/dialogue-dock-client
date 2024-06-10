import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {

    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(res => {
            navigate('/');
            console.log(res.data);
        })
        .catch(err => {
            console.error(err);
        })
    }

    return (
        <div className='mb-5 mx-auto w-10/12'>
            <button onClick={handleGoogleSignIn} className="btn btn-outline border-[#3572EF] w-full"><span className='text-xl mr-2'><FcGoogle /></span><span className='text-[#3572EF] font-bold ml-2'>Google</span></button>
        </div>
    );
};

export default SocialLogin;