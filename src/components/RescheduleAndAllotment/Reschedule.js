import React, { useState } from "react";
import AdvertisementSection from "../Advertisement/AdvertisementSection";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { classes } from "./style";
import Quotes from "../Quotes/Quotes";

import MyTooltip from "../../utils/MyTooltip/MyTooltip";
import { useLocation, useNavigate } from "react-router-dom";
import * as ScheduleApi from "../../apis/schedule.api";
import Loader from "../Loader";
import { toast, ToastContainer } from "react-toastify";

function Reschedule() {
  const [isPrepared, setIsPrepared] = React.useState(false);
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [allocateChecked, setAllocateChecked] = useState(false);
  const [rescheduleChecked, setRescheduleChecked] = useState(false);

  const handleAllocateChange = (event) => {
    setAllocateChecked(event.target.checked);
    if (event.target.checked) {
      setRescheduleChecked(false); // Uncheck reschedule checkbox when allocating
    }
  };

  const handleRescheduleChange = (event) => {
    setRescheduleChecked(event.target.checked);
    if (event.target.checked) {
      setAllocateChecked(false); // Uncheck allocate checkbox when rescheduling
    }
  };
  React.useEffect(() => {
    console.log("neededStudyHours", location.state.neededStudyHours);
    if (!location.state.status) {
      setIsPrepared(false);
    } else {
      setIsPrepared(true);
    }
  }, [location.state]);
  const generateSchedulePlan = async () => {
    if (isPrepared) {
      setLoader(true);

      if (location.state.status) {
        navigate("/dashboard", { state: location?.state });
      }
      setLoader(false);
    } else {
      if(allocateChecked){
        setLoader(true);

        const hours  = Math.ceil(location?.state?.neededStudyHours);
        let studyPlanFormData  = sessionStorage.getItem("studyPlanFormData")
        let proeficiencyFormData = sessionStorage.getItem("proeficiencyFormData")
        proeficiencyFormData = JSON.parse(proeficiencyFormData)

        let userId = localStorage.getItem("userId")

        studyPlanFormData = JSON.parse(studyPlanFormData)
        studyPlanFormData = {...studyPlanFormData , ...{studyHours : hours}}
        //  console.log("studyPlanFormData",studyPlanFormData)
        const resultantData ={
          schedulePlanDetails :studyPlanFormData,
          topicDetails : proeficiencyFormData,
          userId: userId,
    
        }
        const result = await ScheduleApi.createSchedulePlan(resultantData)
        setLoader(false)
        navigate('/dashboard',{state:result});


   }else if(rescheduleChecked){
     navigate("/");
   }else{
      toast.error("Please select option to continue !!")
      return;
   }
    }
  };


  function convertToHHMMSS(time) {
    var hours, minutes, seconds;

    if (Number.isInteger(time)) {
      hours = Math.floor(time / 3600);
      minutes = Math.floor((time % 3600) / 60);
      seconds = Math.floor(time % 60);
    } else {
      hours = Math.floor(time);
      minutes = Math.floor((time - hours) * 60);
      seconds = Math.floor(((time - hours) * 60 - minutes) * 60);
    }

    // Format the output
    var HH = ("0" + hours).slice(-2);
    var MM = ("0" + minutes).slice(-2);
    var SS = ("0" + seconds).slice(-2);

    return HH + ":" + MM + ":" + SS;
  }
  const isGreaterThan12 = location.state.neededStudyHours > 12;
  return (
    <>
     <ToastContainer/>
      <Loader show={loader} />
      <div className="row">
        <Box sx={{ maxWidth: "85%" }}>
          <Quotes />
          <Card variant="outlined" sx={{ bgcolor: "#f5f5f5" }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                <b>Based on Your Proficiency in Each Topic On Your Exam​</b>
              </Typography>

              {isPrepared ? (
                <Typography gutterBottom sx={classes.content}>
                  Good job, you’ve allocated sufficient time to prepare for your
                  exam.
                </Typography>
              ) : (
                <>
                  <Typography gutterBottom sx={classes.allocateContent}>
                    {!isGreaterThan12 ? (
                      // Render this when neededStudyHours is greater than 12
                      <>
                        Even by accelerating your exam prep, you need to
                        allocate more time to study for your exam. Based on when
                        your exam is we recommend you either:
                        <br />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={allocateChecked}
                              onChange={handleAllocateChange}
                            />
                          }
                          label={
                            <Typography>
                              Allocate{" "}
                              <strong>
                                {location?.state?.hrsToStudyHHMMSS}
                              </strong>{" "}
                              Hours Per Day to Study
                            </Typography>
                          }
                        />
                        <br />
                        <b>OR</b>
                        <br />
                      </>
                    ) : (
                      <>
                        Even by accelerating your exam prep, you need to
                        allocate more time to study for your exam. Based on when
                        your exam is we recommend you:
                        <br />
                      </>
                    )}
                    {/* Always render this */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rescheduleChecked}
                          onChange={handleRescheduleChange}
                        />
                      }
                      label="Reschedule Your Exam Date to X"
                    />
                  </Typography>
                </>
              )}

              <Button
                variant="contained"
                sx={classes.continueBtn}
                onClick={generateSchedulePlan}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        </Box>
        <AdvertisementSection />
      </div>
    </>
  );
}

export default Reschedule;
