import Banner from "../Banner/Banner";
import { Helmet } from 'react-helmet-async';
import Tag from "../Tag/Tag";
import Annoucement from "../Annoucement/Annoucement";
import AllMsg from "../AllMsg/AllMsg";
import PlatformHighlights from "../PlatformHighlights/PlatformHighlights";
import Testimonials from "../Testimonials/Testimonials";
import CallToAction from "../CallToAction/CallToAction";
import PostTeaser from "../PostTeaser/PostTeaser";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>DialogueDock | Home</title>
            </Helmet>
            <Banner />

            {/* Smooth transition from dark hero to light feed */}
            <div className="relative">
                <div className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0f1e] to-gray-50 pointer-events-none" />

                <div id="posts" className="bg-gray-50 pt-8 pb-4">
                    <PostTeaser />
                    <AllMsg />
                </div>
            </div>

            {/* Transition from light feed to white sections */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            <Tag />
            <PlatformHighlights />
            <Annoucement />
            <Testimonials />

            {/* CallToAction has its own dark background, smooth transition into dark Footer */}
            <CallToAction />
        </div>
    );
};

export default Home;