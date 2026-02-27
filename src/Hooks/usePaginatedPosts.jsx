import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePaginatedPosts = (search = '', sort = 'newest', page = 1, limit = 6) => {
    const axiosPublic = useAxiosPublic();

    return useQuery({
        queryKey: ['paginatedMessages', search, sort, page, limit],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allMsg?page=${page}&limit=${limit}&search=${search}&sort=${sort}`);
            return res.data;
        },
        staleTime: 5 * 60 * 1000,
        keepPreviousData: true, // This is key for smooth transitions
    });
};

export default usePaginatedPosts;
