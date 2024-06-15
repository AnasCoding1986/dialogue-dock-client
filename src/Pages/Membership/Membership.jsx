import { Link } from 'react-router-dom';
import gold from '../../assets/images/badge/goldBadge.jpg'

const Membership = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">



            <div className="card bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                <h2 className="text-3xl font-bold text-[#050C9C]">Get Membership</h2>
                <p className="text-xl font-light my-2">Pay only <span className="text-[#050C9C] font-bold">100$</span> to get lifetime member</p>
                    <h2 className="card-title">Facilities</h2>
                    <div className="flex justify-evenly gap-10 mt-5 items-center">
                        <div className='w-10'>
                            <img src={gold} alt="" />
                        </div>
                        <div className='w-20'>
                            
                            <p className='font-bold'> Unlimited Post</p>
                        </div>
                        
                    </div>

                </div>
            </div>


            <Link to='/payment'>
            <button className="btn bg-[#050C9C] text-white mt-5">Pay Now</button>
            </Link>
        </div>
    );
};

export default Membership;