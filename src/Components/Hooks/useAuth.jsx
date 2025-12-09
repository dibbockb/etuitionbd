import React, { use } from 'react';
import { AuthContext } from '../AuthLayout/AuthContext';

const useAuth = () => {

    const authInfo = use(AuthContext);
    return authInfo;

};


export default useAuth;