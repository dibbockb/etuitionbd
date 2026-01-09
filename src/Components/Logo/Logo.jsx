import React from 'react';
import { NavLink } from 'react-router';

const Logo = () => {
    return (
        <div>
            <NavLink to={"/"} className="btn btn-ghost normal-case text-xl flex items-center gap-2 h-12">
                <img className="w-10 h-10 theme-icon-white" src="/icon.svg" alt="eTuition Logo" />
                <span className="text-xl font-bold  text-base-content">eTuition</span>
            </NavLink>
        </div>
    );
};

export default Logo;