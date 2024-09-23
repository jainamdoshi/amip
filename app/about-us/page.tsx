/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Truck, Users } from 'lucide-react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

export default function AboutUS() {
    const sections = [
        {
            title: 'Who We Are?',
            content: `At Amip Trading Co. L.L.C., we aim to provide our customers with an efficient, easy-to-use, and
                convenient way to purchase automotive spare parts. We specialize in selling a wide range of aftermarket
                automotive products, catering to various makes and models. Based in Dubai, UAE, we have been proudly
                serving the automotive industry since 2003.`,
        },
        {
            title: 'Our History and Expertise',
            content: `As a family-owned business with extensive experience in importing and exporting goods, we have
                built a reputation for excellence and reliability. Our knowledgeable team is dedicated to offering
                exceptional customer service, ensuring you get the right parts for your vehicle every time.`,
        },
        {
            title: 'Our Range and Capabilities',
            content: `With a manufacturing facility in India and a robust network across the GCC & Africa, 
                we have the capacity to supply a vast range of automotive spare parts. 
                Our superior product range means we can deliver your orders faster and at competitive prices.`,
        },
        {
            title: 'Customer Support and Service',
            content: `Our online shop makes it easy for you to browse for specific products using your vehicle's make and model. 
                If you have trouble finding a product, please contact us with your car details. 
                Our experienced staff will assist you in locating any parts you may need. At Amip Trading Co. L.L.C., 
                we have access to almost every aftermarket part & Genuine as well for your car, so "if they make it, we sell it!"`,
        },
        {
            title: 'Our Commitment',
            content: `We take pride in our experienced staff, exceptional customer service, extensive product range,
                competitive pricing, and user-friendly online shop. We are committed to providing you with the RIGHT
                PARTS, at the RIGHT PRICE, RIGHT NOW!`,
        },
    ];

    const teamMembers = [
        {
            name: 'Harshal Doshi',
            position: 'Owner',
            image: '/public/person_placeholder.jpg',
            phone: {
                number: '971559981864',
                label: '+971 55 9981864',
            },
            email: 'amipdxb@gmail.com',
        },
        {
            name: 'Kalpesh Doshi',
            position: 'Manager',
            image: '/public/person_placeholder.jpg',
            phone: {
                number: '971559981864',
                label: '+971 55 9981864',
            },
            email: 'amipdxb@gmail.com',
        },
    ];

    return (
        <main className='flex-1'>
            <section
                className='w-full py-12 md:py-28 lg:py-48 xl:py-52 bg-black'
                style={{
                    backgroundImage:
                        'url(https://www.zuluautoparts.co.za/wp-content/uploads/2022/03/Auto-Parts-1400x500.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className='px-4 md:px-6'>
                    <div className='flex flex-col items-center space-y-4 text-center'>
                        <div className='space-y-2'>
                            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white'>
                                Amip Trading Co. L.L.C.
                            </h1>
                            <p className='text-white'>Auto Spare Part</p>
                        </div>
                    </div>
                </div>
            </section>
            <div>
                {sections.map((section, i) => (
                    <Section key={i} title={section.title} content={section.content} />
                ))}
            </div>
            <section className='w-full py-12 md:py-24 lg:py-32'>
                <div className='px-4 md:px-6'>
                    <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center'>
                        Why Choose Us
                    </h2>
                    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        <Card>
                            <CardContent className='flex flex-col items-center space-y-2 p-6'>
                                <ShieldCheck className='h-12 w-12 text-primary' />
                                <h3 className='text-xl font-bold'>Quality Assurance</h3>
                                <p className='text-sm text-gray-500 text-center'>
                                    All our parts undergo rigorous quality checks to ensure reliability and performance.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className='flex flex-col items-center space-y-2 p-6'>
                                <Truck className='h-12 w-12 text-primary' />
                                <h3 className='text-xl font-bold'>Fast Delivery</h3>
                                <p className='text-sm text-gray-500 text-center'>
                                    With our extensive network, we ensure quick and efficient delivery across the
                                    country.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className='flex flex-col items-center space-y-2 p-6'>
                                <Users className='h-12 w-12 text-primary' />
                                <h3 className='text-xl font-bold'>Expert Support</h3>
                                <p className='text-sm text-gray-500 text-center'>
                                    Our team of automotive experts is always ready to assist you with any queries.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100'>
                <div className='px-4 md:px-6'>
                    <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center'>
                        Our Team
                    </h2>
                    <div className='flex flex-row flex-wrap justify-around'>
                        {teamMembers.map((member) => (
                            <div key={member.name} className='flex flex-col items-center my-2'>
                                <h3 className='text-xl font-bold'>{member.name}</h3>
                                <img
                                    className='w-[200px] h-[200px] rounded-2xl'
                                    src='https://thumbs.dreamstime.com/b/homem-cinzento-do-placeholder-da-foto-pessoa-136701243.jpg'
                                />
                                <p className='text-sm text-gray-500 mt-3'>{member.position}</p>
                                <div className='text-sm text-gray-500'>
                                    <Button variant='link'>
                                        <FaWhatsapp size={20} />
                                        <span>
                                            <Link
                                                href={`https://api.whatsapp.com/send?phone=${member.phone.number}&text=Hello`}
                                            >
                                                {member.phone.label}
                                            </Link>
                                        </span>
                                    </Button>
                                </div>
                                <p className='text-sm text-gray-500'>{member.email}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

function SubTitle({ title }: { title: string }) {
    return (
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center content-center'>
            {title}
        </h2>
    );
}

function Section({ title, content }: { title: string; content: string }) {
    return (
        <section className='w-full py-6 md:py-12 lg:py-16 bg-gray-100'>
            <div className='px-4 md:px-6 flex flex-col md:items-stretch md:gap-6'>
                <SubTitle title={title} />
                <p className='mt-4 md:mt-0 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed flex-grow text-justify mx-12 md:mx-24 lg:mx-32'>
                    {content}
                </p>
            </div>
        </section>
    );
}
