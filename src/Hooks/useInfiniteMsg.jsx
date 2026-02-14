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
    });
};

export default useInfiniteMsg;
