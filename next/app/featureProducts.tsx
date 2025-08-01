'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import v from 'voca';
import { fetchCategories } from './api/categories/categories';
import { useUserId } from '@/providers/userProvider';

export default function FeaturedProducts() {
    const [activeTab, setActiveTab] = useState('all');
    const userId = useUserId();

    const {
        data: rawCategories,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['productCategories'],
        queryFn: () => fetchCategories(userId),
    });

    if (isLoading || isError) {
        return;
    }

    const categories = rawCategories?.results.categories || [];
    const filteredProducts = activeTab === 'all' ? categories : categories.filter((category) => category.category === activeTab);

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const cardVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    const imageVariants: Variants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.4,
                ease: 'easeOut',
            },
        },
    };

    const subCategoryVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
            },
        },
        hover: {
            scale: 1.02,
            x: 4,
            transition: {
                duration: 0.2,
                ease: 'easeOut',
            },
        },
    };

    const subCategoryContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
            },
        },
    };

    const titleVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section className='w-full py-12 md:py-16 lg:py-20'>
            <div className='container px-4 md:px-6 mx-auto'>
                <motion.div
                    className='text-center mb-12'
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, margin: '-100px' }}
                    variants={titleVariants}
                >
                    <motion.h2 className='text-3xl md:text-4xl font-bold mb-4' variants={titleVariants}>
                        Featured Products
                    </motion.h2>
                    <motion.p className='text-lg text-gray-600 max-w-2xl mx-auto' variants={titleVariants}>
                        Our most popular and highly rated auto parts chosen by customers
                    </motion.p>
                </motion.div>
                <motion.div initial='hidden' whileInView='visible' viewport={{ once: true, margin: '-100px' }} variants={containerVariants}>
                    <Tabs defaultValue='all' className='mb-8' onValueChange={setActiveTab}>
                        <TabsList className='flex justify-center flex-wrap gap-2 bg-gray-100 h-auto'>
                            <TabsTrigger
                                value='all'
                                className='data-[state=active]:bg-red-500 data-[state=active]:text-white text-md font-normal'
                            >
                                All Products
                            </TabsTrigger>
                            {categories.map((category) => (
                                <TabsTrigger
                                    key={category.category}
                                    value={category.category}
                                    className='data-[state=active]:bg-red-500 data-[state=active]:text-white text-md font-normal'
                                >
                                    {v.capitalize(category.category, true)}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </motion.div>
                <div className='grid gap-8 md:gap-10 lg:gap-12'>
                    {filteredProducts.map((category) => (
                        <motion.div
                            key={category.category}
                            className='group relative overflow-hidden rounded-2xl bg-card border shadow-sm'
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                                transition: {
                                    duration: 0.3,
                                    ease: 'easeOut',
                                },
                            }}
                        >
                            <div className='grid lg:grid-cols-5 gap-6 p-6 md:p-8'>
                                {/* Category Image and Title */}
                                <motion.div
                                    className='lg:col-span-2 space-y-4'
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <motion.div className='relative overflow-hidden rounded-xl' whileHover='hover'>
                                        <motion.div variants={imageVariants}>
                                            <Image
                                                style={{ objectFit: 'contain' }}
                                                src={`/static/products/${v.slugify(category.category)}.jpg`}
                                                alt={category.category}
                                                width={400}
                                                height={300}
                                                className='w-full h-48 md:h-64 object-cover'
                                            />
                                        </motion.div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        <h3 className='text-2xl md:text-3xl font-bold text-foreground'>{category.category}</h3>
                                        <p className='text-muted-foreground mt-2'>
                                            {category.total_products.toLocaleString()} products available
                                        </p>
                                    </motion.div>
                                </motion.div>

                                {/* Sub-categories */}
                                <motion.div
                                    className='lg:col-span-3'
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <div className='h-full flex flex-col'>
                                        <div className='flex-1'>
                                            <motion.div
                                                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'
                                                variants={subCategoryContainerVariants}
                                                initial='hidden'
                                                whileInView='visible'
                                                viewport={{ once: true }}
                                            >
                                                {category.products.map((product) => (
                                                    <motion.div
                                                        key={product}
                                                        variants={subCategoryVariants}
                                                        whileHover='hover'
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <Link
                                                            href={`/catalog?product_name=${encodeURIComponent(product)}`}
                                                            className='group/link flex items-center justify-between p-3 rounded-lg border bg-background/50 hover:bg-accent hover:text-accent-foreground transition-colors duration-200'
                                                        >
                                                            <span className='text-sm font-medium truncate pr-2'>{product}</span>
                                                            <ArrowRight className='h-3 w-3 flex-shrink-0' />
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
