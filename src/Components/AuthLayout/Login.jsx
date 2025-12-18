import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import Swal from 'sweetalert2';
import { Fade } from "react-awesome-reveal";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleLogin = (data) => {
        setIsClicked(true);
        signInUser(data.email, data.password)
            .then(result => {
                navigate('/dashboard')
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Logged In!",
                    showConfirmButton: false,
                    timer: 1000
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: error.response?.data?.error?.message || error.message || 'Please try again'
                });
                setIsClicked(false);
            })
    }

    return (<Fade className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
        <div className="">
            <h3 className="text-3xl text-center">Welcome back!</h3>
            <p className='text-center'>Please Login</p>
            <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input w-full pr-8  border-gray-600 focus:border-teal-500" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                    }

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
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters  or longer </p>
                    }



                    <a className="link link-hover flex justify-center mt-2">Forgot password?</a>

                    <button
                        className="btn btn-neutral mt-4 rounded-2xl bg-teal-500 text-black hover:bg-teal-300/50"
                        disabled={isClicked}
                    >
                        {isClicked ? (
                            <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                            'Login'
                        )}
                    </button>


                </fieldset>
                <p className="flex justify-center gap-1.5">New here? <Link
                    state={location.state}
                    className='text-blue-400 link link-hover'
                    to="/register">Register</Link></p>
            </form>

            <SocialLogin></SocialLogin>
        </div></Fade>

    );
};

export default Login;