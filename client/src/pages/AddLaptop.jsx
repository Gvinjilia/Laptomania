import { useState } from "react";
import { useLaptop } from "../context/LaptopContext";
import { memo } from 'react';

const AddLaptop = memo(() => {
    const { addLaptop } = useLaptop();
    const [toggleForm, setToggleForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        addLaptop(formData);

        e.target.reset();
    };

    return (
        <>
        {
                toggleForm ?  (
                    <>
                        <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data" className="flex flex-col gap-5 w-60">
                            <input name="brand" placeholder="Brand" className="border p-1" />
                            <input name="model" placeholder="Model" required className="border p-1" />
                            <input name="processor" placeholder="Processor" required className="border p-1" />
                            <input name="ram" placeholder="RAM" required className="border p-1" />
                            <input name="storage" placeholder="Storage" required className="border p-1" />
                            <input name="graphics" placeholder="Graphics" required className="border p-1" />
                            <input name="display" placeholder="Display" required className="border p-1" />
                            <input name="os" placeholder="Operating System" required className="border p-1" />
                            <input name="price" type="number" placeholder="Price" required className="border p-1"/>
                            <input name="stock" type="number" placeholder="Stock" required className="border p-1" />
                            <textarea name="description" placeholder="Description" rows="3" required  className="border p-1"/>
                            <input type="file" name="images" multiple required className="border p-1" />

                            <button className="border p-1">Submit</button>
                        </form>
                        <button className="border p-1 w-60 mt-3 mb-15" onClick={() => setToggleForm(false)}>CANCEL</button>
                    </>
                ) : (
                    <button onClick={() => setToggleForm((prev) => !prev)} className="border p-2 w-50">ADD NEW LAPTOP</button>
                )
            }
        </>
    )
});

export default AddLaptop;