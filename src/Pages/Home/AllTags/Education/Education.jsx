import useAllMsg from "../../../../Hooks/useAllMsg";
import SingleMsg from "../../AllMsg/SingleMsg";

const Education = () => {
    const [allMsg] = useAllMsg();

    const educationPosts = allMsg.filter(educationPost => educationPost.tag === "education");

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {educationPosts.map(singleMsg => (
                <SingleMsg key={singleMsg._id} singleMsg={singleMsg}></SingleMsg>
            ))}
        </div>
    );
};

export default Education;
