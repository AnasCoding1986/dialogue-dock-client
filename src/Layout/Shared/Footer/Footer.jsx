import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';

const Footer = () => {
    const quickLinks = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About Us' },
        { to: '/features', label: 'Features' },
        { to: '/pricing', label: 'Pricing' },
        { to: '/membership', label: 'Membership' },
    ];

    const resources = [
        { href: '/#announcements', label: 'Announcements' },
        { to: '/pricing#faq', label: 'FAQ' },
    ];

    const socials = [
        { href: 'https://facebook.com', icon: FaFacebook, label: 'Facebook' },
        { href: 'https://twitter.com', icon: FaTwitter, label: 'Twitter' },
        { href: 'https://github.com', icon: FaGithub, label: 'GitHub' },
        { href: 'https://linkedin.com', icon: FaLinkedin, label: 'LinkedIn' },
    ];

    return (
        <footer className="relative bg-[#0a0f1e] text-gray-400 overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Grid pattern */}
            <div className="absolute inset-0 grid-pattern opacity-20" />

            <div className="relative z-10">
                {/* Main Footer Content */}
                <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                        {/* Brand — takes more space */}
                        <div className="lg:col-span-5">
                            <Link to="/" className="flex items-center gap-3 mb-6 group">
                                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-secondary to-teal-400 p-0.5">
                                    <div className="w-full h-full rounded-full bg-[#0a0f1e] flex items-center justify-center">
                                        <span className="font-montserrat font-bold text-xl text-white">D</span>
                                    </div>
                                </div>
                                <span className="text-2xl font-montserrat font-bold text-white">
                                    DialogueDock
                                </span>
                            </Link>
                            <p className="text-gray-500 leading-relaxed text-sm max-w-sm mb-8">
                                A modern platform for meaningful conversations. Share ideas, discover perspectives, and connect with a community that values your voice.
                            </p>

                            {/* Social Icons */}
                            <div className="flex gap-3">
                                {socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-secondary/20 hover:border-secondary/30 transition-all duration-300"
                                    >
                                        <s.icon className="text-base" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="lg:col-span-3">
                            <h4 className="text-white font-bold text-sm uppercase tracking-[0.15em] mb-6 font-montserrat">Quick Links</h4>
                            <ul className="space-y-3">
                                {quickLinks.map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            className="group flex items-center gap-1 text-gray-500 hover:text-secondary text-sm transition-colors duration-200"
                                        >
                                            {link.label}
                                            <HiOutlineArrowUpRight className="text-[10px] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div className="lg:col-span-2">
                            <h4 className="text-white font-bold text-sm uppercase tracking-[0.15em] mb-6 font-montserrat">Resources</h4>
                            <ul className="space-y-3">
                                {resources.map((link, i) => (
                                    <li key={i}>
                                        {link.to ? (
                                            <Link to={link.to} className="group flex items-center gap-1 text-gray-500 hover:text-secondary text-sm transition-colors duration-200">
                                                {link.label}
                                                <HiOutlineArrowUpRight className="text-[10px] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                            </Link>
                                        ) : (
                                            <a href={link.href} className="group flex items-center gap-1 text-gray-500 hover:text-secondary text-sm transition-colors duration-200">
                                                {link.label}
                                                <HiOutlineArrowUpRight className="text-[10px] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter / CTA */}
                        <div className="lg:col-span-2">
                            <h4 className="text-white font-bold text-sm uppercase tracking-[0.15em] mb-6 font-montserrat">Join Us</h4>
                            <p className="text-gray-500 text-sm mb-4 leading-relaxed">Start sharing your ideas with the community today.</p>
                            <Link
                                to="/signup"
                                className="inline-flex items-center gap-2 bg-secondary/15 text-secondary border border-secondary/30 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary hover:text-white transition-all duration-300"
                            >
                                Get Started
                                <HiOutlineArrowUpRight className="text-sm" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <p className="text-gray-600 text-xs text-center sm:text-left">
                                &copy; {new Date().getFullYear()} DialogueDock. All rights reserved.
                            </p>
                            <span className="hidden sm:block w-px h-3 bg-white/10" />
                            <p className="text-gray-600 text-xs">
                                Developed by{" "}
                                <a
                                    href="https://my-portfolio-alpha-dun-71.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-secondary hover:text-teal-400 font-medium transition-colors duration-300"
                                >
                                    Anas Code Works .
                                </a>
                            </p>
                        </div>
                        <div className="flex gap-6 text-xs text-gray-600">
                            <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
