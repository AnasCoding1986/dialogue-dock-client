import useAllMsg from "../../../../Hooks/useAllMsg";
import SingleMsg from "../../AllMsg/SingleMsg";


const Travel = () => {

    const [allMsg] = useAllMsg();

    const travelPosts = allMsg.filter(travelPost => travelPost.tag === "travel");

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {travelPosts.map(singleMsg => (
                <SingleMsg key={singleMsg._id} singleMsg={singleMsg}></SingleMsg>
            ))}
        </div>
    );
};

export default Travel;