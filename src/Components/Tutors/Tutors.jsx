import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loading from '../Loading/Loading';

const Tutors = () => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/tutors')
            .then(res => {
                setTutors(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [axiosSecure]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
            {tutors.map(tutor => (
                <div key={tutor._id} className="card bg-gray-800 shadow rounded-xl hover:scale-103 transition">
                    <div className="h-64 rounded-2xl">
                        <img src={tutor.photo} alt={tutor.tutorName} className="w-full h-full object-cover rounded-t-xl" />
                    </div>
                    <div className="card-body">
                        <div className="flex items-center gap-2 my-2">
                            <h2 className="text-2xl text-white">{tutor.tutorName}</h2>
                            <span className="text-yellow-500">★</span>
                            <span className="text-white ml-[-5px]">{tutor.rating}</span>
                        </div>
                        <p className="text-white font-medium">{tutor.subject}</p>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-xl font-bold">৳ {tutor.price.toLocaleString()}</span>
                            <span className="badge badge-accent">{tutor.mode}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Tutors;