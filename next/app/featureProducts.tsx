'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const products = [
    {
        id: 1,
        name: 'ROD/ARM BUSH RUBBER',
        category: 'suspension',
        price: 89.99,
        rating: 4.8,
        image: 'https://www.jikiu.com/images/069d3bb002acd8d7dd095917f9efe4cb/thumb_images/6c9c8956817e303e7b7692b7d34dce02.jpg',
        discount: 15,
        tag: 'Best Seller',
        stock: 42,
    },
    {
        id: 2,
        name: 'V-BELT',
        category: 'suspension',
        price: 89.99,
        rating: 4.8,
        image: 'https://www.jikiu.com/images/069d3bb002acd8d7dd095917f9efe4cb/thumb_images/6a11f8d6a8b58b13682e4664c1392f82.jpg',
        discount: 15,
        tag: 'Best Seller',
        stock: 42,
    },
    // {
    //     product_name: 'ROD/ARM BUSH RUBBER',
    //     product_image: ['https://www.jikiu.com/images/069d3bb002acd8d7dd095917f9efe4cb/thumb_images/6c9c8956817e303e7b7692b7d34dce02.jpg'],
    // },
    // {
    //     id: 2,
    //     name: 'Heavy Duty Alternator',
    //     category: 'electrical',
    //     price: 149.99,
    //     rating: 4.7,
    //     image: 'https://images.pexels.com/photos/3807172/pexels-photo-3807172.jpeg',
    //     discount: 0,
    //     tag: '',
    //     stock: 18,
    // },
    // {
    //     id: 3,
    //     name: 'Engine Oil Filter',
    //     category: 'filters',
    //     price: 12.99,
    //     rating: 4.5,
    //     image: 'https://images.pexels.com/photos/3807195/pexels-photo-3807195.jpeg',
    //     discount: 0,
    //     tag: '',
    //     stock: 120,
    // },
    // {
    //     id: 4,
    //     name: 'Performance Spark Plugs',
    //     category: 'engine',
    //     price: 24.99,
    //     rating: 4.9,
    //     image: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg',
    //     discount: 10,
    //     tag: 'Hot Deal',
    //     stock: 35,
    // },
    // {
    //     id: 5,
    //     name: 'Power Steering Pump',
    //     category: 'steering',
    //     price: 129.99,
    //     rating: 4.6,
    //     image: 'https://images.pexels.com/photos/188777/pexels-photo-188777.jpeg',
    //     discount: 0,
    //     tag: '',
    //     stock: 14,
    // },
    // {
    //     id: 6,
    //     name: 'Suspension Control Arm',
    //     category: 'suspension',
    //     price: 79.99,
    //     rating: 4.7,
    //     image: 'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg',
    //     discount: 5,
    //     tag: '',
    //     stock: 27,
    // },
    // {
    //     id: 7,
    //     name: 'LED Headlight Bulbs',
    //     category: 'electrical',
    //     price: 49.99,
    //     rating: 4.8,
    //     image: 'https://images.pexels.com/photos/210158/pexels-photo-210158.jpeg',
    //     discount: 0,
    //     tag: 'New Arrival',
    //     stock: 50,
    // },
    // {
    //     id: 8,
    //     name: 'High Flow Air Filter',
    //     category: 'filters',
    //     price: 29.99,
    //     rating: 4.5,
    //     image: 'https://images.pexels.com/photos/4489794/pexels-photo-4489794.jpeg',
    //     discount: 0,
    //     tag: '',
    //     stock: 65,
    // },
];

