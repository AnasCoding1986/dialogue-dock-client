import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAnnoucement = () => {

    const axiosSecure = useAxiosSecure();

    const {data: notification=[]} = useQuery({
        queryKey: ['notification'],
        queryFn: async () => {
            const res = await axiosSecure.get('/notification');
            return res.data;
        }
    })

    return [notification]
};

export default useAnnoucement;