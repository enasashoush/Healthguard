import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

export function ProtectedRoute({Children}) {
    const{token} = useContext(AuthContext);
    if (token === null) {
        return <Navigate to='/login'/>        
    }
    return <>
        {Children}
        </>
}




