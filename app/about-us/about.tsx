'use client';

import { motion } from 'framer-motion';
import { Building2, History, Box, HeadphonesIcon } from 'lucide-react';

const aboutSections = [
    {
        icon: <Building2 className='h-8 w-8 text-red-500' />,
        title: 'Who We Are',
        content:
            'At Amip Trading Co. L.L.C., we provide an efficient, easy-to-use, and convenient way to purchase automotive spare parts. Based in Dubai, UAE, we have been proudly serving the automotive industry since 2003, specializing in a wide range of aftermarket automotive products for various makes and models.',
    },
    {
        icon: <History className='h-8 w-8 text-red-500' />,
        title: 'Our History and Expertise',
        content:
            'As a family-owned business with extensive experience in importing and exporting goods, we have built a reputation for excellence and reliability. Our knowledgeable team is dedicated to offering exceptional customer service, ensuring you get the right parts for your vehicle every time.',
    },
    {
        icon: <Box className='h-8 w-8 text-red-500' />,
        title: 'Our Range and Capabilities',
        content:
            'With a manufacturing facility in India and a robust network across the GCC & Africa, we have the capacity to supply a vast range of automotive spare parts. Our superior product range means we can deliver your orders faster and at competitive prices.',
    },
    {
        icon: <HeadphonesIcon className='h-8 w-8 text-red-500' />,
        title: 'Customer Support',
        content:
            "Our online shop makes it easy to browse for specific products using your vehicle's make and model. With access to almost every aftermarket and genuine part, our experienced staff will assist you in locating any parts you need - because if they make it, we sell it!",
    },
];

export default function About() {
    return (
        <section className='py-16 bg-white'>
            <div className='container mx-auto px-4'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className='text-center mb-12'
                >
                    <h2 className='text-3xl md:text-4xl font-bold mb-4'>About Amip Trading</h2>
                    <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                        Your trusted partner in automotive spare parts since 2003, delivering the RIGHT PARTS, at the RIGHT PRICE, RIGHT
                        NOW!
                    </p>
                </motion.div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {aboutSections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, margin: '-100px' }}
                            className='bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'
                        >
                            <div className='flex items-start'>
                                <div className='bg-white p-3 rounded-lg shadow-sm'>{section.icon}</div>
                                <div className='ml-4'>
                                    <h3 className='text-xl font-semibold mb-2'>{section.title}</h3>
                                    <p className='text-gray-600 leading-relaxed'>{section.content}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className='mt-12 bg-gray-900 text-white rounded-lg p-8 text-center'
                >
                    <h3 className='text-2xl font-bold mb-4'>Our Commitment</h3>
                    <p className='text-lg text-gray-300 max-w-3xl mx-auto'>
                        We take pride in our experienced staff, exceptional customer service, extensive product range, competitive pricing,
                        and user-friendly online shop. We are committed to providing you with the RIGHT PARTS, at the RIGHT PRICE, RIGHT
                        NOW!
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
