import error from "../../assets/images/error/error.jpg"

const ErrorPage = () => {
    return (
        <div className="w-full h-screen p-10">
            <img className="w-full h-full" src={error} alt="" />
        </div>
    );
};

export default ErrorPage;