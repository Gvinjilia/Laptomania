import { useState } from "react";
import { useLaptop } from "../context/LaptopContext";
import { useAuth } from "../context/AuthContext";

const Laptop = ({ laptop }) => {
    const { deleteLaptop, updateLaptop, addToCart } = useLaptop();
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);

    // Editable fields (excluding DB-related and availability fields)
    const editableFields = Object.keys(laptop).filter((key) => !["_id", "__v", "createdAt", "updatedAt", "isAvailable"].includes(key));

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target); // this captures all inputs

        console.log(formData)

        // for (const [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        await updateLaptop(laptop._id, formData);
        setEditing(false);
    };

    return (
        <div className="bg-white rounded-lg shadow p-4 flex flex-col lg:w-95 md:w-95 sm:90 w-85 min-h-158">
            {/* images */}
            <div className="grid grid-cols-2 mb-4 w-70">
                {laptop.images.map((image) => (
                    <img className="w-80" key={image._id} src={image.url} alt={`${laptop.brand} ${laptop.model}`} />
                ))}
            </div>

            {editing ? (
                <form onSubmit={handleUpdate}>
                    {editableFields.map((key) => (
                        <div key={key} className="flex flex-col gap-2 mb-2">
                            <label>{key}: </label>

                            {key === "images" ? (
                                <input type="file" name="images" multiple />
                            ) : (
                                <input className="border p-1" type="text" name={key} defaultValue={laptop[key]} />
                            )}
                        </div>
                    ))}

                    <div className="flex gap-2">
                        <button type="submit" className="border p-2 w-30">SAVE</button>
                        <button onClick={() => setEditing(false)} className="border p-2 w-30">CANCEL</button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="lg:w-90 md:w-90 sm:w-80 w-70 flex flex-col gap-5 mb-5">
                        <h2>{laptop.brand} - {laptop.model}</h2>
                        <p>Processor: {laptop.processor}</p>
                        <p>RAM/Storage: {laptop.ram}/{laptop.storage}</p>
                        <p>Graphics: {laptop.graphics}</p>
                        <p>Display: {laptop.display}</p>
                        <p>OS: {laptop.os}</p>
                        <p>Description: {laptop.description}</p>
                        <p>Price: ${laptop.price} - Stock: {laptop.stock}</p>
                    </div>

                    <div>
                        {(user?.role === "admin" || user?.role === 'moderator') ? (
                            <div className="flex gap-2">
                                <button className="border p-2 w-30" onClick={() => deleteLaptop(laptop._id)}>Delete</button>
                                <button className="border p-2 w-30" onClick={() => setEditing(true)}>Update</button>
                            </div>
                        ) : (
                            <button className="border p-2 w-30" onClick={() => addToCart(laptop)}>Add to Cart</button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Laptop;