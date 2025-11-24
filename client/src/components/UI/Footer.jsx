import { memo } from 'react';

const Footer = memo(() => {
    return (
        <div>
            <img src='https://afritechcomputerske.com/assets/banner-main-1-BicStc4u.jpg' className='w-full h-40 object-cover' />
            <div className='flex gap-30 justify-center p-15'>
                <div className='font-extralight'>
                    <p className='text-xl font-normal'>About Our Team</p>
                    <p>Our Company</p>
                    <p>News</p>
                    <p>Investors Relations</p>
                    <p>Compliance</p>
                    <p>Product Recycling</p>
                    <p>Product Recalls</p>
                    <p>Executive Briefing Center</p>
                    <p>Laptop Cares</p>
                    <p>Careers</p>  
                </div>

                <div className='font-extralight'>
                    <p className='text-xl font-normal'>Products & Services</p>
                    <p>Laptops & Ultrabooks</p>
                    <p>Smarter AI for You</p>
                    <p>Desktop Computers</p>
                    <p>Workstations</p>
                    <p>Gaming</p>
                    <p>Tablets</p>
                    <p>Servers, Storage, & Networking</p>
                    <p>Accessories & Software</p>
                    <p>Services & Warranty</p>
                    <p>Product FAQs</p>
                    <p>Outlet</p>
                    <p>Deals</p>
                    <p>Cloud Security Software</p>
                    <p>Windows 11 Upgrade</p>
                </div>
                    
                <div className='font-extralight'>
                    <p className='text-xl font-normal'>Shop By Industry</p>
                    <p>Small Business Solutions</p>
                    <p>Large Enterprise Solutions</p>
                    <p>Government Solutions</p>
                    <p>Healthcare Solutions</p>
                    <p>Higher Education Solutions</p>
                    <p>Education Discounts</p>
                    <p>Discount Programs</p>
                </div>


                <div className='font-extralight'>
                    <p className='text-xl font-normal'>Resources</p>
                    <p>Legion Gaming Community</p>
                    <p>Customer Discounts</p>
                    <p>Affiliate Program</p>
                    <p>Affinity Program</p>
                    <p>Employee Purchase Program</p>
                    <p>Where to Buy</p>
                    <p>Glossary</p>
                    <p>Knowledgebase</p>
                    <p>Server Buying Guide</p>
                </div>


                <div className='font-extralight'>
                    <p className='text-xl font-normal'>Customer Support</p>
                    <p>Contact Us</p>
                    <p>Policy FAQs</p>
                    <p>Return Policy</p>
                    <p>Shipping Information</p>
                    <p>Order Lookup</p>
                    <p>Register a Product</p>
                    <p>Replacement Parts</p>
                    <p>Technical Support</p>
                    <p>Forums</p>
                    <p>Provide Feedback</p>
                </div>
            </div>
            <div className='flex justify-center items-center mb-5'>
                <p>&copy; {new Date().getFullYear()} Laptomania. All rights reserved.</p>
            </div>
        </div>
    )
});

export default Footer;