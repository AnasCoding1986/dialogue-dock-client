

const AnnoucementCard = (singleNotification) => {
    console.log(singleNotification);
    const title = singleNotification.singleNotification.title;
    const description = singleNotification.singleNotification.description;
    const name = singleNotification.singleNotification.name;
    const photo = singleNotification?.singleNotification?.photo;
    console.log(photo);
    return (
        <div className="">
            <div className="card w-full shadow-xl bg-[#e4f5fc]">
                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center uppercase">{title}</h2>
                    <p className="text-center">{description}</p>
                    <div className="flex justify-center gap-5">
                        <div className="avatar">
                            <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                {/* Conditional rendering to handle invalid image URLs */}
                                {photo ? <img src={photo} alt={`${name}'s photo`} /> : <p>No Image Available</p>}
                            </div>
                        </div>
                        <div>
                            <p>{name}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AnnoucementCard;