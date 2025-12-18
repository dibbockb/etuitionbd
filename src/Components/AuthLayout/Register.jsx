import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import SocialLogin from './SocialLogin';
import Swal from 'sweetalert2';
import { Fade } from "react-awesome-reveal";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [isClicked, setIsClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);



    const handleRegistration = async (data) => {
        setIsClicked(true);

        try {
            const profileImg = data.photo?.[0];
            const userPhone = data.userPhone || null;
            const userRole = data.userRole;

            await registerUser(data.email, data.password);

            let photoURL = '';
            if (profileImg) {
                const formData = new FormData();
                formData.append('image', profileImg);
                const image_API_URL = `https://api.imgbb.com/1/upload?expiration=2592000&key=${import.meta.env.VITE_image_host_key}`;
                const uploadRes = await axios.post(image_API_URL, formData);
                photoURL = uploadRes?.data?.data?.url || '';
            }

            if (data.userRole === "tutor") {
                const tutorProfile = {
                    userId: data.insertedId,
                    email: data.email,
                    displayName: data.name || data.email,
                    photoURL: `https://dummyimage.com/600x800/1a1a2e/ffffff.png&text=${data.name}`,
                    userPhone: userPhone,
                    salary: 5000,
                    subject: data.subject || "",
                    mode: "online",
                    userRole: "tutor",
                    isAdmin: false,
                    createdAt: new Date(),
                };

                try {
                    await axiosSecure.post("/tutors", tutorProfile);
                } catch (err) {
                    console.error("Failed", err);
                }
            }

            // >>> databsae
            const userInfo = {
                email: data.email,
                displayName: data.name,
                photoURL,
                userPhone,
                userRole
            };
            await axiosSecure.post('/users', userInfo);

            const userProfile = { displayName: data.name };
            if (photoURL) userProfile.photoURL = photoURL;
            await updateUserProfile(userProfile);

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Registration Successful!",
                showConfirmButton: false,
                timer: 1000
            });
            navigate("/dashboard");

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: error.response?.data?.error?.message || error.message || 'Please try again'
            });
            setIsClicked(true);
        } finally {
            setIsClicked(false);
        }
    }

    return (
        <Fade className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center">Welcome to eTuition!</h3>
            <p className='text-center'>Please Register</p>
            <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">

                    {/* name field */}
                    <label className="label">Name</label>
                    <input type="text"
                        {...register('name', { rekquired: true })}
                        className="input w-full pr-8  border-gray-600 focus:border-teal-500"
                        placeholder="Your Name" />
                    {errors.name?.type === 'required' && <p className='text-red-500'>Name is required.</p>}

                    <label className="label">Phone Number</label>
                    <input type="text"
                        {...register('userPhone', { required: false })}
                        className="input w-full pr-8  border-gray-600 focus:border-teal-500"
                        placeholder="Your Number" />

                    <div className="flex mt-2">
                        <label className="label mr-4">
                            <input type="radio" {...register('userRole')} value="student" className="radio" defaultChecked />
                            Student
                        </label>
                        <label className="label">
                            <input type="radio" {...register('userRole')} value="tutor" className="radio" />
                            Tutor
                        </label>
                    </div>

                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input w-full pr-8  border-gray-600 focus:border-teal-500" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-500'>Email is required.</p>}

                    <label className="label">Password</label>
                    <div className="relative w-full">
                        <input
                            type={isVisible ? "text" : "password"}
                            {...register('password', { required: true, minLength: 6 })}
                            className="input w-full pr-8  border-gray-600 focus:border-teal-500"
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            onClick={() => setIsVisible(!isVisible)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-teal-500 transition-colors"
                        >
                            {isVisible ? <FaRegEyeSlash className="w-4 h-4" /> : <FaRegEye className="w-4 h-4" />}
                        </button>
                    </div>
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have at least one uppercase, at least one lowercase, at least one number, and at least one special characters</p>
                    }

                    <label className="label">Photo</label>
                    <input type="file" {...register('photo', { required: false })} className="file-input w-full pr-8  border-gray-600 focus:border-teal-500" placeholder="Your Photo" />

                    <div><a className="link link-hover flex justify-center mt-2">Forgot password?</a></div>
                    <button
                        className="btn btn-neutral mt-4 rounded-2xl bg-teal-500 text-black hover:bg-teal-300/50"
                        disabled={isClicked}
                    >
                        {isClicked ? (
                            <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                            'Register'
                        )}
                    </button>
                    {/* <button className="btn btn-neutral mt-4 rounded-2xl bg-teal-500 text-black hover:bg-teal-300/50">Register</button> */}
                </fieldset>

                <p className="flex justify-center gap-2">Already have an account? <Link
                    state={location.state}
                    className='text-blue-400 link link-hover'
                    to="/login">Login</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </Fade>
    );
};

export default Register;