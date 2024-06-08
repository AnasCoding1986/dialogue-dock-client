import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAllMsg = () => {

    const axiosSecure = useAxiosSecure();
    const { data: allMsg = [] } =useQuery({
        queryKey: ['allMsg'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allMsg')
            return res.data
        }
    })

    return [allMsg];
};

export default useAllMsg;