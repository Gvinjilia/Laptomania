import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = import.meta.env.VITE_API_URL + '/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => { // ვიყენებთ useEffect კაუჭს, რომელიც გაეშვება მხოლოდ ერთხელ რადგან დამოკიდებულებების მასივი არის ცარიელი
        const autoLogin = async () => { // ვქმნით ფუნქციას სახელად autoLogin - რომელიც არის ასინქრონული
            const res = await fetch(`${API_URL}/auth/auto-login`, { // ვქმნით ცვლადს სახელად res რომელშიც შევინახავთ server - ის მიერ დაბუნებულ პასუხს
                method: 'POST',
                credentials: 'include' // ვიყენებთ კუთვნილებას credentials include მნიშვნელობით რომელიც ეტყვის browser - ს, რომ გააგზავნოს cookie
            });

            const result = await res.json(); // მოცემულ res - პასუხს გარდავქმნით Javascript - ის ობიექტად

            if(res.ok){ // ვამოწმებთ თუ res პასუხის ობიექტში მოცემული კუთვნილება სახელად ok - ის მნიშვნელობა არის 200 მაშინ ვცვლით setUser - მდგომარეობას
                setUser(result);
            }
        };
        
        autoLogin(); // ვიძახებთ autoLogin ფუნქციას
    }, []);

    const signup = async (formData) => {
        const toastId = toast.loading('signing in...');

        try {
            const res = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if(!res.ok) {
                throw new Error(result.message);
            }

            alert(result.message);

            toast.update(toastId, {
                render: 'account created successfully!',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            });

            navigate('/login');
        } catch(err) {
            toast.update(toastId, {
                render: `Error: ${err.message}`,
                type: 'error',
                isLoading: false,
                autoClose: 2000
            });
        }
    };

    const login = async (formData) => {
        const toastId = toast.loading('logging in...');

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const result = await res.json();

            if(!res.ok){
                throw new Error(result.message)
            };

            setUser(result);

            toast.update(toastId, {
                render: 'Logged in successfully!',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            });

            navigate('/profile');
        } catch(err){
            toast.update(toastId, {
                render: `Error: ${err.message}`,
                type: 'error',
                isLoading: false,
                autoClose: 2000
            });
        }
    };

    const logout = async () => { // ვქმნით logout - ფუნქციას რომელიც არის ასინქრონული
        const toastId = toast.loading('logging out...');

        try { // ვიყენებთ try catch - ბლოკს იმისათვის, რომ დავიჭიროთ error - ები
            const res = await fetch(`${API_URL}/auth/logout`, { // ვქმნით res - ცვლადს სადაც ვინახავთ server - ის მიერ დაბუნებულ პასუხს
                method: 'POST',
                credentials: 'include' // ვიყენებთ კუთვნილებას credentials include მნიშვნელობით რომელიც ეტყვის browser - ს, რომ გააგზავნოს cookie request - ში
            });

            if(!res.ok){ // თუ res ის მიერ დაბრუნებული პასუხი არ არის ok - (200)
                throw new Error('You are not logged in'); // მაშინ ჩვენ ვქმნით ახალ error - ს message - ით You are not logged in რომელსაც 
                // catch ბლოკი დაიჭერს და alert - ის სახით გამოგვიტანს
            };

            setUser(null);

            toast.update(toastId, {
                render: 'Logged out successfully!',
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

    return (
        <AuthContext.Provider value={{user, signup, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};