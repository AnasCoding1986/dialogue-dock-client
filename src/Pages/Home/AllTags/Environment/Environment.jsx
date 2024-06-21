import useAllMsg from "../../../../Hooks/useAllMsg";
import SingleMsg from "../../AllMsg/SingleMsg";


const Environment = () => {

    const [allMsg] = useAllMsg();

    const environmentPosts = allMsg.filter(environmentPost => environmentPost.tag === "environment");

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {environmentPosts.map(singleMsg => (
                <SingleMsg key={singleMsg._id} singleMsg={singleMsg}></SingleMsg>
            ))}
        </div>
    );
};

export default Environment;