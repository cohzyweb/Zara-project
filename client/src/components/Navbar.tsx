import { MenuIcon, XIcon } from 'lucide-react';
import { PrimaryButton } from './Buttons';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/#' },
        { name: 'Create', href: '/generate' },
        { name: 'Community', href: '/community' },
        { name: 'Plans', href: '/plans' },
    ];

    return (
        <motion.nav 
            className='fixed top-5 left-0 right-0 z-50 px-4'
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
        >
            <div className='max-w-6xl mx-auto flex items-center justify-between bg-black/50 backdrop-blur-md border border-white/4 rounded-2xl p-3'>
                <a href='/#' className="flex items-center">
                    <img src='/logo.svg' alt="logo" className="h-8" />
                </a>

                <div className='hidden md:flex items-center gap-8 text-sm font-medium text-gray-300'>
                    {navLinks.map((link) => (
                        <a href={link.href} key={link.name} className="hover:text-white transition-colors duration-200">
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className='hidden md:flex items-center gap-3'>
                    <a href='/signin' className='text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200'>
                        Sign in
                    </a>
                    <PrimaryButton className='hidden sm:inline-block'>Get Started</PrimaryButton>
                </div>

                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className='md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors'
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    {isOpen ? <XIcon className='size-6' /> : <MenuIcon className='size-6' />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className='fixed inset-0 z-50 md:hidden'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Backdrop */}
                        <div 
                            className="absolute inset-0 bg-black/40 backdrop-blur-md"
                            onClick={() => setIsOpen(false)}
                        />
                        
                        {/* Menu Panel */}
                        <motion.div 
                            className="absolute right-0 top-0 h-full w-64 bg-black/90 backdrop-blur-md border-l border-white/10 p-6 flex flex-col items-start gap-6"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "tween", duration: 0.3 }}
                        >
                            <div className="w-full flex justify-between items-center mb-8">
                                <Link to='/' onClick={()=> scrollTo(0,0)}>
                                    <img src='/logo' alt="logo" className="h-8" />
                                </Link>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    aria-label="Close menu"
                                >
                                    <XIcon className="size-6" />
                                </button>
                            </div>
                            
                            <div className="flex flex-col gap-6 w-full">
                                {navLinks.map((link) => (
                                    <a 
                                        key={link.name} 
                                        href={link.href} 
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium text-gray-300 hover:text-white transition-colors duration-200 py-2 border-b border-white/5"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                            
                            <div className="mt-auto pt-8 border-t border-white/10 w-full flex flex-col gap-4">
                                <a 
                                    href='/signin' 
                                    onClick={() => setIsOpen(false)}
                                    className='font-medium text-gray-300 hover:text-white transition-colors duration-200 text-center py-3'
                                >
                                    Sign in
                                </a>
                                <PrimaryButton 
                                    onClick={() => setIsOpen(false)}
                                    className="w-full justify-center"
                                >
                                    Get Started
                                </PrimaryButton>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}