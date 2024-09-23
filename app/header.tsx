import Image from 'next/image';

export default function Header() {
    return (
        <div className='flex flex-row justify-center p-2'>
            <Image src={'/static/ATCO.png'} alt='ATCO' width={200} height={100} />
        </div>
    );
}
