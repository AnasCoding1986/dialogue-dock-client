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
        <div className="hero min-h-screen bg-base-200 py-10 pb-20 px-4">
            <div className="card w-full max-w-xl shadow-2xl bg-[#e5f4fa] border border-blue-100 p-4 sm:p-6">
                <h1 className="text-2xl uppercase border-y-4 py-4 text-center font-LuckiestGuy text-primary">Announcement</h1>
                <form onSubmit={handleNotificattion} className="card-body px-2 sm:px-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700">Title</span>
                        </label>
                        <input name="title" type="text" placeholder="Title" required className="input input-bordered input-primary w-full bg-white" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700">Announcement Description</span>
                        </label>
                        <textarea name="description" placeholder="Description" required className="textarea textarea-bordered textarea-primary w-full bg-white h-28" />
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn bg-[#A7E6FF] hover:bg-[#8fd5f5] text-black border-none font-bold btn-primary w-full shadow-lg" type="submit" value="Give Announcement" />
                    </div>
                </form>
            </div>
        </div>

    );
};

export default AddNotification;