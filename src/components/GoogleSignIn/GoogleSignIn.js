import React, { useCallback, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { useGoogleLogin } from '@react-oauth/google';
import * as AuthApi from "../../apis/authentication.api"
import { toast } from "react-toastify";
import { setCookie } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../store/user/userSlice";
import RegistrationForm from "../RegistrationFrom/RegistrationForm";

const GoogleSignIn = ({setSignInModal,component,setGoToDashboardPage,formData}) => {

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const [showRegistrationForm,setShowRegistrationFrom] = useState(false)

    const loginWithGoogle = useCallback(
        useGoogleLogin({
          onSuccess: async (response) => {
            await retrieveOrCreateUser(response)
          },
          onError: (error) => console.log("errorResponse",error),
        }),
        []
      );

    const login=()=>{
      setShowRegistrationFrom(true)
    }

    const retrieveOrCreateUser=async(response)=>{
        try {
            const authRes = await AuthApi.googleLogIn({accessToken: response?.access_token,userType : "user"});
            if(authRes.status){
              // showToastMsg(authRes)
              setImportantDetails(authRes)
              dispatch(updateUserDetails(authRes));
              if(authRes?.haveSchedule){
              console.log("authResauthResauthResauthRes",authRes)
              if(component == "Navbar"){
                setSignInModal(false)
                navigate('/dashboard')
              }else{
                setGoToDashboardPage(true)
                
              }
            }else{
              if(formData){
                navigate('/proficiency-setup',{ state: formData })
              }else{
                navigate('/proficiency-setup')
              }
            }
          }
        } catch (error) {
            console.log("error while retrieving or creating a user",{error:error, response:response});
            toast.error("Something went wrong !!")
            setSignInModal(false)

        }
    }

    const setImportantDetails=(response)=>{
        const userId = response?.user?.userId
        const accessToken  = response?.token
        if(userId){
            setCookie("userId",userId)
            window.localStorage.setItem("userId",userId)
        }
        if(accessToken){
           window.localStorage.setItem("accessToken",accessToken)
        }
    }

    const showToastMsg=(response)=>{
        if(response?.newUser == false){
            toast.success("User loggedIn successfully !!")
        }
        if(response.newUser){
            toast.success("User successfully created")
        }
    }
  return (
    <>
    <RegistrationForm  showRegistrationForm={showRegistrationForm}  setShowRegistrationFrom={setShowRegistrationFrom} />
      <button type="button" className="btn btn-warning homepage-btn-style" 
       onClick={() => loginWithGoogle()}>
         Continue with Google
      </button>
    </>
  );
};

export default GoogleSignIn;
