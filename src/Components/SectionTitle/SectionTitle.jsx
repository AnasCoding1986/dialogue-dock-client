

const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className="md:w-4/12 my-8  text-center mx-auto">
            <p className="text-[#050C9C] mb-2">----- {subHeading} -----</p>
            <h1 className="text-3xl uppercase border-y-4 py-4">{heading}</h1>
        </div>
    );
};

export default SectionTitle;