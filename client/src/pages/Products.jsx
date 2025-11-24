import Footer from '../components/UI/Footer';
import email from '../images/mail (1).png';
import messenger from '../images/messenger.png';
import call from '../images/phone-call.png';
import LaptopList from "./LaptopList";

const Products = () => {
    return (
        <main>
            <div>
                <div className="relative mb-10">
                    <img src='https://afritechcomputerske.com/assets/banner-main-1-BicStc4u.jpg' className='h-150 w-full' />

                    <div className='absolute top-40 right-60'>
                        <p className='text-white text-5xl font-black mb-10'>Lorem ipsum dolor <br /> adipisicing elit.</p>
                        <button className='text-white border p-2 w-30 text-[15px] mb-10'>VIEW MORE</button>

                        <div className='flex flex-col gap-5'>
                            <div className='flex gap-3 items-center'>
                                <img src={call} className='w-5' />
                                <p className='text-white'>Contact Us: +597 123 456 78</p>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <img src={email} className='w-5' />
                                <p className='text-white'>Email: example@gmail.com</p>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <img src={messenger} className='w-5' />
                                <p className='text-white'>Message Us: Message us on email</p>  
                            </div>
                        </div>
                    </div>
                </div>
                <LaptopList />
            </div>
            <Footer />
        </main>
    );
};

export default Products;