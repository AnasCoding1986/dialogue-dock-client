import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAnnoucement from "../../../Hooks/useAnnoucement";



const AddNotification = () => {

    const { user } = useAuth();
    const name = user?.displayName;
    const photo = user?.photoURL;
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useAnnoucement();

    const handleNotificattion = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;

        const notificationInfo = { title, description, name, photo };
        console.log(notificationInfo);

        axiosSecure.post('/notification', notificationInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Annoucement added successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    //   refetch cart to update the annoucement
                    refetch();
                }
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">

            <div className="card w-1/2 shadow-2xl bg-[#e5f4fa]">
                <h1 className="text-2xl uppercase border-y-4 py-4 text-center font-LuckiestGuy">Annoucement</h1>
                <form onSubmit={handleNotificattion} className="card-body">
                    <div className="form-control flex items-center">
                        <label className="label">
                            <span className="label-text font-medium">Title</span>
                        </label>
                        <input name="title" type="text" placeholder="Title" className="input input-bordered w-1/2 " />
                    </div>
                    <div className="form-control flex items-center">
                        <label className="label">
                            <span className="label-text font-medium">Annoucement</span>
                        </label>
                        <input name="description" type="text" placeholder="Description" className="input input-bordered w-full " />
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