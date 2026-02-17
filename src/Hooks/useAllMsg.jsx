import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllMsg = () => {
    const axiosPublic = useAxiosPublic();

    const { data: allMsg = [], refetch } = useQuery({
        queryKey: ['allMsg'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allMsg');
            return res.data.messages || res.data;
        },
        // Polling configuration
        refetchInterval: 5000,
        refetchOnWindowFocus: true,
        staleTime: 3000,
    });

    return [allMsg, refetch];
};

export default useAllMsg;
