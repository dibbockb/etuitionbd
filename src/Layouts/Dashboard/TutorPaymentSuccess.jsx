import React, { useEffect } from 'react';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import { Link, useSearchParams } from 'react-router';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

const TutorPaymentSuccess = () => {
    const axiosSecure = useAxiosSecure()
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
      if (sessionId) {
        axiosSecure.post(`/tutor-payment-success`, {session_id: sessionId})
      }
    
    }, [sessionId, axiosSecure])
    
    

    return (
        <div className="mx-auto text-center">
            <p className="text-green-500 text-2xl">Payment Successfull!</p>

            <Link
            to="/dashboard/my-tuitions"
            className="btn btn-ghost btn-lg text-lg flex-1 justify-center">
             My Tuitions <MdOutlineArrowForwardIos />
           </Link>
        </div>
    );
};

export default TutorPaymentSuccess;