import { useEffect, useState } from 'react';
import login from '../../../assets/images/login/login.jpg';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import SocialLogin from '../../../Components/SectionTitle/SocialLogin/SocialLogin';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';


const Login = () => {

    const [disabled, setDisabled] = useState(true);
    const axiosPublic = useAxiosPublic();

    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(res => {
                const user = res.user;
                const userInfo = {
                    name: user.name,
                    email: user.email,
                    photo: user.photoUrl
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Account created and updated successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/');
                        }
                    })
                console.log(user);
                navigate(from, { replace: true })
            })
    }

    // const handleGoogleSignIn = () => {
    //     signInWithGoogle()
    //     .then(res => {
    //         console.log(res.data);
    //     })
    //     .catch(err => {
    //         console.error(err);
    //     })
    // }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        console.log(user_captcha_value);
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    return (
        <>
            <Helmet>
                <title>DialogueDock | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center w-1/2 flex justify-center items-center lg:text-left">
                        <img src={login} className="w-6/12 rounded-lg shadow-2xl" />
                    </div>
                    <div className="card w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name='captcha' placeholder="Type the captcha" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disabled} className="btn bg-[#A7E6FF] text-black border-none font-bold btn-primary" type="submit" value="login" />
                            </div>
                        </form>
                        {/* <div className='mb-5 mx-auto w-10/12'>
                        <button onClick={handleGoogleSignIn} className="btn btn-outline border-[#3572EF] w-full"><span className='text-xl mr-2'><FcGoogle /></span><span className='text-[#3572EF] font-bold ml-2'>Google</span></button>
                        </div> */}
                        <SocialLogin></SocialLogin>
                        <p className='text-center pb-3'><small>New Here? <Link className='text-[#3572EF] font-bold ml-1' to="/signup">Create an account</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;