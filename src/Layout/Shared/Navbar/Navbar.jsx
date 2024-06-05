import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";


const Navbar = () => {

    const { user,logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
        .then(() => {})
        .catch(err => console.log(err))
    }

    const navOptions = <>

        <li className="md:mr-5"><Link to='/'>Home</Link></li>
        <li className="md:mr-5"><Link to='/membership'>Membership</Link></li>
        <li className="md:mr-5"><NavLink to="/"><button className="btn bg-[#A7E6FF] btn-sm">
            Notification
            <div className="badge bg-[#050C9C] badge-secondary">+99</div>
        </button></NavLink></li>
    </>

    return (
        <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl mx-auto bg-black text-white px-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <div className="avatar">
                    <div className="w-10 rounded-full ring ring-[#050C9C] ring-offset-base-100 ring-offset-2">
                        <img src="../../../assets/images/logo.png.jpg" alt="" />
                    </div>
                </div>
                <a className="btn btn-ghost text-xl font-LuckiestGuy">DialogueDock</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            {
                user ?
                    <>
                    <div className="navbar-end">
                    <button onClick={handleLogout} className="btn text-black btn-ghost bg-[#A7E6FF] border-none">Log Out</button>
                    </div>
                    </> :
                    <>
                        <div className="navbar-end">
                            <Link className="btn bg-[#A7E6FF] border-none" to="/login">Join US</Link>
                        </div>
                    </>
            }
        </div>
    );
};

export default Navbar;