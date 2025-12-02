import { useLaptop } from "../context/LaptopContext";
import Laptop from "./Laptop";

const LaptopList = () => {
    const { laptops } = useLaptop();

    if (!laptops || laptops.length === 0) {
        return <p>No laptops found</p>;
    }

    return (
        <section className="flex flex-wrap justify-center items-start gap-5 mb-10 lg:pt-0 md:pt-5 sm:pt-5 pt-5">
            {laptops.map((laptop) => {
                return <Laptop key={laptop._id} laptop={laptop} />;
            })}
        </section>
    );
};

export default LaptopList;