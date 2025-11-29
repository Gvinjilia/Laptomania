import Footer from "../components/UI/Footer";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import google from '../images/search (5).png';

const SignUp = () => {
    const { signup, googleAuth } = useAuth();

    const [formData, handleChange] = useForm({
        fullname: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        signup(formData);
    };

    return (
        <>
            <main className="flex flex-col justify-center items-center mt-10">
                <div className="mb-15">
                    <h1 className="mb-5">Signup Page</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <input type="text" name="fullname" value={formData.fullname} placeholder="Enter Fullname" onChange={handleChange} className="w-200 border p-2" required />
                        <input type="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} className="w-200 border p-2" required />
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-200 border p-2" placeholder="Enter Password" required />
                        <button className="text-white p-2 font-medium mb-3" style={{backgroundColor: 'var(--button-color, #7462AB)'}}>Submit</button>
                    </form>

                    <button className="border flex justify-center items-center gap-3 p-2 font-medium w-full" onClick={googleAuth}><img src={google} className="w-5" />Continue with Google</button>
                </div>
            </main>

            <Footer />
        </>
    )
}

export default SignUp;