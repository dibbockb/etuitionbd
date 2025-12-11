import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate, useNavigation } from 'react-router';
import useAuth from '../../Components/Hooks/useAuth';

const PostTuition = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {user} = useAuth();

    const handleNewTuition = async (data) => {
        console.log(data);
        const newTuition = {
            creatorEmail: user.email,
            subject: data.subject,
            location: data.location,
            mode: data.mode,
            fee: Number(data.fee),
        }

        await axiosSecure.post(`/newtuition`, newTuition)
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Tuition has been submitted!",
            showConfirmButton: true,
            timer: 50000
        });
        navigate("/tuitions");
    }

    return (



        <div>
            <h3 className="text-4xl text-gray-400 text-center pt-5 pb-8">Add a New Tuition</h3>

            <div>
                <form onSubmit={handleSubmit(handleNewTuition)}>
                        <input {...register('user')} type="text" className="input cursor-not-allowed" placeholder={user.email} required readOnly />
                    <fieldset className="fieldset">

                        <legend className="fieldset-legend">Subject</legend>
                        <input {...register('subject')} type="text" className="input" placeholder="What do you want to learn?" required />

                        <div className="flex mt-2">
                            <label className="label mr-4">
                                <input type="radio" {...register('mode')} value="offline" className="radio" defaultChecked />
                                Offline
                            </label>
                            <label className="label">
                                <input type="radio" {...register('mode')} value="online" className="radio" />
                                Online
                            </label>
                        </div>

                        <legend className="fieldset-legend">Location</legend>
                        <input {...register('location')} type="text" className="input" placeholder="Enter your location" />

                        <legend className="fieldset-legend">Budget</legend>
                        <input {...register('fee')} type="text" className="input" placeholder="How much do you want to pay?" required />

                        <button type="submit" className="btn btn-ghost text-xl h-15 mt-5 bg-gray-700 hover:bg-gray-900">Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default PostTuition;