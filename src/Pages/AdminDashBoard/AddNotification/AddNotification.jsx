import useAuth from "../../../Hooks/useAuth";



const AddNotification = () => {

    const {user} = useAuth();

    return (
        <div className="hero min-h-screen bg-base-200">

                <div className="card w-1/2 shadow-2xl bg-[#e5f4fa]">
                <h1 className="text-2xl uppercase border-y-4 py-4 text-center font-LuckiestGuy">Annoucement</h1>
                    <form className="card-body">
                        <div className="form-control flex items-center">
                            <label className="label">
                                <span className="label-text font-medium">Title</span>
                            </label>
                            <input type="text" placeholder="Title" className="input input-bordered w-1/2 " />
                        </div>
                        <div className="form-control flex items-center">
                            <label className="label">
                                <span className="label-text font-medium">Annoucement</span>
                            </label>
                            <input type="text" placeholder="Description" className="input input-bordered w-full " />
                        </div>
                        <div className="form-control mt-6">
                        <input className="btn bg-[#A7E6FF] text-black border-none font-bold btn-primary" type="submit" value="Give Annoucement" />
                        </div>
                    </form>
                </div>
            </div>

    );
};

export default AddNotification;