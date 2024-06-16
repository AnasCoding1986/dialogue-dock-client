import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAllMsg = () => {
   
    const axiosPublic = useAxiosPublic();
    const { data: allMsg = [] } =useQuery({
        queryKey: ['allMsg'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allMsg')
            return res.data
        }
    })

    return [allMsg];
};

export default useAllMsg;