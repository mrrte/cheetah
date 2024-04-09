import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
//import Navbar from "../components/Navbar";
import StudyPlanForm from "../components/TopicsSetup/StudyPlanForm";
import "../styles/index.css";

const SetupTopics = () => {
  const [loader, setLoader] = React.useState(false)
  return (<>
        <Loader show={loader} />
      <StudyPlanForm setLoader={setLoader} />
  </>
  );
};

export default SetupTopics;