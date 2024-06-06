import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAnnoucement from "../../../Hooks/useAnnoucement";
import AnnoucementCard from "./AnnoucementCard";


const Annoucement = () => {

    const [notification] = useAnnoucement();

    return (
        <div className="p-20">
            <SectionTitle
                heading="Annoucement"
                subHeading="Please go through our annoucement"
            ></SectionTitle>
            <div className="grid gap-5">
                {
                    notification.map(singleNotification => <AnnoucementCard
                        singleNotification={singleNotification}
                        key={singleNotification._id}
                    ></AnnoucementCard>)
                }
            </div>
        </div>
    );
};

export default Annoucement;