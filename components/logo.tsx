import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ textColor, logoColor, className }: { textColor: string; logoColor: 'black' | 'white'; className?: string }) {
    return (
        <Link href='/' className={cn('text-sm font-bold flex flex-col content-center', className)}>
            <Image src={`/static/ATCO-${logoColor}.png`} alt='Logo' width={80} height={30} className='h-[1.75rem]' />
            <div className='flex justify-center w-full'>
                <span className={cn('transition-colors duration-300', textColor)}>Auto</span>
                <span className='text-red-500'>Parts</span>
            </div>
        </Link>
    );
}
