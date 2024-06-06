import Banner from "../Banner/Banner";
import { Helmet } from 'react-helmet-async';
import Tag from "../Tag/Tag";
import Annoucement from "../Annoucement/Annoucement";


const Home = () => {
    return (
        <div >
            <Helmet>
                <title>DialogueDock | Home</title>
            </Helmet>
            <Banner></Banner>
            <Tag></Tag>
            <Annoucement></Annoucement>
        </div>
    );
};

export default Home;