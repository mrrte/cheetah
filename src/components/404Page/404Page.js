import React from "react";
import { useNavigate } from "react-router-dom";

const My404Component=()=>{
    const navigate = useNavigate()
    
    return(
     <div class="d-flex align-items-center justify-content-center vh-100" >
            <div class="text-center">
                <h1 class="display-1 fw-bold">404</h1>
                <p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
                <p class="lead">
                    The page you’re looking for doesn’t exist.
                  </p>

               <button onClick={() => navigate('/')} type="button" class="btn btn-primary generate-study-btn" style={{backgroundColor :"#7587F8", color:"white", border:"none"}}>Go back to Homepage</button>
            </div>
        </div>
    )
}

export default My404Component;
