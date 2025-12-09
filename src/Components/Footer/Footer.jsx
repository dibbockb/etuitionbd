import React from "react";

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
                        <a className="w-9.375rem font-light text-gray-300">Find a tutor</a>
                        <a className="w-9.375rem font-light text-gray-300">Find a student</a>
                        <a className="w-9.375rem font-light text-gray-300">Services</a>
                        <a className="w-9.375rem font-light text-gray-300">Carrers</a>
                    </div>

                    <div className="footer-right flex flex-col justify-center items-center text-center gap-2">
                        <h4 className="font-medium text-2xl text-gray-300">Resources</h4>
                        <a className="w-9.375rem font-light text-gray-300">Support</a>
                        <a className="w-9.375rem font-light text-gray-300">Documentation</a>
                        <a className="w-9.375rem font-light text-gray-300">Video Tutorials</a>
                        <a className="w-9.375rem font-light text-gray-300">Refund Policy</a>
                        <a className="w-9.375rem font-light text-gray-300">Terms of Service</a>
                    </div>
                </div>

                <div className="footer-info font-light text-white pt-10">Copyright 2025 - Dibbo Chakraborty</div>
            </footer>
        </>
    );
};

export default Footer;
