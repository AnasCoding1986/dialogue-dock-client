import useAllMsg from "../../../../Hooks/useAllMsg";
import SingleMsg from "../../AllMsg/SingleMsg";


const Politics = () => {

    const [allMsg] = useAllMsg();

    const politicsPosts = allMsg.filter(politicsPost => politicsPost.tag === "politics");

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {politicsPosts.map(singleMsg => (
                <SingleMsg key={singleMsg._id} singleMsg={singleMsg}></SingleMsg>
            ))}
        </div>
    );
};

export default Politics;