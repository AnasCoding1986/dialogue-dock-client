import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const SocialLogin = () => {

    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(res => {
                console.log(res);
                const userInfo = {
                    email: res.user?.email,
                    name: res.user?.displayName,
                    photo: res.user?.photoURL,
                }
                console.log('Google user info:', userInfo);

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log('User saved:', res.data);
                    })
                    .catch(err => {
                        console.error('Error saving user:', err);
                    })
                    .finally(() => {
                        // Navigate regardless of database save success
                        setTimeout(() => {
                            navigate('/');
                        }, 500);
                    });
            })
            .catch(err => {
                console.error('Google sign-in error:', err);
            });
    }

    return (
        <div className='mb-5 mx-auto w-10/12'>
            <button onClick={handleGoogleSignIn} className="btn btn-outline border-[#3572EF] w-full"><span className='text-xl mr-2'><FcGoogle /></span><span className='text-[#3572EF] font-bold ml-2'>Google</span></button>
        </div>
    );
};

export default SocialLogin;