export default function FeaturedProducts() {
    const [activeTab, setActiveTab] = useState('all');
    const router = useRouter();

    const filteredProducts = activeTab === 'all' ? products : products.filter((product) => product.category === activeTab);

    const renderStars = (rating: number) => {
        return Array(5)
            .fill(0)
            .map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ));
    };

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
                    <h2 className='text-3xl md:text-4xl font-bold mb-4'>Featured Products</h2>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                        Our most popular and highly rated auto parts chosen by customers
                    </p>
                </motion.div>

                <Tabs defaultValue='all' className='mb-12' onValueChange={setActiveTab}>
                    <div className='flex justify-center'>
                        <TabsList className='bg-gray-100'>
                            <TabsTrigger value='all' className='data-[state=active]:bg-red-500 data-[state=active]:text-white'>
                                All Products
                            </TabsTrigger>
                            <TabsTrigger value='suspension' className='data-[state=active]:bg-red-500 data-[state=active]:text-white'>
                                Suspension
                            </TabsTrigger>
                            <TabsTrigger value='brakes' className='data-[state=active]:bg-red-500 data-[state=active]:text-white'>
                                Brakes
                            </TabsTrigger>
                            <TabsTrigger value='electrical' className='data-[state=active]:bg-red-500 data-[state=active]:text-white'>
                                Electrical
                            </TabsTrigger>
                            <TabsTrigger value='filters' className='data-[state=active]:bg-red-500 data-[state=active]:text-white'>
                                Filters
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </Tabs>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            viewport={{ once: true, margin: '-100px' }}
                        >
                            <Card className='h-full group relative'>
                                {/* {product.tag && <Badge className='absolute top-3 left-3 z-10 bg-red-500'>{product.tag}</Badge>}

                                {product.discount > 0 && (
                                    <Badge className='absolute top-3 right-3 z-10 bg-green-500'>{product.discount}% Off</Badge>
                                )} */}

                                <div className='relative h-56 overflow-hidden'>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className='object-cover transition-transform duration-500 group-hover:scale-110'
                                    />

                                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100'>
                                        <div className='flex gap-2'>
                                            {/* <Button size='icon' variant='secondary' className='rounded-full'>
                                                <ShoppingCart className='h-4 w-4' />
                                            </Button>
                                            <Button size='icon' variant='secondary' className='rounded-full'>
                                                <Heart className='h-4 w-4' />
                                            </Button> */}
                                            <Link href={`/catalog?product_name=${encodeURIComponent(product.name)}`}>
                                                <Button size='icon' variant='secondary' className='rounded-full'>
                                                    <Eye className='h-4 w-4' />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <CardContent className='pt-6'>
                                    <div className='flex justify-between mb-2'>
                                        <span className='text-sm text-gray-500 uppercase'>{product.category}</span>
                                        {/* <div className='flex items-center'>{renderStars(product.rating)}</div> */}
                                    </div>

                                    <h3 className='font-semibold text-lg mb-2 group-hover:text-red-500 transition-colors'>
                                        {product.name}
                                    </h3>

                                    <div className='flex items-center justify-between'>
                                        {/* <div>
                                            {product.discount > 0 ? (
                                                <div className='flex items-center gap-2'>
                                                    <span className='text-xl font-bold text-red-500'>
                                                        ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                                                    </span>
                                                    <span className='text-gray-500 line-through text-sm'>${product.price.toFixed(2)}</span>
                                                </div>
                                            ) : (
                                                <span className='text-xl font-bold'>${product.price.toFixed(2)}</span>
                                            )}
                                        </div> */}

                                        {/* <span
                                            className={`text-sm ${
                                                product.stock > 20
                                                    ? 'text-green-500'
                                                    : product.stock > 5
                                                    ? 'text-yellow-500'
                                                    : 'text-red-500'
                                            }`}
                                        >
                                            {product.stock > 20 ? 'In Stock' : product.stock > 5 ? 'Low Stock' : 'Almost Gone'}
                                        </span> */}
                                    </div>
                                </CardContent>

                                {/* <CardFooter>
                                    <Button className='w-full bg-gray-900 hover:bg-red-500 transition-colors'>
                                        <ShoppingCart className='h-4 w-4 mr-2' />
                                        Add to Cart
                                    </Button>
                                </CardFooter> */}
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* <div className='mt-12 text-center'>
                    <Button
                        size='lg'
                        className='bg-red-500 hover:bg-red-600'
                        onClick={() => {
                            router.push('/products');
                        }}
                    >
                        View All Products
                    </Button>
                </div> */}
            </div>
        </section>
    );
}
