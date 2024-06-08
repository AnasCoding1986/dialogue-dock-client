import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAllMsg from '../../../Hooks/useAllMsg';
import SingleMsg from '../SingleMsg/SingleMsg';

const AllMsg = () => {

    const allMsgs = useAllMsg();
    console.log(allMsgs[0]);

    return (
        <div className='bg-[#e5f4fa] p-20'>
            <SectionTitle
                heading="Beautiful Thoughts"
                subHeading="Explore beautiful thoughts of the people around you"
            ></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {
                    allMsgs.map(singleMsg => <SingleMsg key={singleMsg._id} singleMsg={singleMsg}></SingleMsg>)
                }
            </div>
        </div>
    );
};

export default AllMsg;