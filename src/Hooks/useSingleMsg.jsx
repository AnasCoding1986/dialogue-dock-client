import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useSingleMsg = () => {

    const axiosPublic = useAxiosPublic();

    const { data: singleMsg = []} = useQuery({
        queryKey: [ 'singleMsg' ],
        queryFn: async() => {
            const res =await axiosPublic.get('/allMsg/:id')
            return res.data
        }
    })

    return [singleMsg];
};

export default useSingleMsg;