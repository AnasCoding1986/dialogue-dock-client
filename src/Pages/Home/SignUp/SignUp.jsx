import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SocialLogin from "../../../Components/SectionTitle/SocialLogin/SocialLogin";

const SignUp = () => {

    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(res => {
                const loggedUser = res.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoUrl)
                    .then(() => {
                        console.log('uer profile updated');
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photo: data.photoUrl
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
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
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
    };

    return (
        <>
            <Helmet>
                <title>DialogueDock | Sign Up</title>
            </Helmet>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse">

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 relative">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')" }}
                        >
                            <div className="absolute inset-0 bg-secondary/30 mix-blend-multiply"></div>
                            <div className="absolute bottom-10 left-10 text-white z-10">
                                <h2 className="text-4xl font-bold font-montserrat mb-2">Join Us!</h2>
                                <p className="text-gray-100">Become a part of our growing community today.</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 bg-white">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-primary mb-2">Create Account</h3>
                            <p className="text-gray-500 text-sm">Start your journey with DialogueDock</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-medium text-gray-700">Name</span>
                                </label>
                                <input {...register("name", { required: true })} type="text" name='name' placeholder="Your Name" className="input input-bordered input-primary w-full bg-gray-50" />
                                {errors.name && <span className="text-red-500 text-xs mt-1">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-medium text-gray-700">Photo Url</span>
                                </label>
                                <input {...register("photoUrl", { required: true })} type="text" placeholder="https://example.com/photo.jpg" className="input input-bordered input-primary w-full bg-gray-50" />
                                {errors.photoUrl && <span className="text-red-500 text-xs mt-1">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-medium text-gray-700">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" name='email' placeholder="your@email.com" className="input input-bordered input-primary w-full bg-gray-50" />
                                {errors.email && <span className="text-red-500 text-xs mt-1">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-medium text-gray-700">Password</span>
                                </label>
                                <input {...register("password", { required: true, minLength: 4, maxLength: 20 })} type="password" name='password' placeholder="••••••••" className="input input-bordered input-primary w-full bg-gray-50" />
                                {errors.password?.type === "required" && <p className="text-red-500 text-xs mt-1">Password is required</p>}
                                {errors.password?.type === "minLength" && <p className="text-red-500 text-xs mt-1">At least 4 characters</p>}
                                {errors.password?.type === "maxLength" && <p className="text-red-500 text-xs mt-1">Max 20 characters</p>}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary w-full text-white font-bold text-lg hover:btn-secondary transition-all shadow-lg hover:shadow-primary/30" type="submit" value="Sign Up" />
                            </div>
                        </form>

                        <div className="divider my-4">OR</div>
                        <SocialLogin />
                        <p className='text-center mt-4 text-sm text-gray-600'>
                            Already have an account? <Link className='text-secondary font-bold ml-1 hover:underline' to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;