import useAllMsg from "../../../../Hooks/useAllMsg";
import SingleMsg from "../../AllMsg/SingleMsg";


const Fashion = () => {

    const [allMsg] = useAllMsg();

    const fashionPosts = allMsg.filter(fashionPost => fashionPost.tag === "fashion");

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {fashionPosts.map(singleMsg => (
                <SingleMsg key={singleMsg._id} singleMsg={singleMsg}></SingleMsg>
            ))}
        </div>
    );
};

export default Fashion;