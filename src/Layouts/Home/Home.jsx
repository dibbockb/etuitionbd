import React from 'react';
import Loading from '../../Components/Loading/Loading';
import { Link } from 'react-router';
import Navbar from '../../Components/Navbar/Navbar';

const Home = () => {

    return (

        <div>
<div className="fixed top-0 left-0 right-0 z-50 bg-base-100 shadow-sm">
         <Navbar /> 
      </div>
            {/* hero section */}
            <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
                {/* <img
                    src="/globe.jpg"
                    alt="Global tutors at eTuition"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                /> */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 sm:px-10 md:px-16 lg:px-24">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                        Find Your Tutor From<br />
                        <span className="text-teal-400">Anywhere in the World</span>
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl drop-shadow-lg">
                        1000+ verified tutors • 10+ countries • From ৳6,000/month
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <Link to={'/tutors'} className=" h-15 px-10 py-4 bg-teal-500 hover:bg-teal-400 text-black font-bold text-lg rounded-2xl shadow-xl transition transform hover:scale-105">
                            Find a Tutor Now
                        </Link>
                        <Link to={'/dashboard/newtuition'} className=" h-15 px-10 py-4 bg-white bg-opacity-20 backdrop-blur-md hover:bg-opacity-30 text-black font-semibold text-lg rounded-2xl border border-white border-opacity-40 transition hover:scale-105">
                            Add a Tuition
                        </Link>
                    </div>
                </div>
            </section>


            {/* steps section */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-center text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        Get Your Tutor in <span className="text-teal-500">3 Simple Steps</span>
                    </h2>
                    <p className="text-center text-xl text-black mb-12 md:mb-16">
                        From search to booking a teacher, under 5 minutes!!!
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                        <div className="text-center group">
                            <div className="relative inline-block mb-6">
                                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-teal-500 rounded-full flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-xl  transition">
                                    1
                                </div>

                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                                What Do You Need?
                            </h3>
                            <p className="text-xl text-black leading-relaxed">
                                Subject, class, budget, online or home?
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="relative inline-block mb-6">
                                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-teal-500 rounded-full flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-xl transition">
                                    2
                                </div>

                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                                Get Matched
                            </h3>
                            <p className="text-xl text-black leading-relaxed">
                                We show you the top candidates based on your criteria
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="relative inline-block mb-6">
                                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-teal-500 rounded-full flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-xl transition">
                                    3
                                </div>

                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                                Start Classes!
                            </h3>
                            <p className="text-xl text-black leading-relaxed">
                                As fast as possible!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3rd section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        Why choose <span className="text-teal-500">eTuition?</span>
                    </h2>
                    <p className="text-xl text-black  mb-12 md:mb-16 max-w-2xl mx-auto">
                        We don’t find tutors — we find the match
                    </p>

                    <div className="grid md:grid-cols-3 gap-10 lg:gap-16">

                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-black mb-3">100% Verified Tutors</h3>
                            <p className="text-black text-xl">NID + certificate checked • Background verified • Real reviews only</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-black mb-3">Start in 24 Hours</h3>
                            <p className="text-black text-xl">98% of students get their first class within one day</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-12 h-12 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-black mb-3">Best Price Guarantee</h3>
                            <p className="text-black text-xl">Found cheaper? We’ll match it + give ৳1000 off</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-black mb-3">7-Day Free Trial</h3>
                            <p className="text-black text-xl">Not happy? Full refund, no questions asked</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 01-6 0zm-6 0a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-black mb-3">1000+ Happy Students</h3>
                            <p className="text-black text-xl">From Dhaka to Dubai — trusted by parents worldwide</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-black mb-3">24/7 Support</h3>
                            <p className="text-black text-xl">Live chat, WhatsApp, phone — we’re always here</p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;    