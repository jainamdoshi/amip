'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const slideImages = [
    {
        url: 'https://img.myloview.cz/plakaty/car-parts-or-auto-car-spare-400-367068521.jpg',
        title: 'Quality Auto Parts',
        subtitle: 'For Every Vehicle Make and Model',
    },
    {
        url: 'https://carpart.com.au/uploads/blog/354232/ScreenShot2019-03-17at93149PM-1669965562.png',
        title: 'Genuine OEM Parts',
        subtitle: 'Direct from Manufacturers',
    },
    {
        url: 'https://i.pinimg.com/564x/8f/84/3c/8f843c92657854f76d3dc9d5ba566dd3.jpg',
        title: 'Fast Delivery',
        subtitle: 'Nationwide Shipping Available',
    },
];

const vehicleMakes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Hyundai'];

const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='relative h-screen overflow-hidden'>
            {/* Background Images */}
            {slideImages.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        currentSlide === index ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${slide.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            ))}

            {/* Content */}
            <div className='container mx-auto px-4 h-full flex flex-col justify-center items-start relative z-10 pt-20'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='max-w-3xl'
                >
                    <h1 className='text-4xl md:text-6xl font-bold text-white mb-4'>{slideImages[currentSlide].title}</h1>
                    <p className='text-xl md:text-2xl text-gray-200 mb-8'>{slideImages[currentSlide].subtitle}</p>
                    <p className='text-lg text-gray-300 mb-10 max-w-2xl'>
                        Trusted by mechanics and car enthusiasts nationwide. We offer premium quality parts with 100% satisfaction
                        guarantee.
                    </p>

                    {/* Search Panel */}
                    {/* <div className='bg-white p-6 rounded-lg shadow-lg max-w-3xl'>
                        <h2 className='text-xl font-semibold mb-4 text-gray-800'>Find the Right Part</h2>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-600 mb-1'>Vehicle Make</label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select make' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {vehicleMakes.map((make) => (
                                            <SelectItem key={make} value={make.toLowerCase()}>
                                                {make}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-600 mb-1'>Vehicle Model</label>
                                <Input placeholder='Enter model' />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-600 mb-1'>Year</label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select year' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {years.map((year) => (
                                            <SelectItem key={year} value={year}>
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className='flex space-x-3'>
                            <Input
                                className='flex-grow'
                                placeholder='Search by part name, number or category...'
                                // icon={<Search className='h-5 w-5 text-gray-400' />}
                            />
                            <Button className='bg-red-500 hover:bg-red-600 text-white px-6'>
                                <Search className='h-4 w-4 mr-2' />
                                Find Parts
                            </Button>
                        </div>
                    </div> */}

                    {/* <div className='flex space-x-6 mt-10'>
                        <Button variant='outline' className='border-white hover:bg-white hover:text-black'>
                            View Catalog
                        </Button>
                        <Button className='bg-red-500 hover:bg-red-600 group'>
                            Request Quote
                            <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                        </Button>
                    </div> */}
                </motion.div>
            </div>

            {/* Slide Indicators */}
            <div className='absolute bottom-8 left-0 right-0 flex justify-center space-x-2'>
                {slideImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            currentSlide === index ? 'w-8 bg-red-500' : 'w-2 bg-white/50'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
