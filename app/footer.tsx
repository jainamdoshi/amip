import Link from 'next/link';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {

    const iconSize = 40;

    return (
        <div className='bg-gray-800 text-white flex flex-row p-8 justify-center'>
            <div className='flex flex-row gap-3'>
                <Link href=''>
                    <FaFacebook size={iconSize} />
                </Link>
                <Link href=''>
                    <FaInstagram size={iconSize}/>
                </Link>
                <Link href=''>
                    <FaWhatsapp size={iconSize}/>
                </Link>
            </div>
        </div>
    );
}
