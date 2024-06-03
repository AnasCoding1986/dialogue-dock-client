import './banner.css';

const Banner = () => {
    return (
        <div className='banner h-screen'>
            <div className='w-full h-full text-white bg-black bg-opacity-30 flex flex-col justify-center items-center'>
                <h3 className='md:text-5xl text-3xl md:w-8/12 text-center'>Explore Beautiful thoughts from people around your world</h3>
                <h4 className='md:text-2xl text-xl my-5'>Select your desired tag</h4>
                <div className="input-container w-8/12 flex">
                    <input type="text" placeholder="Select Tag" className="input input-ghost flex-grow bg-[#A7E6FF] p-2" />
                    <button className="search-button bg-blue-500 text-white px-4 py-2">Search</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
