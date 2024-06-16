import useSingleMsg from "../../../Hooks/useSingleMsg";


const SingleMsgDetails = () => {

    const singleMsg = useSingleMsg();

    const{photo,name} = singleMsg;

    return (
        <div>
            <h2>This is single msg details <span>{name} why</span></h2>
            <img className="w-full" src={photo} alt="" />
        </div>
    );
};
  
export default SingleMsgDetails;