import { useEffect, useState } from 'react';
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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 relative">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2670&auto=format&fit=crop')" }}
                        >
                            <div className="absolute inset-0 bg-primary/50 mix-blend-multiply"></div>
                            <div className="absolute bottom-10 left-10 text-white z-10">
                                <h2 className="text-4xl font-bold font-montserrat mb-2">Welcome Back!</h2>
                                <p className="text-gray-200">Sign in to continue your journey with DialogueDock.</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 bg-white">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-primary mb-2">Login to Account</h3>
                            <p className="text-gray-500 text-sm">Please enter your credentials</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="Enter your email" className="input input-bordered input-primary w-full bg-gray-50" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="Enter your password" className="input input-bordered input-primary w-full bg-gray-50" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name='captcha' placeholder="Type the captcha above" className="input input-bordered input-primary w-full bg-gray-50" required />
                            </div>
                            <div className="form-control mt-6">
                                <input
                                    disabled={disabled}
                                    className="btn btn-primary w-full text-white font-bold text-lg hover:btn-secondary transition-all shadow-lg hover:shadow-primary/30"
                                    type="submit"
                                    value="Sign In"
                                />
                            </div>
                        </form>

                        <div className="divider my-6">OR</div>

                        <SocialLogin />

                        <p className='text-center mt-6 text-sm text-gray-600'>
                            New Here?
                            <Link className='text-secondary font-bold ml-1 hover:underline' to="/signup">Create an account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;