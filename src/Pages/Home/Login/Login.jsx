import { useEffect, useRef, useState } from 'react';
import login from '../../../../public/login/login.jpg';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';


const Login = () => {

    const captchaRef = useRef(null);
    const [disabled,setDisabled] = useState(true);

    useEffect(() => {
        loadCaptchaEnginge(6); 
    },[])

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
    }

    const handleValidateCaptcha = () => {
        const user_captcha_value = captchaRef.current.value;
        console.log(user_captcha_value);
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }else{
            setDisabled(true);
        }
    }

    return (
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
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input type="text" ref={captchaRef} name='captcha' placeholder="Type the captcha" className="input input-bordered" required />
                            <button onClick={handleValidateCaptcha} className="btn btn-outline btn-xs mt-3 border-[#3572EF]">Validate</button>
                        </div>
                        <div className="form-control mt-6">
                            <input disabled={disabled} className="btn bg-[#A7E6FF] text-black border-none font-bold btn-primary" type="submit" value="login" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;