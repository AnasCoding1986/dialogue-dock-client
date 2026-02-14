

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="md:w-4/12 my-8 text-center mx-auto">
            <p className="text-secondary font-montserrat text-lg font-semibold tracking-wide mb-2">----- {subHeading} -----</p>
            <h1 className="text-4xl uppercase border-y-4 border-primary py-4 font-montserrat font-bold text-primary">{heading}</h1>
        </div>
    );
};

export default SectionTitle;