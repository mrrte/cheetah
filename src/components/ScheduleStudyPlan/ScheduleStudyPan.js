import React, { useEffect } from "react";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate, useLocation } from "react-router-dom";
import ScheduleStudyPlanImg from "../../assets/images/ScheduleStudyPlan.png";
import { GENERATE_STYDY_PLAN_TITLE } from "../../constants";
import AdvertisementSection from "../Advertisement/AdvertisementSection";
import Alert from "@mui/material/Alert";
import { Tooltip } from "@mui/material";
import {
  handleDateChangeUtils,
  openNotificationWithIcon,
} from "../../utils/validate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { getCookie } from "../../utils";
import GoogleSignInModal from "../GoogleSignIn/GoogleSignInModal";
import { useSelector } from "react-redux";
import NavigateToDashboard from "./NavigateToDashboard";
import RegistrationForm from "../RegistrationFrom/RegistrationForm";

const ScheduleStudyPlan = () => {
  return (
    <div className="row">
      <div className="col-md-10 container mt-4">
        <div
          className="card schedule-plan-card-style"
          style={{ backgroundImage: `url(${ScheduleStudyPlanImg})` }}
        >
          <div className="card-body d-flex flex-column align-self-center ">
            <p className="card-title schedule-study-title-style">
              {GENERATE_STYDY_PLAN_TITLE}
            </p>
            <GenerateStudyPlan />
          </div>
        </div>
      </div>
      <AdvertisementSection />
    </div>
  );
};

const GenerateStudyPlan = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isValidDate, setIsValidInput] = useState({
    date: true,
    duration: true,
    studyHours: true,
  });
  const initialState = {
    examDuration: "",
    examDate: "",
    studyHours: "",
  };
  const [handleAlert, setHandleAlert] = useState();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState(() => {
    const savedData = sessionStorage.getItem("studyPlanFormData");
    return savedData ? JSON.parse(savedData) : initialState;
  });
  const { scheduleExisted } = useSelector(state => state.user);
  const [goToDashboard, setgoToDashboard] = useState(false)
  const [openSignUpModal,setOpenSignUpModal] = useState(false)

  const generateStudyPlan = (e) => {
    e.preventDefault();
    const data = e.target;
    if (!isValidDate.date) {
      setHandleAlert(true);
      return;
    }
    sessionStorage.setItem("studyPlanFormData", JSON.stringify(formData));
    const userId = localStorage.getItem("userId")
    console.log("userId",{userId,scheduleExisted})
    if(userId && !scheduleExisted){
      navigate("/proficiency-setup", { state: formData });
    }else if(scheduleExisted){
      setgoToDashboard(true)
    }
    else{
      setOpenSignUpModal(true)
    }
  };

  // This will handle the data that is filled in the input fields,after that we will navigate to next page

  const handleDateChange = (inputDate) => {
    const result = handleDateChangeUtils(inputDate);
    const formattedDate = moment(inputDate).format('MM/DD/YYYY');
    setIsValidInput((prev) => ({
      ...prev,
      date: result.boolValue,
    }));
    setMessage(result.message);
    setFormData((prevState) => ({
      ...prevState,
      examDate: formattedDate,
    }));
  };

  const handleDurationChange = (e) => {
    const duration = parseInt(e.target.value, 10);
    if (duration < 1) {
      setIsValidInput((prev) => ({
        ...prev,
        duration: false,
      }));
    } else {
      setIsValidInput((prev) => ({
        ...prev,
        duration: true,
      }));
      setFormData((prevState) => ({
        ...prevState,
        examDuration: duration,
      }));
      if (sessionStorage.getItem("proeficiencyFormData")) {
        sessionStorage.removeItem("proeficiencyFormData");
      }
    }
  };

  const handleStudyHourChange = (e) => {
    const studyHours = parseInt(e.target.value, 10);
    if (studyHours < 1 || studyHours > 24) {
      setIsValidInput((prev) => ({
        ...prev,
        studyHours: false,
      }));
    } else {
      setIsValidInput((prev) => ({
        ...prev,
        studyHours: true,
      }));
      setFormData((prevState) => ({
        ...prevState,
        studyHours: studyHours,
      }));
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setHandleAlert(false);
  };
  const getTodayDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, "0");
    const day = tomorrow.getDate().toString().padStart(2, "0");
    "MM/dd/yyyy"

    return `${month}/${day}/${year}`;
};

  return (
    <>
    { openSignUpModal &&  <RegistrationForm setOpenSignUpModal={setOpenSignUpModal}   openSignUpModal={openSignUpModal}  setgoToDashboard={setgoToDashboard}  component="scheduleDetails" formData={formData} /> }
    {/* {openSignInModal && <GoogleSignInModal openSignInModal={openSignInModal} setSignInModal={setSignInModal} formData={formData}  />} */}
    {goToDashboard &&  <NavigateToDashboard goToDashboard={goToDashboard} setgoToDashboard={setgoToDashboard} formData={formData} /> }
      <Snackbar
        open={handleAlert}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Specify position
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
      <form
        className="d-flex flex-column align-self-center align-items-center"
        style={{ width: "25rem" }}
        onSubmit={generateStudyPlan}
      >
        <input
          type="number"
          min={0}
          max={5}
          name="exam_duration"
          value={formData.examDuration}
          className="form-control my-2 generate-study-inp-field"
          placeholder="Duration of Exam"
          onChange={handleDurationChange}
          required
        />
        {!isValidDate.duration && (
          <Alert
            severity="error"
            sx={{ paddingTop: "0px", paddingBottom: "0px" }}
          >
            {" "}
            value can't be less than 1
          </Alert>
        )}
        <DatePicker  name="exam_date" placeholderText="MM/DD/YYYY"  dateFormat="MM/dd/yyyy"
           className="form-control my-2 generate-study-inp-field"
           selected={formData.examDate} required minDate={getTodayDate()} onChange={(date) => handleDateChange(date)}   />
        {!isValidDate.date && (
          <Alert
            severity="error"
            sx={{ paddingTop: "0px", paddingBottom: "0px" }}
          >
            {message}
          </Alert>
        )}

        <input
          type="number"
          min={0}
          name="study_hours"
          className="form-control my-2 generate-study-inp-field"
          value={formData.studyHours}
          placeholder="How many hours a day can you study"
          onChange={handleStudyHourChange}
          required
        />
        {!isValidDate.studyHours && (
          <Alert
            severity="error"
            sx={{ paddingTop: "0px", paddingBottom: "0px" }}
          >
            {" "}
            value can't be greater than 24
          </Alert>
        )}
        <button
          type="submit"
          className="btn btn-primary generate-study-btn"
        >
          Generate
        </button>
      </form>
    </>
  );
};

export default ScheduleStudyPlan;
