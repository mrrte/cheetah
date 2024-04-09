import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import React from 'react';


const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { userId, userToken } = useSelector((state) => state.user);

    const { pathname, search } = window.location;
     // If studyPlanFormData doesn't exist and the route is /proficiency-setup, redirect to '/'
     if (location.pathname === '/proficiency-setup') {
         const studyPlanFormData  = sessionStorage.getItem("studyPlanFormData")
         if(!studyPlanFormData){
             return <Navigate to="/" />;
         }
     }

     if(location.pathname === '/reschedule'){
        const proeficiencyFormData = sessionStorage.getItem("proeficiencyFormData")
        const studyPlanFormData  = sessionStorage.getItem("studyPlanFormData")
        if(!proeficiencyFormData || !studyPlanFormData){
           return <Navigate to="/" />; 
        }
     }

     

    let toPath = `/${location.search}`;
    return (userToken && userId) ? children : <Navigate to={toPath} state={{ from: { pathname, search } }} />
};

export default PrivateRoute;

