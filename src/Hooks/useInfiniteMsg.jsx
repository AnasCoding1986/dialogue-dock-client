import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useInfiniteMsg = (search = '', sort = 'newest') => {
    const axiosPublic = useAxiosPublic();

    const getMessages = async ({ pageParam = 1 }) => {
        const res = await axiosPublic.get(`/allMsg?page=${pageParam}&limit=5&search=${search}&sort=${sort}`);
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
        // Removed automatic polling here to prevent unexpected UI jumps.
        // We will implement a smart manual "Load New Posts" trigger instead.
        staleTime: 5 * 60 * 1000, // Keep data fresh for 5 mins
        cacheTime: 10 * 60 * 1000,
    });
};

export default useInfiniteMsg;
