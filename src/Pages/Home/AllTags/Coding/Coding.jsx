import useAllMsg from "../../../../Hooks/useAllMsg";
import SingleMsg from "../../AllMsg/SingleMsg";


const Coding = () => {

    const [allMsg] = useAllMsg();

    const codingPosts = allMsg.filter(codingPost => codingPost.tag === "coding");

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {codingPosts.map(singleMsg => (
                <SingleMsg key={singleMsg._id} singleMsg={singleMsg}></SingleMsg>
            ))}
        </div>
    );

};

export default Coding;