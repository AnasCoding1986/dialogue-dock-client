import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAnnoucement from "../../../Hooks/useAnnoucement";
import AnnoucementCard from "./AnnoucementCard";

const Annoucement = () => {
    const [notification] = useAnnoucement();
    const hasNotifications = notification.length > 0;

    return (
        <div className={`px-5 md:px-20 py-16 bg-gradient-to-br from-accent/20 to-white ${hasNotifications ? 'block' : 'hidden'}`}>
            <SectionTitle
                heading="Announcements"
                subHeading="Stay Updated"
            />
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
