import { useEffect, useState } from "react";

const useAllMsg = () => {
    const [allMsg,setAllMsg] = useState();
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        fetch('http://localhost:5000/allMsg')
        .then(res => res.json())
        .then(data=>{
            setAllMsg(data);
            setLoading(false);
        });
    },[])
    return [allMsg,loading]
}

export default useAllMsg;