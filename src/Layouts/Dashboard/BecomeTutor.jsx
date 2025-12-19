import React from 'react';
import Logo from '../../Components/Logo/Logo';
import Navbar from '../../Components/Navbar/Navbar';

const BecomeTutor = () => {
    return (


        <div>
            <Navbar></Navbar>

            <div className="flex flex-col justify-center items-center">


                <h5 className="text-5xl flex text-center my-2 text-white">Become a Tutor!</h5>
                <p>You are currently signed up as Student.</p>
                <p>Please head to Register Page or Contact Admin.</p>

            </div>
        </div>
    );
};

export default BecomeTutor;