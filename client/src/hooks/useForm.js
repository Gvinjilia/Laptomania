import { useState } from "react";

export const useForm = (values) => {
    const [formData, setFormData] = useState(values);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({...prev, [name]: value}));
    }

    return [formData, handleChange];
};