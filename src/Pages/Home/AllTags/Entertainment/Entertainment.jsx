import useAllMsg from "../../../../Hooks/useAllMsg";
import SingleMsg from "../../AllMsg/SingleMsg";


const Entertainment = () => {

    const [allMsg] = useAllMsg();

    const entertainmentPosts = allMsg.filter(entertainmentPost => entertainmentPost.tag === "entertainment");

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-16'>
            {entertainmentPosts.map(singleMsg => (
                <SingleMsg key={singleMsg._id} singleMsg={singleMsg}></SingleMsg>
            ))}
        </div>
    );
};

export default Entertainment;