import useAnnoucement from "../../../Hooks/useAnnoucement";
import AnnoucementCard from "./AnnoucementCard";

const Annoucement = () => {
    const [notification] = useAnnoucement();
    const hasNotifications = notification.length > 0;

    if (!hasNotifications) return null;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-primary mb-4 font-montserrat flex items-center gap-2">
                <span>📣</span> Announcements
            </h3>
            <div className="space-y-3">
                {notification.map(singleNotification => (
                    <AnnoucementCard key={singleNotification._id} singleNotification={singleNotification} compact={true} />
                ))}
            </div>
        </div>
    );
};

export default Annoucement;
