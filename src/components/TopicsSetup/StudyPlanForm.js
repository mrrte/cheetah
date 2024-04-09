import * as React from "react";
import Footer from "../Footer/Footer";
import AdvertisementSection from "../Advertisement/AdvertisementSection";
import {
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Grid,
  Box,
} from "@mui/material";
import { classes } from "./style";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Quotes from "../Quotes/Quotes";
import MyTooltip from "../../utils/MyTooltip/MyTooltip";
import { useLocation ,useNavigate} from "react-router-dom";
import * as ScheduleApi from "../../apis/schedule.api"
import {
  levels,
  Proficiency_setup_table_heading,
  Proficiency_setup_sub_heading,
} from "../../constants/index";
import "../../styles/index.css"

const generateInitialTopics = (examDuration) => {
  const numberOfTopics = examDuration * 3; // Assuming 3 topics per duration
  const initialTopics = Array.from({ length: numberOfTopics }, () => ({
    title: "",
    proficiency: "",
  }));
  return initialTopics;
};
function StudyPlanForm({setLoader}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: formData } = location;
  const [handleAlert, setHandleAlert] = React.useState();
  const savedData = sessionStorage.getItem("proeficiencyFormData");
  const [topics, setTopics] = React.useState(() => {
    const examDuration = formData?.examDuration || 1; // Default to 1 if not specified
    return savedData ? JSON.parse(savedData) : generateInitialTopics(examDuration);
  });
 
  const handleTopicChange = (index, value) => {
    const newTopics = [...topics];
    newTopics[index].title = value;
    setTopics(newTopics);
  };

  // Handle change in proficiency
  const handleProficiencyChange = (index, value) => {
    const newTopics = [...topics];
    newTopics[index].proficiency = value;
    setTopics(newTopics);
  };


  const submitProficiencyDetails=async()=>{
    const hasEmptyFields = topics.some(topic => !topic.title || !topic.proficiency);
     if (hasEmptyFields) {
    setHandleAlert(true);
      return;
    }
    const userId = localStorage.getItem("userId")

    setLoader(true)
    const resultantData ={
      schedulePlanDetails : location.state,
      topicDetails : topics,
      userId: userId,

    }
    const result = await ScheduleApi.createSchedulePlan(resultantData)
    console.log("resultantData...",result)


  sessionStorage.setItem("proeficiencyFormData", JSON.stringify(topics));
  setLoader(false)
  navigate('/reschedule',{state:result});
  console.log("All topics with their levels:", topics);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setHandleAlert(false);
  };
  return (
    <>
        <Snackbar
        open={handleAlert}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Specify position
      >
        <Alert onClose={handleClose} severity="error">
        "Please fill in all required fields (topic title and proficiency) for each topic before continuing."
        </Alert>
      </Snackbar>
      <div className="row">
        <Box sx={{ maxWidth: "85%" }}>
          <Quotes />

          <Card variant="outlined" sx={{ bgcolor: "#f5f5f5" }}>
            <CardContent>
              <div
                style={{
                  textAlign: "center",
                  border: "1px solid black",
                  marginBottom: "40px",
                }}
              >
                <Typography gutterBottom>
                  <b>{Proficiency_setup_table_heading}</b>
                  <br />
                  {Proficiency_setup_sub_heading}
                </Typography>
              </div>

              <div className="topic-lists-style">
              {topics.map((topic, index) => (
                <Grid
                  container
                  spacing={2}
                  key={index}
                  sx={{ marginBottom: "2%", paddingLeft: "1%", marginTop :"5px" }}
                >
                  <Grid item xs={7.8}>
                    <TextField
                      fullWidth
                      label={`Topic ${index + 1}`}
                      value={topic.title}
                      onChange={(e) => handleTopicChange(index, e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>Proficiency</InputLabel>
                      <Select
                        value={topic.proficiency}
                        label="Proficiency"
                        onChange={(e) =>
                          handleProficiencyChange(index, e.target.value)
                        }
                      >
                        {levels.map((level) => (
                          <MenuItem value={level.value}>{level.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              ))}
              </div>
                <Button
                  variant="contained"
                  sx={classes.continueBtn}
                  onClick={submitProficiencyDetails}
                >
                  Continue
                </Button>
              
            </CardContent>
          </Card>
        </Box>
        <AdvertisementSection />
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default StudyPlanForm;
