import background from '../images/backgroundForHomePage.jpg';
import email from '../images/mail (1).png';
import messenger from '../images/messenger.png';
import call from '../images/phone-call.png'
import laptops from '../images/laptops.png';
import LaptopList from './LaptopList';
import Footer from '../components/UI/Footer';

const Home = () => {
    return (
        <>
            <div className='relative mb-20'>
                <img src={background} className='w-full' />
                <div className='absolute top-40 right-60 lg:block [1400px]:top-20 md:hidden sm:hidden hidden'>
                    <p className='text-white text-5xl font-black mb-10'>Lorem ipsum dolor <br /> adipisicing elit.</p>
                    <button className='text-white border p-2 w-30 text-[15px] mb-10'>VIEW MORE</button>

                    <div className='lg:flex lg:flex-col lg:gap-5'>
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
            <div className='flex flex-col gap-2 justify-center items-center'>
                <p className='font-extralight lg:text-5xl md:text-5xl sm:text-4xl text-3xl'>Find Your Perfect Laptop</p>
                <img src={laptops} className='w-300' />
            </div>
            <div>
                <LaptopList />
            </div>
            {/* <div className='flex justify-center gap-15 mb-20'>
                <img src={laptop} className='w-135' />
                <div>
                    <p className='mb-10'><span className='font-light text-4xl'>Welcome!</span><br /> <span className='font-black text-5xl'>ABOUT US</span></p>
                    <p className='font-light mb-5' style={{color: 'var(--text-color, #818181)'}}>The highly-trained technicians have many years of experience with all <br /> laptop, notebook, macbook and desktop computer repairs. We pride <br /> our company on honesty and the good relationships forged through <br /> customer satisfaction. We service all makes and models of MAC <br /> laptops, Imac, PC laptops, notebooks and most desktops: Dell, Sony, <br /> IBM, HP, Acer, Apple, etc.</p>
                    <button className='border p-3 text-[14px]'>GO TO LAPTOPS PAGE</button>
                </div>
            </div> */}
            <Footer />
        </>
    )
}

export default Home;