import Banner from "../Banner/Banner";
import { Helmet } from 'react-helmet-async';
import Tag from "../Tag/Tag";
import Annoucement from "../Annoucement/Annoucement";
import AllMsg from "../AllMsg/AllMsg";


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
        </div>
    );
};

export default Home;