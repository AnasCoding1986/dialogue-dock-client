import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useInfiniteMsg = (search = '', sort = 'newest') => {
    const axiosPublic = useAxiosPublic();

    const getMessages = async ({ pageParam = 1 }) => {
        const res = await axiosPublic.get(`/allMsg?page=${pageParam}&limit=10&search=${search}&sort=${sort}`);
        return res.data;
    };

    return useInfiniteQuery({
        queryKey: ['messages', search, sort],
        queryFn: getMessages,
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPages) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        // Polling configuration for real-time updates
        refetchInterval: 5000,           // Auto-refresh every 5 seconds
        refetchOnWindowFocus: true,      // Refetch when user returns to tab
        refetchIntervalInBackground: false, // Pause polling when tab is inactive (battery friendly)
        staleTime: 3000,                 // Consider data stale after 3 seconds
    });
};

export default useInfiniteMsg;
