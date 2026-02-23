import Banner from "../Banner/Banner";
import { Helmet } from 'react-helmet-async';
import Tag from "../Tag/Tag";
import Annoucement from "../Annoucement/Annoucement";
import AllMsg from "../AllMsg/AllMsg";
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

                <div id="posts" className="bg-gray-50 pt-8 pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Feed and Sidebar Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            
                            {/* Main Content (Left, 8 cols) */}
                            <div className="lg:col-span-8 space-y-8">
                                <PostTeaser />
                                <AllMsg />
                            </div>

                            {/* Sidebar (Right, 4 cols) */}
                            <div className="lg:col-span-4 space-y-6 hidden lg:block">
                                <div className="sticky top-24 space-y-6">
                                    <Tag />
                                    <Annoucement />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* CallToAction has its own dark background, smooth transition into dark Footer */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <CallToAction />
        </div>
    );
};

export default Home;