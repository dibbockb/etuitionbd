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
            <footer className="footer-container bg-black pt-10 pb-3 flex flex-col w-full text-center rounded-[3.125rem] rounded-b-none">
                <div className="flex justify-evenly items-center text-center">
                    <div className="footer-left flex flex-col justify-center items-center text-center gap-2">
                        <img className="w-20" src="/icon.png" alt="" />
                        <h4 className="font-bold text-3xl text-white">eTuition</h4>
                        <p className="w-37.5 font-light text-gray-300">Find a Teacher! Without any headache!</p>
                    </div>


                    <div className="footer-middle flex flex-col justify-center items-center text-center gap-2">
                        <h4 className="font-medium text-2xl text-gray-300">Quick Links</h4>
                        <a className="w-9.375rem font-light text-gray-300">Dashboard</a>
                        <a className="w-9.375rem font-light text-gray-300">Services</a>
                        <a className="w-9.375rem font-light text-gray-300">Carrers</a>
                        <div className="flex flex-col">
                            <p className="font-light text-gray-300 flex items-center gap-2"> <IoMail /> Email : eTuition@web.com</p>
                            <p className="font-light text-gray-300 flex items-center gap-2"><PiPhoneFill /> Phone No: 01xxx xxx xxx</p>
                        </div>
                    </div>

                    <div className="footer-right flex flex-col justify-center items-center text-center gap-2">
                        <h4 className="font-medium text-2xl text-gray-300">Resources</h4>
                        <a className="w-9.375rem font-light text-gray-300">Video Tutorials</a>
                        <a className="w-9.375rem font-light text-gray-300">Refund Policy</a>
                        <a className="w-9.375rem font-light text-gray-300">Terms of Service</a>

                        <div className="flex gap-2">
                            <FaFacebook />
                            <BsInstagram />
                            <FaYoutube />
                            <IoLogoPinterest />
                            <FaXTwitter />
                        </div>
                    </div>
                </div>

                <div className="footer-info font-light text-white pt-10">Copyright 2025 - Dibbo Chakraborty</div>
            </footer>
        </>
    );
};

export default Footer;
