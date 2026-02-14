import Banner from "../Banner/Banner";
import { Helmet } from 'react-helmet-async';
import Tag from "../Tag/Tag";
import Annoucement from "../Annoucement/Annoucement";
import AllMsg from "../AllMsg/AllMsg";
import RecentPosts from "../RecentPost/RecentPosts";
import PlatformHighlights from "../PlatformHighlights/PlatformHighlights";
import Testimonials from "../Testimonials/Testimonials";
import CallToAction from "../CallToAction/CallToAction";


const Home = () => {
    return (
        <div >
            <Helmet>
                <title>DialogueDock | Home</title>
            </Helmet>
            <Banner></Banner>
            <PlatformHighlights></PlatformHighlights>
            <Tag></Tag>
            <Annoucement></Annoucement>
            <AllMsg></AllMsg>
            <Testimonials></Testimonials>
            <RecentPosts></RecentPosts>
            <CallToAction></CallToAction>
        </div>
    );
};

export default Home;