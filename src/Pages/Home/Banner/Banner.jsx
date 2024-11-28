import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use this for v6
import './banner.css';

const Banner = () => {
    const [selectedTag, setSelectedTag] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (selectedTag) {
            navigate(`/${selectedTag}`);
        }
    };

    return (
        <div className='banner h-screen rounded-b-3xl'>
            <div className='w-full h-full text-white bg-black bg-opacity-30 flex flex-col justify-center items-center'>
                <h3 className='md:text-5xl text-3xl md:w-8/12 text-center'>
                    Explore Stunning beautiful things from people around your surroundings
                </h3>
                <h4 className='md:text-2xl text-xl my-5'>
                    Choose your desired tag
                </h4>
                <div className="input-container w-8/12 flex">
                    <select
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                        className="input input-ghost flex-grow bg-[#A7E6FF] p-2"
                    >
                        <option value="" disabled>Select Tag</option>
                        <option value="coding">Coding</option>
                        <option value="education">Education</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="environment">Environment</option>
                        <option value="fashion">Fashion</option>
                        <option value="food">Food</option>
                        <option value="health">Health</option>
                        <option value="politics">Politics</option>
                        <option value="travel">Travel</option>
                    </select>
                    <button
                        onClick={handleSearch}
                        className="search-button bg-blue-500 text-white px-4 py-2"
                    >
                        Please Search 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
