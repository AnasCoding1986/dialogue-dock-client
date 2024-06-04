import { Link } from "react-router-dom";
import signup from "../../../../public/register/register.jpg"

const SignUp = () => {

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center w-1/2 flex justify-center items-center lg:text-left">
                    <img src={signup} className="w-6/12 rounded-lg shadow-2xl" />
                </div>
                <div className="card w-1/2 max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSignUp} className="card-body">
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
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn bg-[#A7E6FF] text-black border-none font-bold btn-primary" type="submit" value="login" />
                        </div>
                    </form>
                    <p className='text-center pb-3'><small>Already have an account? <Link className='text-[#3572EF] font-bold ml-1' to="/login">Login</Link></small></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;