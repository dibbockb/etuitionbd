import React from "react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoPinterest } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { PiPhoneFill } from "react-icons/pi";

const Footer = () => {
    return (
        <>
            <footer className="footer-container bg-base-100 text-base-content pt-16 pb-6 px-4 md:px-8 lg:px-20 flex flex-col w-full text-center border-t border-base-300">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-center md:text-left gap-10 md:gap-0">
                    <div className="footer-left flex flex-col justify-center items-center md:items-start text-center md:text-left gap-2 w-full md:w-auto">
                        <img className="w-20 theme-icon-white" src="/icon.svg" alt="eTuition Logo" />
                        <h4 className="font-bold text-3xl tracking-tight">eTuition</h4>
                        <p className="max-w-xs font-light opacity-70">Find a Teacher! Without any headache! Connecting students with the best tutors globally.</p>
                    </div>

                    <div className="footer-middle flex flex-col justify-center items-center md:items-start text-center md:text-left gap-3 w-full md:w-auto">
                        <h4 className="font-semibold text-xl mb-2">Quick Links</h4>
                        <a href="/dashboard" className="font-light opacity-70 hover:opacity-100 hover:text-primary transition-all">Dashboard</a>
                        <a href="#" className="font-light opacity-70 hover:opacity-100 hover:text-primary transition-all">Services</a>
                        <a href="#" className="font-light opacity-70 hover:opacity-100 hover:text-primary transition-all">Careers</a>
                        <div className="flex flex-col items-center md:items-start mt-2 space-y-2">
                            <p className="font-light opacity-70 flex items-center gap-2"> <IoMail /> divyajitchakraborty@gmail.com</p>
                            <p className="font-light opacity-70 flex items-center gap-2"><PiPhoneFill /> +01 234 567 890</p>
                        </div>
                    </div>

                    <div className="footer-right flex flex-col justify-center items-center md:items-start text-center md:text-left gap-3 w-full md:w-auto">
                        <h4 className="font-semibold text-xl mb-2">Resources</h4>
                        <a href="#" className="font-light opacity-70 hover:opacity-100 hover:text-primary transition-all">Video Tutorials</a>
                        <a href="#" className="font-light opacity-70 hover:opacity-100 hover:text-primary transition-all">Refund Policy</a>
                        <a href="#" className="font-light opacity-70 hover:opacity-100 hover:text-primary transition-all">Terms of Service</a>

                        <div className="flex gap-4 mt-4 text-2xl opacity-70">
                            <FaFacebook className="hover:text-blue-600 cursor-pointer transition-colors" />
                            <BsInstagram className="hover:text-pink-500 cursor-pointer transition-colors" />
                            <FaYoutube className="hover:text-red-600 cursor-pointer transition-colors" />
                            <IoLogoPinterest className="hover:text-red-500 cursor-pointer transition-colors" />
                            <FaXTwitter className="hover:text-base-content cursor-pointer transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="footer-info font-light opacity-50 text-sm pt-12 border-t border-base-300 mt-10">
                    &copy; 2026 - eTuition platform. Created by <a href="https://dibbockb.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline decoration-dotted">DivyaJit Chakraborty</a>
                </div>
            </footer>
        </>
    );
};

export default Footer;
