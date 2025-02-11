import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectesRoute({children}) {
    const userToken =localStorage.getItem("userToken");
    
    if (userToken ) {
        return <Navigate to="/" />
    }
  return children;
}
