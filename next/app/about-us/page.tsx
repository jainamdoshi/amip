'use client';

import About from './about';
import Contact from './contact';
import Features from './feature';
import { motion } from 'framer-motion';

export default function AboutUS() {
    return (
        <main className='flex-1'>
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className='w-full py-12 md:py-28 lg:py-48 xl:py-52 bg-black'
                style={{
                    backgroundImage: 'url(https://www.zuluautoparts.co.za/wp-content/uploads/2022/03/Auto-Parts-1400x500.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className='px-4 md:px-6'>
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='flex flex-col items-center space-y-4 text-center'
                    >
                        <div className='space-y-2'>
                            <motion.h1
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white'
                            >
                                Amip Trading Co. L.L.C.
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className='text-white'
                            >
                                Auto Spare Part
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </motion.section>
            <About />
            <Features />
            <Contact />
        </main>
    );
}
