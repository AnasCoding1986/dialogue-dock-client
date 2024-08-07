
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

import './tag.css';

// Photos
import coding from '../../../../src/assets/images/TagImage/coding.jpg';
import education from '../../../../src/assets/images/TagImage/education.jpg';
import entertainment from '../../../../src/assets/images/TagImage/entertainment.jpg';
import environment from '../../../../src/assets/images/TagImage/environment.jpg';
import fashion from '../../../../src/assets/images/TagImage/fashion.jpg';
import food from '../../../../src/assets/images/TagImage/food.jpg';
import health from '../../../../src/assets/images/TagImage/health.jpg';
import politics from '../../../../src/assets/images/TagImage/politics.jpg';
import travel from '../../../../src/assets/images/TagImage/travel.jpg';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Tag = () => {
    return (
        <div className='p-20'>
            <SectionTitle
                heading="tags"
                subHeading="choose your desired one"
            >
            </SectionTitle>
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
                    { src: coding, label: 'coding' },
                    { src: education, label: 'education' },
                    { src: entertainment, label: 'entertainment' },
                    { src: environment, label: 'environment' },
                    { src: fashion, label: 'fashion' },
                    { src: food, label: 'food' },
                    { src: health, label: 'health' },
                    { src: politics, label: 'politics' },
                    { src: travel, label: 'travel' }
                ].map((item, index) => (
                    <SwiperSlide key={index}>
                        <Link to={`/${item.label}`}>
                            <div className="relative">
                                <img className='w-full h-48' src={item.src} alt={item.label} />
                                <div className="overlay"></div>
                                <div className="slide-content">
                                    <h3 className='text-2xl -mt-5 text-white text-center uppercase font-bold'>{item.label}</h3>
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
