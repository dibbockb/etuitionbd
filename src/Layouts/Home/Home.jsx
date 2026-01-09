import React, { useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import { Link, useNavigate } from 'react-router';
import Navbar from '../../Components/Navbar/Navbar';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import { motion } from "framer-motion";

const Home = () => {

    const [latestTuitions, setLatestTuitions] = useState([]);
    const [latestTutors, setLatestTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLatestData = async () => {
            setLoading(true);
            try {
                const tuitionsResponse = await axiosSecure.get('/tuitions/limited');
                const tutorsResponse = await axiosSecure.get('/tutors/limited');

                setLatestTuitions(tuitionsResponse.data);
                setLatestTutors(tutorsResponse.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestData();
    }, [axiosSecure]);

    if (loading) {
        return <Loading />;
    }


    return (

        <div>
            <div className="relative w-full h-screen min-h-[600px] overflow-hidden bg-linear-to-br from-gray-900 via-teal-900 to-cyan-900">
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 sm:px-10 md:px-16 lg:px-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl"
                    >
                        Find Your Tutor From<br />
                        <span className="text-teal-400">Anywhere in the World</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl drop-shadow-lg font-medium"
                    >
                        1000+ verified tutors • 10+ countries • From ৳6,000/month
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-10 flex flex-col sm:flex-row gap-4"
                    >
                        <Link to={'/tutors'} className="px-10 py-4 bg-teal-500 hover:bg-teal-400 text-black font-black text-lg rounded-2xl shadow-2xl shadow-teal-500/20 transition-all hover:scale-105">
                            Find a Tutor Now
                        </Link>
                        <Link to={'/dashboard/new-tuition'} className="px-10 py-4 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white font-bold text-lg rounded-2xl transition-all hover:scale-105">
                            Post a Tuition
                        </Link>
                    </motion.div>
                </div>
            </div>


            <div className="py-20 md:py-32 transition-colors duration-500">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 md:mb-24"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold    mb-6">
                            Get Your Tutor in <span className="text-teal-500">3 Simple Steps</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Our streamlined process connects students with top-tier educators in record time.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-teal-500/20 -z-0"></div>

                        {[
                            { step: 1, title: "Tell Us Your Needs", desc: "Subject, class, budget, and preferred learning mode." },
                            { step: 2, title: "Get Best Matches", desc: "Review top-rated tutors hand-picked for your criteria." },
                            { step: 3, title: "Start Learning", desc: "Trial sessions and flexible scheduling to get you started." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2, type: "spring", stiffness: 100 }}
                                className="text-center group relative z-10"
                            >
                                <div className="relative inline-block mb-8">
                                    <div className="w-24 h-24 md:w-32 md:h-32 mx-auto  rounded-3xl rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-xl border border-teal-500/10 flex items-center justify-center">
                                        <div className="w-20 h-20 md:w-28 md:h-28 bg-teal-500 rounded-2xl -rotate-12 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center text-white text-4xl md:text-5xl font-black shadow-inner">
                                            {item.step}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-teal-500 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-20 md:py-32 bg-gray-900 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                                Latest <span className="text-teal-400">Tuitions</span>
                            </h2>
                        </div>
                        <Link
                            to="/tuitions"
                            className="group text-teal-400 hover:text-white transition-colors text-lg font-semibold flex items-center gap-2 bg-teal-400/10 px-6 py-2 rounded-full border border-teal-400/20 hover:bg-teal-400"
                        >
                            View All Tuitions
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestTuitions.map((tuition, index) => (
                            <motion.div
                                key={tuition._id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20,
                                    delay: index * 0.1
                                }}
                                whileHover={{ y: -12 }}
                                onClick={() => navigate(`/tuitions/${tuition._id}`)}
                                className="group relative bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden cursor-pointer flex flex-col h-full shadow-2xl transition-all duration-300 hover:border-teal-400/30 hover:shadow-teal-500/10"
                            >
                                <div className="h-52 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 via-transparent to-transparent z-10"></div>
                                    <img
                                        src={tuition.image}
                                        alt={tuition.subject}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className="bg-teal-500 text-black px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                            {tuition.mode}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex-1">
                                        <h3 className="text-white font-bold text-2xl mb-3 group-hover:text-teal-400 transition-colors">
                                            {tuition.subject}
                                        </h3>
                                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                                            <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            {tuition.location}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                                        <div className="flex flex-col">
                                            <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Salary/Month</span>
                                            <span className="text-teal-400 font-black text-2xl">৳{Number(tuition.fee).toLocaleString()}</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-black transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-20 md:py-32 bg-gray-800 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                                Top rated <span className="text-teal-400">Tutors</span>
                            </h2>
                        </div>
                        <Link
                            to="/tutors"
                            className="group text-teal-400 hover:text-white transition-colors text-lg font-semibold flex items-center gap-2 bg-teal-400/10 px-6 py-2 rounded-full border border-teal-400/20 hover:bg-teal-400"
                        >
                            Explore All Tutors
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestTutors.map((tutor, index) => (
                            <motion.div
                                key={tutor._id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20,
                                    delay: index * 0.1
                                }}
                                whileHover={{ y: -12 }}
                                onClick={() => navigate(`/tutors/${tutor._id}`)}
                                className="group relative bg-gray-900/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden cursor-pointer flex flex-col h-full shadow-2xl transition-all duration-300 hover:border-teal-400/30 hover:shadow-teal-500/10"
                            >
                                <div className="h-72 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/20 to-transparent z-10"></div>
                                    <img
                                        src={tutor.photoURL}
                                        alt={tutor.displayName}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-4 left-6 z-20">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-white font-black text-2xl drop-shadow-lg">
                                                {tutor.displayName}
                                            </h3>
                                            <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center text-[10px] text-black">
                                                ✓
                                            </div>
                                        </div>
                                        <p className="text-teal-400 font-bold text-sm tracking-wide">
                                            {tutor.subject} 
                                        </p>
                                    </div>
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-4 py-1.5 rounded-full text-xs font-semibold">
                                            {tutor.mode}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex flex-col">
                                            <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-1">Expected Salary</span>
                                            <span className="text-white font-black text-2xl">৳{Number(tutor.salary).toLocaleString()}<span className="text-sm font-normal text-gray-400 ml-1">/mo</span></span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-1">Experience</span>
                                            <span className="text-white font-bold opacity-80">{tutor.yearExperience || 0} Years</span>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>


            <div className="py-20 md:py-32 bg-white dark:bg-gray-900 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-teal-500 font-bold tracking-widest uppercase text-sm mb-4 block">The eTuition Advantage</span>
                            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                                Why Professional Tutors choose <span className="text-teal-500">eTuition</span>
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-xl">
                                We go beyond simple listings. Our platform uses advanced matching logic to ensure students find the perfect educator for their specific learning style and goals.
                            </p>
                            <Link to="/register" className="inline-block px-10 py-5 bg-teal-500 hover:bg-teal-400 text-black font-black rounded-2xl shadow-xl shadow-teal-500/20 transition-all hover:scale-105">
                                BECOME A MEMBER
                            </Link>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
                                    title: "100% Verified",
                                    desc: "NID + certificate checked tutors with background verification.",
                                    color: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
                                },
                                {
                                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
                                    title: "Fast Matching",
                                    desc: "98% of students get their first session within 24 hours.",
                                    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                                },
                                {
                                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />,
                                    title: "Price Match",
                                    desc: "Best price guarantee with transparent commission rates.",
                                    color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
                                },
                                {
                                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857" />,
                                    title: "Happy Users",
                                    desc: "Trusted by 1000+ students and parents globally.",
                                    color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                                }
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all"
                                >
                                    <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">{feature.icon}</svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>




        </div>
    );
};

export default Home;    