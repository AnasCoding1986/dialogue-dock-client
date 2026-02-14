import { Link } from 'react-router-dom';
import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-primary via-primary to-secondary text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-secondary to-accent p-0.5">
                                <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                                    <span className="font-Discipline font-bold text-2xl text-white">D</span>
                                </div>
                            </div>
                            <span className="font-montserrat font-bold text-2xl">DialogueDock</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Where conversations come alive. Join our community of thinkers, creators, and innovators.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-accent">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-300 hover:text-secondary transition-colors">Home</Link></li>
                            <li><Link to="/about" className="text-gray-300 hover:text-secondary transition-colors">About Us</Link></li>
                            <li><Link to="/features" className="text-gray-300 hover:text-secondary transition-colors">Features</Link></li>
                            <li><Link to="/membership" className="text-gray-300 hover:text-secondary transition-colors">Membership</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-accent">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link to="/pricing" className="text-gray-300 hover:text-secondary transition-colors">Pricing</Link></li>
                            <li><Link to="/faq" className="text-gray-300 hover:text-secondary transition-colors">FAQ</Link></li>
                            <li><a href="#" className="text-gray-300 hover:text-secondary transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-secondary transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-accent">Stay Updated</h3>
                        <p className="text-gray-300 text-sm mb-4">
                            Get the latest updates and news.
                        </p>
                        <div className="flex gap-4 mb-4">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all">
                                <FaTwitter className="text-xl" />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all">
                                <FaGithub className="text-xl" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all">
                                <FaLinkedin className="text-xl" />
                            </a>
                            <a href="mailto:info@dialoguedock.com"
                                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all">
                                <FaEnvelope className="text-xl" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-300 text-sm">
                        © 2024 DialogueDock. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <a href="#" className="text-gray-300 hover:text-secondary transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-300 hover:text-secondary transition-colors">Terms of Service</a>
                        <a href="#" className="text-gray-300 hover:text-secondary transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
