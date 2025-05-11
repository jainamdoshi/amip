import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className='bg-gray-900 text-white'>
            <div className='container mx-auto px-4 py-12'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0'>
                    <div className='w-1/4'>
                        <Link href='/' className='text-2xl font-bold flex flex-col justify-center items-center'>
                            <Image src={`/static/ATCO-white.png`} alt='Logo' width={120} height={30} className='h-[3.75rem]' />
                            <div className='flex justify-center w-full'>
                                <span className='transition-colors duration-300 text-white'>Auto</span>
                                <span className='text-red-500'>Parts</span>
                            </div>
                        </Link>
                        <p className='text-gray-400 my-6 text-wrap ml-2'>
                            Premium auto parts supplier with over 20 years of experience. Genuine parts, competitive prices, and exceptional
                            service.
                        </p>
                    </div>

                    <div>
                        <h3 className='text-lg font-medium mb-4'>Contact Us</h3>
                        <ul className='space-y-4'>
                            <li className='flex items-start'>
                                <MapPin className='h-5 w-5 text-red-500 mr-3 mt-0.5' />
                                <span className='text-gray-400'>
                                    Shop No. 5, Abbdullah Mohd Saeed Al Ghobash
                                    <br />
                                    Naif Area, Near Tabha (Sutchi) Hotel
                                    <br />
                                    Opposite 7 Stage Building Gate 2
                                </span>
                            </li>
                            <li className='flex items-center'>
                                <Phone className='h-5 w-5 text-red-500 mr-3' />
                                <span className='text-gray-400'>+971 4 229 2192</span>
                            </li>
                            <li className='flex items-center'>
                                <Mail className='h-5 w-5 text-red-500 mr-3' />
                                <span className='text-gray-400'>amipdxb@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-lg font-medium mb-4'>Quick Links</h3>
                        <ul className='space-y-3'>
                            <li>
                                <Link href='/about-us' className='text-gray-400 hover:text-white transition-colors'>
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center'>
                    <p className='text-gray-500 text-sm mb-4 md:mb-0'>© {new Date().getFullYear()}. Amip Trading Co. L.L.C.</p>
                    <div className='flex space-x-4'>
                        <Button variant='ghost' size='icon' className='rounded-full hover:bg-white/10'>
                            <Facebook className='h-5 w-5' />
                        </Button>
                        <Button variant='ghost' size='icon' className='rounded-full hover:bg-white/10'>
                            <Instagram className='h-5 w-5' />
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
