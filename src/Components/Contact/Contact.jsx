import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { IoMail } from 'react-icons/io5';
import { PiPhoneFill } from 'react-icons/pi';
import { FaLocationDot } from 'react-icons/fa6';

const Contact = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleContact = (data) => {
        setIsSubmitting(true);

        // Simulate sending message
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Message Sent!',
                text: '',
                showConfirmButton: false,
                timer: 2000
            });
            reset();
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-900/30 py-16">
            <div className="w-100 mx-auto">
                <h1 className="text-5xl font-bold text-white text-center mb-4">
                    Get in <span className="text-teal-400">Touch</span>
                </h1>
                <p className="text-xl text-gray-400 text-center mb-16">
                    Have questions? Lets talk!
                </p>

                <div className="">
                    <div className="space-y-8">
                        <div className="bg-gray-800/80 p-8 rounded-2xl">
                            <h2 className="text-3xl font-bold text-white mb-8">
                                Contact Information
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center shrink-0">
                                        <IoMail className="text-black text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Email</p>
                                        <p className="text-white text-lg">divyajitchakraborty@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center shrink-0">
                                        <PiPhoneFill className="text-black text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Phone</p>
                                        <p className="text-white text-lg">+1 xxx xxx xxx</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center shrink-0">
                                        <FaLocationDot className="text-black text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Location</p>
                                        <p className="text-white text-lg">Earth, Milkyway</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;