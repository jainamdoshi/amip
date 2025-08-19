'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
    return (
        <section className='py-16'>
            <div className='container mx-auto px-4'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className='text-center mb-12'
                >
                    <h2 className='text-3xl md:text-4xl font-bold mb-4'>Get In Touch</h2>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                        Have questions about our products or need technical assistance? Our team is here to help.
                    </p>
                </motion.div>

                <div className='grid grid-cols-1 gap-8'>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true, margin: '-100px' }}
                        className='lg:col-span-1'
                    >
                        <div className='bg-gray-900 text-white rounded-lg p-8 h-full'>
                            <h3 className='text-2xl font-semibold mb-6'>Contact Information</h3>

                            <div className='flex flex-wrap w-full justify-start gap-3'>
                                <div className='flex items-start'>
                                    <div className='bg-red-500 p-3 rounded-full mr-4'>
                                        <MapPin className='h-5 w-5' />
                                    </div>
                                    <div>
                                        <h4 className='font-medium mb-1'>Our Location</h4>
                                        <Link href='https://maps.app.goo.gl/ck1ETYyJAtvZkNDX6'>
                                            <p className='text-gray-300 pr-2'>
                                                Shop 5 - 32A St Abdullah Mohd Syed Al Ghobaash Building
                                                <br />
                                                Al Nasser Square, Deira, Dubai
                                            </p>
                                        </Link>
                                    </div>
                                </div>

                                <div className='flex items-start'>
                                    <div className='bg-red-500 p-3 rounded-full mr-4'>
                                        <Phone className='h-5 w-5' />
                                    </div>
                                    <div>
                                        <h4 className='font-medium mb-1'>Phone Number</h4>
                                        <div className='flex items-center'>
                                            <p className='text-gray-300'>+971 4 229 2192</p>
                                        </div>
                                        <div className='space-y-2 mt-2'>
                                            <div>
                                                <Button variant='link' className='text-red-500 h-auto p-0' asChild>
                                                    <Link
                                                        href='https://api.whatsapp.com/send?phone=971559981864&text=Hello'
                                                        className='flex items-center gap-2'
                                                    >
                                                        <svg viewBox='0 0 24 24' className='h-4 w-4 fill-green-500'>
                                                            <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
                                                        </svg>
                                                        <span className='text-gray-300'>Harshal Doshi (+971 55 998 1864)</span>
                                                    </Link>
                                                </Button>
                                            </div>
                                            <div>
                                                <Button variant='link' className='text-red-500 h-auto p-0' asChild>
                                                    <Link
                                                        href='https://api.whatsapp.com/send?phone=971501234567&text=Hello'
                                                        className='flex items-center gap-2'
                                                    >
                                                        <svg viewBox='0 0 24 24' className='h-4 w-4 fill-green-500'>
                                                            <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
                                                        </svg>
                                                        <span className='text-gray-300'>Kalpesh Doshi (+971 54 748 8795)</span>
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex items-start'>
                                    <div className='bg-red-500 p-3 rounded-full mr-4'>
                                        <Mail className='h-5 w-5' />
                                    </div>
                                    <div>
                                        <h4 className='font-medium mb-1'>Email Address</h4>
                                        <p className='text-gray-300'>amipdxb@gmail.com</p>
                                    </div>
                                </div>

                                <div className='flex items-start'>
                                    <div className='bg-red-500 p-3 rounded-full mr-4'>
                                        <Clock className='h-5 w-5' />
                                    </div>
                                    <div>
                                        <h4 className='font-medium mb-1'>Business Hours</h4>
                                        <p className='text-gray-300'>Monday - Friday: 8:00 AM - 7:00 PM</p>
                                        <p className='text-gray-300'>Saturday: 8:00 AM - 5:00 PM</p>
                                        <p className='text-gray-300'>Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-8 pt-8 border-t border-gray-700'>
                                <h4 className='font-medium mb-3'>Follow Us</h4>
                                <div className='flex space-x-4'>
                                    <Link
                                        prefetch={false}
                                        href='https://www.instagram.com/amip_trading/'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <Button variant='ghost' size='icon' className='rounded-full hover:bg-white/10'>
                                            <Instagram className='h-5 w-5' />
                                        </Button>
                                    </Link>
                                    <Link
                                        prefetch={false}
                                        href='https://www.facebook.com/amiptrading'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <Button variant='ghost' size='icon' className='rounded-full hover:bg-white/10'>
                                            <Facebook className='h-5 w-5' />
                                        </Button>
                                    </Link>
                                    <Link
                                        prefetch={false}
                                        href='https://www.linkedin.com/in/amip-trading-70677645'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <Button variant='ghost' size='icon' className='rounded-full hover:bg-white/10'>
                                            <Linkedin className='h-5 w-5' />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
