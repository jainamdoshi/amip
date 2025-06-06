'use client';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, Phone, Search, ShoppingCart, User, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn('fixed w-full z-50 transition-all duration-300', isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5')}
        >
            <div className='container mx-auto px-4 flex items-center justify-between'>
                <div className='flex items-center gap-10'>
                    <Logo
                        logoColor={isScrolled || pathname !== '/' ? 'black' : 'white'}
                        textColor={isScrolled ? 'text-primary' : 'text-white'}
                    />
                </div>

                <div className='hidden md:flex items-center gap-4'>
                    <Button
                        variant='ghost'
                        size='sm'
                        asChild
                        className={cn(
                            'transition-colors duration-300',
                            isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                        )}
                    >
                        <Link href='/about-us'>About</Link>
                    </Button>
                    <Button
                        variant='ghost'
                        size='sm'
                        asChild
                        className={cn(
                            'transition-colors duration-300',
                            isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                        )}
                    >
                        <Link href='/catalog'>Catalog</Link>
                    </Button>
                </div>

                <Button variant='ghost' size='icon' className='md:hidden' onClick={() => setMobileMenuOpen(true)}>
                    <Menu className={cn('h-6 w-6 transition-colors duration-300', isScrolled ? 'text-gray-800' : 'text-white')} />
                </Button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 z-50'>
                    <div className='bg-white h-full w-4/5 max-w-sm p-5 shadow-xl animate-in slide-in-from-left'>
                        <div className='flex justify-between items-center mb-8'>
                            <Link href='/' className='text-2xl font-bold'>
                                <Image src='/static/ATCO.png' alt='Logo' width={100} height={50} className='h-8' />
                                <span className='text-primary'>Auto</span>
                                <span className='text-red-500'>Parts</span>
                            </Link>
                            <Button variant='ghost' size='icon' onClick={() => setMobileMenuOpen(false)}>
                                <X className='h-6 w-6' />
                            </Button>
                        </div>

                        <div className='space-y-6'>
                            <Link
                                href='/about-us'
                                className='block text-lg font-medium hover:text-primary'
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                        </div>
                        <div className='space-y-6'>
                            <Link
                                href='/catalog'
                                className='block text-lg font-medium hover:text-primary'
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Catalog
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
