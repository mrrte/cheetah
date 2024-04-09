import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Routers from "./routes";
import { getCurrentUser } from "./store/user/userAction";
const App = () => {
  const { userToken, userId } = useSelector(state => state.user);
  const dispatch = useDispatch()
  useEffect(()=>{
     if(userId && userToken){
      dispatch(getCurrentUser({userId}))
     }
  },[])
  return (
    <div>
    <ToastContainer />
      <Routers/>
    </div>
  );
};

export default App;