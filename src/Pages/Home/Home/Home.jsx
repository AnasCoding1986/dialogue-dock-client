import Banner from "../Banner/Banner";
import { Helmet } from 'react-helmet-async';
import Tag from "../Tag/Tag";
import Annoucement from "../Annoucement/Annoucement";
import AllMsg from "../AllMsg/AllMsg";
import RecentPosts from "../RecentPost/RecentPosts";


const Home = () => {
    return (
        <div >
            <Helmet>
                <title>DialogueDock | Home</title>
            </Helmet>
            <Banner></Banner>
            <Tag></Tag>
            <Annoucement></Annoucement>
            <AllMsg></AllMsg>
            <RecentPosts></RecentPosts>
        </div>
    );
};

export default Home;