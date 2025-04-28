'use client';

import { motion } from 'framer-motion';
import { Award, ShieldCheck, Truck, Users } from 'lucide-react';

const features = [
    {
        icon: <Award className='h-10 w-10 text-red-500' />,
        title: 'Genuine Parts',
        description: 'All our products are authentic, genuine parts sourced directly from authorized manufacturers.',
    },
    {
        icon: <ShieldCheck className='h-10 w-10 text-red-500' />,
        title: 'Quality Assurance',
        description: 'All our parts undergo rigorous quality checks to ensure reliability and performance.',
    },
    {
        icon: <Truck className='h-10 w-10 text-red-500' />,
        title: 'Fast Delivery',
        description: 'With our extensive network, we ensure quick and efficient delivery across the country.',
    },
    {
        icon: <Users className='h-10 w-10 text-red-500' />,
        title: 'Export Support',
        description: 'Our team of automotive experts is always ready to assist you with any queries.',
    },
];

export default function Features() {
    return (
        <section className='py-16 bg-gray-900 text-white'>
            <div className='container mx-auto px-4'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl md:text-4xl font-bold mb-4'>Why Choose Us</h2>
                    <p className='text-lg text-gray-400 max-w-2xl mx-auto'>
                        {"We're committed to providing quality parts, excellent service, and a hassle-free shopping experience"}
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, margin: '-100px' }}
                            className='bg-gray-800 p-6 rounded-lg text-center'
                        >
                            <div className='bg-gray-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4'>
                                {feature.icon}
                            </div>
                            <h3 className='text-xl font-semibold mb-3'>{feature.title}</h3>
                            <p className='text-gray-400'>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
