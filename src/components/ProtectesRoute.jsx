import React, { Children } from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectesRoute({children}) {
    const token =localStorage.getItem("userToken");
    
    if (!token) {
        return <Navigate to="/auth/logins" />
    }
  return children;
}
