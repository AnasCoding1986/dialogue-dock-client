import Banner from "../Banner/Banner";
import { Helmet } from 'react-helmet-async';
import Tag from "../Tag/Tag";


const Home = () => {
    return (
        <div >
            <Helmet>
                <title>DialogueDock | Home</title>
            </Helmet>
            <Banner></Banner>
            <Tag></Tag>
        </div>
    );
};

export default Home;