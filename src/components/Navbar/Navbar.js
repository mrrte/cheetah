import React, { useEffect, useState } from "react";
import { Outlet, useLocation} from "react-router-dom";
import Logo from "../../assets/images/cheetah.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";
import { userIsLoggedIn } from "../../utils";
import LogoutModal from "../LogoutModal/LogoutModal";
import { useSelector } from "react-redux";
import RegistrationForm from "../RegistrationFrom/RegistrationForm";

const Navbar = () => {
  const [openSignInModal,setSignInModal] = useState(false)
  const[logoutModalOpen, setLogoutModalOpen] = useState(false)
  const [refreshNavBar, setRefreshNavBar] = useState("randomStr")
  
  const { userId, userToken } = useSelector((state) => state.user);
  const [openSignUpModal,setOpenSignUpModal] = useState(false)

  console.log("{ userId, userToken }",{ userId, userToken })
 
  const signUp=()=>{
    setOpenSignUpModal(true)
  }

  return (
    <>
    < RegistrationForm  openSignUpModal={openSignUpModal}  setOpenSignUpModal={setOpenSignUpModal}  />
      {logoutModalOpen && (
        <LogoutModal
          logoutModalOpen={logoutModalOpen}
          setLogoutModalOpen={setLogoutModalOpen}
        />
      )}
      {userToken && userId ? (
        <nav className="navbar navbar-light pl-4 justify-content-between">
          <img src={Logo} alt="cheetah logo" className="img-fluid logo-style" />
          <div className="px-4">
            <AccountCircleIcon
              onClick={() => setLogoutModalOpen(!logoutModalOpen)}
              sx={{ fontSize: "500%" }}
            ></AccountCircleIcon>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-light pl-4 justify-content-between">
          <img src={Logo} alt="cheetah logo" className="img-fluid logo-style" />
          <div className="px-4">
            <button
              type="button"
              className="btn btn-warning homepage-btn-style"
              onClick={() => signUp()}
            >
             Sign Up / SignIn 
            </button>
            {/* <GoogleSignIn setSignInModal={setSignInModal} component={"Navbar"} /> */}
            {/* <MyTooltip>
            <button
              type="button"
              className="btn btn-warning homepage-btn-style"
            >
              Login
            </button>
          </MyTooltip> */}
          </div>
        </nav>
      )}
      <Outlet />
    </>
  );
};

export default Navbar;
