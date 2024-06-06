import { Link, useNavigate } from "react-router-dom";
import signup from "../../../../src/assets/images/register/register.jpg"
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const SignUp = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const {createUser,updateUserProfile} = useAuth();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
        .then(res => {
            const loggedUser = res.user;
            console.log(loggedUser);
            updateUserProfile(data.name,data.photoUrl)
            .then(() => {
                console.log('uer profile updated');
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Account created and updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/');
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
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center w-1/2 flex justify-center items-center lg:text-left">
                        <img src={signup} className="w-6/12 rounded-lg shadow-2xl" />
                    </div>
                    <div className="card w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("name", { required: true })} type="text" name='name' placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-500">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input {...register("photoUrl", { required: true })} type="text" placeholder="Photo Url" className="input input-bordered" />
                                {errors.photoUrl && <span className="text-red-500">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" name='email' placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-500">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", { required: true, minLength: 4, maxLength: 20 })} type="password" name='password' placeholder="password" className="input input-bordered" />
                                {errors.password?.type === "required" && (
                                    <p className="text-red-500">Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-500">Password should at least 4 character</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className="text-red-500">Password should within 20 character</p>
                                )}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn bg-[#A7E6FF] text-black border-none font-bold btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className='text-center pb-3'><small>Already have an account? <Link className='text-[#3572EF] font-bold ml-1' to="/login">Login</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;