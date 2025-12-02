import { useAuth } from "../context/AuthContext";
import AddLaptop from "./AddLaptop";
import LaptopList from "./LaptopList";
import background from '../images/backgroundForProfilePage.png';
import email from '../images/mail (1).png';
import messenger from '../images/messenger.png';
import call from '../images/phone-call.png';
import Footer from "../components/UI/Footer";


/* useMemo - არის კაუჭი რომელსაც ჩვენ ვიყენებთ მაშინ როდესაც გვაქვს ძვირიანი გამოთვლა, მაგალითად დიდი რიცხვის ფაქტორიალის გაგება, useMemo - კაუჭი გამოიყენება
ოპტიმიზაციისთვის, იმ შემთხვევაში თუ მომხარებელმა შემოიტანა ისევ ის დიდი რიცხვი რომლის ფაქტორიალიც უკვე გამოთვლილია მაშინ useMemo - ამ რიცხვის ქეშირებულ
შედეგს დააბრუნებს 

useCallback - არის კაუჭი რომელიც გამოიყენება ოპტიმიზაციისთვის, ჩვენ ამ კაუჭს გამოვიყენებთ მაშინ როდესაც არ გვინდა ხელახლა შეიქმნას ისეთი ფუნქცია
რომლის ლოგიკაც არ იცვლება, მაგალითად როდესაც გვაქვს კომპონენტი რომლის მდგომარეობაც იცვლება, ის გამოიწვევს მთლიანი კომპონენტის (მასში არსეუბლი შეგთავსის)
ხელახლა დარენდრებას, შექმნას, ისეთი ფუნქციები რომლის ლოგიკაც არ იცვლება ვიყენებთ useCallback კაუჭს, და ის მხოლოდ მაშინ შეიქმნება ხელახლა როდესაც დამოკიდებულების 
მასივი შეიცვლება */

const Profile = () => {
    const { user } = useAuth();

    console.log(user);
    const initials = user.fullname.split(' ');

    return (
        <>
            <div className='relative mb-20'>
                <img src={background} />
                <div className='absolute top-40 right-60 lg:block md:hidden sm:hidden hidden'>
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
            <div className="lg:pl-20 md:pl-10 sm:pl-5 pl-5">
                <div className="border w-20 h-20 rounded-full flex justify-center items-center">
                    {
                        user.avatar ? (
                            <img src={user.avatar} className="rounded-full" />
                        ) : (
                            <p className="text-2xl font-black">{initials.length > 1 ? initials[0][0].toUpperCase() + initials[1][0].toUpperCase() : initials[0][0].toUpperCase()}</p>
                        )
                    }
                </div>
                <p className="mb-5 mt-5">SIGNED IN AS: {user.email}</p>
                <p className="lg:mb-10 md:mb-5 sm:mb-5 mb-5">ROLE: {user.role}</p>
            </div>

            {(user.role === 'admin' || user.role === 'moderator') && (
                <div className="lg:pl-20 md:pl-10 sm:pl-5 pl-5">
                    <AddLaptop />
                    <LaptopList />
                </div>
            )}

            <Footer />
        </>
    )
}

export default Profile;