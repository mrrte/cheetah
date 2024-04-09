import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AlarmIcon from "@mui/icons-material/Alarm";
import { ToastContainer, toast } from 'react-toastify';
import "./styles.css";
import moment from "moment";
import { isDateGreater } from "../../utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as ScheduleApi from "../../apis/schedule.api"
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow: 24,
  p: 4,
};

export default function SelectRescheduleDate({ showModal, setShowModal,table,setTableData,taskViewByDayData }) {
  const handleClose = () => {
    setShowModal(false);
  };
  const [date, setDate] = React.useState("")

  const submitDate= async()=>{
     if(date && date !=""){
         const startDate = moment(date,'YYYY-MM-DD');
         const nextDates = [];
        for (let i = 0; i < taskViewByDayData?.data.length; i++) {
          const currentDate = startDate.clone().add(i, 'days');
          const formattedDate = currentDate.format('MM/DD/YYYY');
          nextDates.push(formattedDate);
        }
        const lastDate = nextDates[nextDates.length-1]
        const examDetails = JSON.parse(sessionStorage.getItem("studyPlanFormData"))
        const examDate = examDetails["examDate"]
        const isValidReschedule = isDateGreater(lastDate,examDate)
        console.log("nextDates",{isValidReschedule})
        if(!isValidReschedule){
          toast.error("Final Exam Date Conflict: Adjust Your Tracking Last Day to Ensure Alignment")
        }else{
          const scheduleDetails  = taskViewByDayData.data
          
          const resultantData =[]
          scheduleDetails.forEach((item, index) => {
            const data = item?.data
             if(data?.length>0){
                
              for(let i=0;i<data?.length;i++){
                resultantData.push({id: data[i].id , date : nextDates[index],type : data[i].type})
              }
             }
          });
          // resultantData.push({id :item.data[0].id, date: nextDates[index]})
          // item.day = nextDates[index];

          const userId = localStorage.getItem("userId")

          const data ={
            userId : userId,
            idsList :resultantData
          }

          const updateRes  = await ScheduleApi.updateSchedulePlan(data)
          if(updateRes.status){
            toast.success("Tracking details successfully updated !!")
            const formattedData = JSON.parse(updateRes?.json)
            const taskView = updateRes?.taskView
              // console.log("formattedData",formattedData)
            setTableData({data : formattedData, taskView : taskView, loading: false,filePath: updateRes?.filePath ?? ""})
          }
          // setTableData((prevState) =>({...prevState, data:scheduleDetails}))
          // console.log("scheduleDetailsscheduleDetails",scheduleDetails)
          setShowModal(false)
        }


     }else{
      toast.error("Please select a valid date !!");
        return
     }
  }

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Pad with zero if necessary to ensure MM format
    const day = today.getDate().toString().padStart(2, "0"); // Pad with zero if necessary to ensure DD format
    return `${year}-${month}-${day}`;
  };
  return (
    <>
      <ToastContainer/>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="d-flex flex-column justify-content-center align-items-center">
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Choose Start Tracking Date{" "}
            <AlarmIcon style={{ height: "2rem", marginLeft: "5px" }} />
          </Typography>
          <DatePicker id="re-schedule-date" name="reschedule-date" placeholderText="MM/DD/YYYY"  dateFormat="MM/dd/yyyy"
           selected={date} onChange={(date) => setDate(date)}  
          //  minDate={getTodayDate()}
             />
          <Button variant="contained"  id="submit-date-css" className="mt-3" onClick={submitDate} >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}
