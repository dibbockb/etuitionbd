import React from 'react';
import Logo from '../Logo/Logo';

const Error = () => {
    return (

        <div className="flex flex-col justify-center items-center">
            <br />
            <br />
            <br />
            <Logo></Logo>
           <img className="rounded-full mt-20" src="/error.jpg" alt="err-img" />
        </div>
    );
};

export default Error;