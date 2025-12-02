import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";

import logo from '../../images/logo.png';
import menuImg from '../../images/menu (1).png';
import closeImg from '../../images/close.png';
import { useState } from "react";
import { useLaptop } from "../../context/LaptopContext";

const Nav = () => {
    const { user, logout } = useAuth();
    const { cart, reduceByOne, addToCart, deleteProduct, clearCart } = useLaptop();
    const [isOpen, setIsOpen] = useState(false);
    const [menu, setMenu] = useState(false);

    return (
        <>
            <header className="lg:flex lg:justify-center p-5">
                <nav>
                    <ul className="lg:flex lg:flex-row md:flex md:flex-col sm:flex sm:flex-col">
                        <div className="mr-50 flex justify-between items-center w-full mb-2">
                            <img src={logo} className="w-40" />
                            <div className="lg:hidden md:flex md:flex-row md:justify-center md:items-center md:gap-10 sm:flex sm:flex-row sm:justify-center sm:items-center sm:gap-10 flex flex-row gap-10 justify-center items-center">
                                <div className={`relative ${user ? 'block' : 'hidden'}`}>
                                    <li onClick={() => setIsOpen(true)}>Cart</li>
                                    {
                                        cart.length > 0 && (
                                            <p className="absolute top-[-15px] right-[-15px] bg-red-400 w-5 h-5 flex justify-center items-center rounded-full text-white text-[13px]">{cart.reduce((acc, curValue) => acc + curValue.quantity, 0)}</p>
                                        )
                                    }
                                </div>
                                {
                                    menu ? (
                                        <img src={closeImg} onClick={() => setMenu((prev) => !prev)} className="w-4 h-4" />
                                    ) : (
                                        <img src={menuImg} onClick={() => setMenu((prev) => !prev)} className="w-7" />
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <div className={`lg:flex gap-15 md:${menu ? 'block' : 'hidden'} sm:${menu ? 'block' : 'hidden'} ${menu ? 'block' : 'hidden'} pr-8`}>
                                <li><Link to='/'>Home</Link></li>
                                {
                                    user ? (
                                        <>
                                            <div className="relative lg:block md:hidden sm:hidden hidden">
                                                <li onClick={() => setIsOpen(true)}>Cart</li>
                                                {
                                                    cart.length > 0 && (
                                                        <p className="absolute top-[-15px] right-[-15px] bg-red-400 w-5 h-5 flex justify-center items-center rounded-full text-white text-[13px]">{cart.reduce((acc, curValue) => acc + curValue.quantity, 0)}</p>
                                                    )
                                                }
                                            </div>
                                            <li><Link to='/profile'>Profile</Link></li>
                                            <li><Link to='/laptops'>Laptops</Link></li>
                                            <li className="lg:border-none lg:text-start lg:p-0 lg:mt-0 md:border md:text-center md:p-1 md:mt-2 sm:border sm:text-center sm:p-1 sm:mt-2 mt-2 border text-center p-1 w-full"><Link onClick={logout} to='/login'>Logout</Link></li>
                                        </>
                                    ) : (
                                        <div className="lg:flex lg:flex-row lg:gap-15 md:flex md:flex-col sm:flex sm:flex-col flex flex-col gap-2">
                                            <li className="lg:border-none lg:text-start lg:p-0 lg:mt-0 md:border md:text-center md:p-1 md:mt-2 sm:border sm:text-center sm:p-1 sm:mt-2 border text-center p-1"><Link to='/signup'>Signup</Link></li>
                                            <li className="lg:border-none lg:text-start lg:p-0 lg:mt-0 md:border md:text-center md:p-1 md:mt-2 sm:border sm:text-center sm:p-1 sm:mt-2 border text-center p-1"><Link to='/login'>Login</Link></li>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
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