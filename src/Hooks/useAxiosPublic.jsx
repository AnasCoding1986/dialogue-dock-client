import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://y-blush-three.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;