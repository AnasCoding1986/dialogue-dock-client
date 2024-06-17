import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAllMsg from '../../../Hooks/useAllMsg';
import SingleMsg from '../AllMsg/SingleMsg';

const AllMsg = () => {

    const [allMsg, refetch] = useAllMsg();
    console.log(allMsg[0]);
  
    return (
        <div className='p-20'>
            <SectionTitle
                heading="Beautiful Thoughts"
                subHeading="Explore beautiful thoughts"
            ></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {
                    allMsg.map(singleMsg => <SingleMsg key={singleMsg._id} singleMsg={singleMsg}></SingleMsg>)
                }
            </div>
        </div>
    );
};

export default AllMsg;