import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAnnoucement from "../../../Hooks/useAnnoucement";
import AnnoucementCard from "./AnnoucementCard";

const Annoucement = () => {
    const [notification] = useAnnoucement();
    const hasNotifications = notification.length > 0;

    return (
        <div className={`p-20 bg-[#ebf6fa] ${hasNotifications ? 'block' : 'hidden'}`}>
            <SectionTitle
                heading="Annoucement"
                subHeading="Please go through our annoucement"
            ></SectionTitle>
            <div className="grid gap-5">
                {
                    notification.map(singleNotification => (
                        <AnnoucementCard
                            singleNotification={singleNotification}
                            key={singleNotification._id}
                        ></AnnoucementCard>
                    ))
                }
            </div>
        </div>
    );
};

export default Annoucement;
