import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getItem, setItem } from "../components/UI/utils/localStorage";

const LaptopContext = createContext();

export const useLaptop = () => useContext(LaptopContext);

const API_URL = import.meta.env.VITE_API_URL + '/api';

export const LaptopProvider = ({ children }) => {
    const [laptops, setLaptops] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const items = getItem('cart');

        setCart(items);
    }, []);

    useEffect(() => {
        setItem('cart', cart);
    }, [cart]);

    const getLaptops = async () => {
        try{
            const res = await fetch(`${API_URL}/laptops`);

            const result = await res.json();

            if(!res.ok){
                throw new Error(result.message)
            }

            setLaptops(result);
        } catch(err){
            alert(err.message)
        }
    };

    const deleteLaptop = async (id) => {
        const toastId = toast.loading('Deleting a Laptop...');

        try{
            const res = await fetch(`${API_URL}/laptops/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if(!res.ok){
                const result = await res.json();

                throw new Error(result.message)
            }

            setLaptops((prev) => prev.filter((laptop) => laptop._id !== id));

            toast.update(toastId, {
                render: 'Laptop deleted successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            });
       } catch(err){
            toast.update(toastId, {
                render: `Error: ${err.message}`,
                type: 'error',
                isLoading: false,
                autoClose: 2000
            });
        }
    };

    const updateLaptop = async (id, formData) => {
        const toastId = toast.loading('updating Laptop...');

        try {
            const res = await fetch(`${API_URL}/laptops/${id}`, {
                method: "PATCH",
                body: formData,
                credentials: 'include'
            });

            const result = await res.json();

            if(!res.ok) {
                throw new Error(result.message);
            }

            const index = laptops.findIndex(laptop => laptop._id === result._id);
            const copyLaptops = [...laptops];
            copyLaptops.splice(index, 1, result)
            setLaptops(copyLaptops);

            toast.update(toastId, {
                render: 'Laptop updated successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            });
        } catch(err) {
            toast.update(toastId, {
                render: `Error: ${err.message}`,
                type: 'error',
                isLoading: false,
                autoClose: 2000
            });
        }
    };

    const addLaptop = async (formData) => {
        const toastId = toast.loading('Adding a new Laptop...');

        try {
            const res = await fetch(`${API_URL}/laptops`, {
                method: "POST",
                credentials: "include",
                body: formData
            });

            const result = await res.json();

            if(!res.ok) {
                throw new Error(result.message);
            }

            setLaptops([...laptops, result]);
            toast.update(toastId, {
                render: 'Laptop successfully added',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            });
        } catch(err) {
            toast.update(toastId, {
                render: `Error: ${err.message}`,
                type: 'error',
                isLoading: false,
                autoClose: 2000
            });
        }
    };

    const addToCart = (product) => {
        const laptop = cart.find(obj => obj._id === product._id);

        if(laptop){
            setCart((prev) => prev.map((obj) => obj._id === product._id ? {...obj, quantity: obj.quantity + 1} : obj));
            return;
        }

        setCart((prev) => [...prev, {...product, quantity: 1}]);
    };

    const reduceByOne = (product) => {
        if(product.quantity !== 1){
            setCart((prev) => prev.map((obj) => obj._id === product._id ? {...obj, quantity: obj.quantity - 1} : obj));
            return;
        }

        setCart((prevCart) => prevCart.filter((item) => item._id !== product._id));
    };

    const deleteProduct = (product) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== product._id));
    };

    const clearCart = () => {
        setCart([]);
    };

    useEffect(() => {
        getLaptops();
    }, []);

    return (
        <LaptopContext.Provider value={{laptops, deleteLaptop, updateLaptop, addLaptop, addToCart, cart, reduceByOne, deleteProduct, clearCart}}>
            {children}
        </LaptopContext.Provider>
    )
}