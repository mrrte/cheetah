import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import React from 'react';

const PublicRoute = ({ children }) => {
    const location = useLocation();
    const { isSuccess, userInfo } = useSelector((state) => state.user);

    let toPath = (userInfo && userInfo.userType === "user") ? `/${location.search}` : `/`;
    
    return (!isSuccess && !userInfo?.id) ? children : <Navigate to={toPath} state={{ from: window.location }} />
};

export default PublicRoute;
