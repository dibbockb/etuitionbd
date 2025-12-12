import React from 'react';
import { NavLink } from 'react-router';

const Logo = () => {
    return (
        <div>
            <NavLink to={"/"} className="btn btn-ghost hover:bg-white/10 normal-case text-xl flex items-center gap-2  h-12">
                <img className="w-10 h-10" src="/icon.png" alt="" />
                <span className="text-xl">eTuition</span>
            </NavLink>
        </div>
    );
};

export default Logo;