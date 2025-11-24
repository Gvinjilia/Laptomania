import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";

import logo from '../../images/logo.png';
import { useState } from "react";
import { useLaptop } from "../../context/LaptopContext";

const Nav = () => {
    const { user, logout } = useAuth();
    const { cart, reduceByOne, addToCart, deleteProduct, clearCart } = useLaptop();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="flex justify-center items-center p-5">
                <nav>
                    <ul className="flex gap-15">
                        <div className="mr-50">
                            <img src={logo} className="w-40" />
                        </div>
                        <li><Link to='/'>Home</Link></li>
                        {
                            user ? (
                                <>
                                    <div className="relative">
                                        <li onClick={() => setIsOpen(true)}>Cart</li>
                                        {
                                            cart.length > 0 && (
                                                <p className="absolute top-[-15px] right-[-15px] bg-red-400 w-5 h-5 flex justify-center items-center rounded-full text-white text-[13px]">{cart.reduce((acc, curValue) => acc + curValue.quantity, 0)}</p>
                                            )
                                        }
                                    </div>

                                    <li><Link to='/profile'>Profile</Link></li>
                                    <li><Link to='/laptops'>Laptops</Link></li>
                                    <li><Link onClick={logout} to='/login'>Logout</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to='/signup'>Signup</Link></li>
                                    <li><Link to='/login'>Login</Link></li>
                                </>
                            )
                        }
                    </ul>
                </nav>

                <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex flex-col ml-2">
                        <div className="flex justify-between items-center p-2 w-80">
                            <p>Your Cart</p>
                            <button onClick={() => setIsOpen(false)}>
                                X
                            </button>
                        </div>

                        <div>
                            {
                                cart.length === 0 ? (
                                    <div className="flex justify-center items-center">
                                        <p className="text-gray-500">Your cart is empty</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-10"> 
                                        {cart.map((item) => (
                                            <div key={item._id} className="flex gap-5 items-center">
                                                <img src={item.images[0].url} className="w-30 h-20" />
                                                <div className="flex flex-col gap-2">
                                                    <p>{item.brand} - {item.model}</p>
                                                    <p>Quantity: <button className="border w-6 mr-2" onClick={() => addToCart(item)}>+</button>{item.quantity}<button className="border w-6 ml-2" onClick={() => reduceByOne(item)}>-</button></p>
                                                    <p>Total Price: {item.quantity * item.price}</p>
                                                    <p className="mb-2">Price per laptop: {item.price}</p>

                                                    <button className="border p-2" onClick={() => deleteProduct(item)}>Delete Product</button>
                                                </div>
                                            </div>
                                        ))}

                                        <button className="border p-2" onClick={() => clearCart()}>Clear cart</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity" />
                )}
            </header>
        </>
    )
}

export default Nav;