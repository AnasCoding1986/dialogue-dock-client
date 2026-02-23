import { HiOutlineMegaphone } from "react-icons/hi2";

const AnnoucementCard = ({ singleNotification, compact }) => {
    const { title, description, name, photo } = singleNotification;

    return (
        <div className={`group bg-white rounded-2xl border border-gray-100 hover:border-secondary/20 overflow-hidden transition-all duration-300 ${compact ? 'shadow-sm' : 'hover:shadow-glass'}`}>
            <div className={`flex items-start ${compact ? 'gap-3 p-4' : 'gap-5 p-6'}`}>
                {/* Icon */}
                <div className={`${compact ? 'w-8 h-8 rounded-lg' : 'w-11 h-11 rounded-xl'} bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors`}>
                    <HiOutlineMegaphone className={`${compact ? 'text-lg' : 'text-xl'} text-secondary`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3 className={`${compact ? 'text-sm' : 'text-lg'} font-bold text-primary mb-1 font-montserrat truncate`}>{title}</h3>
                    <p className={`text-gray-500 text-xs leading-relaxed ${compact ? 'line-clamp-2 mb-2' : 'mb-3'}`}>{description}</p>

                    {/* Author */}
                    <div className="flex items-center gap-2">
                        <div className={`${compact ? 'w-5 h-5' : 'w-7 h-7'} rounded-full overflow-hidden ring-1 ring-gray-200 flex-shrink-0`}>
                            {photo ? (
                                <img
                                    src={photo}
                                    alt={`${name}'s photo`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'A')}&background=14b8a6&color=fff&bold=true&size=20`;
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-bold text-[8px]">
                                    {name?.charAt(0)?.toUpperCase() || 'A'}
                                </div>
                            )}
                        </div>
                        <span className="text-[10px] font-medium text-gray-400">by {name}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnoucementCard;