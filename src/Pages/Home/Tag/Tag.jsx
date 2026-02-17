
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

import './tag.css';

import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Tag = () => {
    return (
        <div className='px-5 md:px-20 py-16'>
            <SectionTitle
                heading="Explore by Topic"
                subHeading="Browse Categories"
            />
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                className="mySwiper"
            >
                {[
                    { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop', label: 'coding' }, // Code screen
                    { src: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2574&auto=format&fit=crop', label: 'education' }, // Books
                    { src: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2656&auto=format&fit=crop', label: 'entertainment' }, // Movie clapper
                    { src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5763?q=80&w=2574&auto=format&fit=crop', label: 'environment' }, // Forest
                    { src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop', label: 'fashion' }, // Clothes hanging
                    { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670&auto=format&fit=crop', label: 'food' }, // Food lying flat
                    { src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2670&auto=format&fit=crop', label: 'health' }, // Dumbbells
                    { src: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=2533&auto=format&fit=crop', label: 'politics' }, // Chess pieces
                    { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop', label: 'travel' } // Landscape
                ].map((item, index) => (
                    <SwiperSlide key={index}>
                        <Link to={`/${item.label}`}>
                            <div className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100">
                                <img
                                    className='w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110'
                                    src={item.src}
                                    alt={item.label}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                <div className="absolute bottom-4 left-0 right-0 p-4">
                                    <h3 className='text-2xl text-white text-center uppercase font-montserrat font-bold tracking-widest drop-shadow-md group-hover:text-secondary transition-colors'>
                                        {item.label}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Tag;
