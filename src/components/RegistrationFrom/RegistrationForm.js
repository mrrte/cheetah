import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";
import * as UserApi from "../../apis/user.api"
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../../store/user/userSlice";
import { useNavigate } from "react-router-dom";
import { CRYPTO_SECRET_KEY } from "../../constants/envConstants";
import { setCookie } from "../../utils";
const CryptoJS = require("crypto-js");
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const RegistrationForm = ({
  setOpenSignUpModal,
  openSignUpModal,
  setgoToDashboard,
  component,
  formData
}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userToken, userId } = useSelector(state => state.user);
    //  console.log("scheduleDetailsscheduleDetails",component)
    const [showSignUpModal, setShowSignUpModal] = React.useState((userToken && userId) ? true: false);
      


    const handleSubmit =async(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const encryptedPassword = CryptoJS.AES.encrypt((data.get('password').trim()),CRYPTO_SECRET_KEY).toString();
        const userDetails ={
            firstName : data.get('firstName').trim(),
            lastName : data.get('lastName').trim(),
            email: data.get('email').trim(),
            password: encryptedPassword,
            userType: "user",
            provider: "email"
          }
        //   console.log("userDetailsuserDetailsuserDetails", userDetails)
        const userRes = await UserApi.createUser(userDetails);
        if(userRes?.status && userRes?.user?.userId){
                toast.success(userRes.msg)
                localStorage.setItem("accessToken", userRes?.token)
                localStorage.setItem("userId",userRes?.user?.userId)
                setCookie("userId",userRes?.user?.userId)
                dispatch(updateUserDetails(userRes));
                if(userRes?.haveSchedule && component == "scheduleDetails"){
                    setgoToDashboard(true)
                    setOpenSignUpModal(false)
                }
                if(userRes?.haveSchedule){
                    navigate('/dashboard')
                }
                if(formData){
                    navigate("/proficiency-setup", { state: formData })
                }
                
                setOpenSignUpModal(false)

        }else{
            console.log("userRes.msguserRes.msg",userRes.msg)
            toast.error(userRes.msg)
        }
        console.log("userDetails",userDetails);
    }

    const singInUser=async(event)=>{
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const encryptedPassword = CryptoJS.AES.encrypt((data.get('password').trim()),CRYPTO_SECRET_KEY).toString();
            const userDetails ={
                email: data.get('email').trim(),
                password: encryptedPassword,
              }

            const userRes = await UserApi.logInUser(userDetails);
            if(userRes?.status && userRes?.user?.userId){
                toast.success(userRes.msg)
                localStorage.setItem("accessToken", userRes?.token)
                localStorage.setItem("userId",userRes?.user?.userId)
                setCookie("userId",userRes?.user?.userId)
                dispatch(updateUserDetails(userRes));

                if(userRes?.haveSchedule && component == "scheduleDetails"){
                    setgoToDashboard(true)
                    setOpenSignUpModal(false)
                    
                    return;
                }
                if(userRes?.haveSchedule){
                    navigate('/dashboard')
                }
                if(formData){
                    navigate("/proficiency-setup", { state: formData })
                }
                setOpenSignUpModal(false)

            }else{
                console.log("userRes.msguserRes.msg",userRes.msg)
                toast.error(userRes.msg)
            }

        } catch (error) {
            
        }
    }


  return (
    <Modal
      open={openSignUpModal}
      onClose={() => setOpenSignUpModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
           {showSignUpModal ?
           <>
             <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={singInUser}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end" onClick={() => setShowSignUpModal(!showSignUpModal)} >
                <Grid item>
                  <Link href="#" variant="body2">
                    {showSignUpModal ? "Don't have an account? Sign up" :"Already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
              <hr />
              <Grid container justifyContent="flex-end">
                 {/* <GoogleSignIn setSignInModal={false} component={"navbar"} setGoToDashboardPage={false} formData={false} /> */}
              </Grid>
            </Box>
          </Box>
           </> : <>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end" onClick={() => setShowSignUpModal(true)} >
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <hr />
              <Grid container justifyContent="flex-end">
                 {/* <GoogleSignIn setSignInModal={false} component={"navbar"} setGoToDashboardPage={false} formData={false} /> */}
              </Grid>
            </Box>
          </Box>
           </> }
        </Box>
    </Modal>
  );
};

export default RegistrationForm;
