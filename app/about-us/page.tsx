import About from './about';
import Contact from './contact';
import Features from './feature';

export default function AboutUS() {
    return (
        <main className='flex-1'>
            <section
                className='w-full py-12 md:py-28 lg:py-48 xl:py-52 bg-black'
                style={{
                    backgroundImage: 'url(https://www.zuluautoparts.co.za/wp-content/uploads/2022/03/Auto-Parts-1400x500.jpg)',
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
            <About />
            <Features />
            <Contact />
        </main>
    );
}
