import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import Loader from "../Loader";
import * as ScheduleApi from "../../apis/schedule.api";
import Alert from "@mui/material/Alert";
import { COMPLETE_PREVIOUS_TASKS } from "../../constants";
import "./styles.css"
import { useSelector } from "react-redux";

export default function TaskListDetails({
  taskList,
  setTableData,
  tableData,
  setOpenTaskDetails,
}) {
 
  const [completedItems, setCompletedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previousTasksCompleted, setPreviousTasksCompleted] = useState({
    previousCompleted: true,
    checkBoxShow: false,
    taskViewData : []
  });

  const [completedItemIds , setCompletedItemIds] = useState([])
  const  {userId} = useSelector((state) => state.user)
  

  useEffect(() => {
    if (taskList) {
      previousTaskCompleted();
    }
  }, [taskList]);

  function updateStatusToCompleted(data) {
    const statusToUpdate = data.status == "Completed" ? "Pending" : "Completed";
    data.status = statusToUpdate
    // console.log("datadatadatadatadatadatadatadata",JSON.stringify(data))
    // // Iterate through activities array
    // data?.forEach((activity) => {
    //   // Update status to "Completed" if it's currently "InProgress" or vice versa
    //   console.log("statusToUpdate", statusToUpdate); // Log the updated status
    //   activity.status = statusToUpdate; // Update the status of the current activity
    // });
    return data;
  }

  const markTaskCompleted = (learningItem) => {
    const id = learningItem["id"];
    const status = learningItem["status"];
    const type  = learningItem["type"]
    // Check if the id exists in completedItemIds
    const index = completedItemIds.findIndex(item => item.id === id);
  
    if (index !== -1) {
      const updatedIds = [...completedItemIds];
      updatedIds.splice(index, 1);
      setCompletedItemIds(updatedIds);
    } else {
      const updatedItems = [...completedItemIds];
      if (status === "Completed") {
        updatedItems.push({ id: id, status: "Pending", type:type });
      } else if (status === "Pending") {
        updatedItems.push({ id: id, status: "Completed",type:type  });
      }
      setCompletedItemIds(updatedItems);
    }
  };



const submitData=async()=>{  
  if(completedItemIds.length > 0 && userId){
    setLoading(true)
    const data ={
      userId : userId,
      idsList : completedItemIds
    }
    const updateRes  = await ScheduleApi.updateSchedulePlan(data);
    if(updateRes.status){
      toast.success("Task status is successfully updated !!")
      const formattedData = JSON.parse(updateRes?.json)
      const taskView = updateRes?.taskView
        // console.log("formattedData",formattedData)

      // setTableData({data : formattedData, taskView : taskView, loading: false,filePath: updateRes?.filePath ?? ""})
      setTableData(prevState => ({
        ...prevState, // This will keep all the previous state values including taskView
        data: formattedData,
        loading: false,
        filePath: updateRes?.filePath ?? ""
    }));
      setOpenTaskDetails(false)
    }else{
      toast.error("Someting went wrong.Please try again !!")
    }
    setLoading(false)
  }else{
    setOpenTaskDetails(false)

  }
    
}
console.log("taskList",taskList)
  const isCompletedTask = (learningItem) => {
    // for (let i = 0; i < learningItem?.activities?.length; i++) {
    //   if (learningItem.activities[i].status === "Completed") {
    //      return true; 
    //   }
    // }
    return learningItem.status =="Completed";
  };

  function checkAllCompleted(data) {
    return data.every(dayData => dayData?.status === "Completed");
  }

  const previousTaskCompleted = () => {
    if (taskList?.itemNumber == 0) {
      setPreviousTasksCompleted((prevState) =>({...prevState,previousCompleted:true}))
      return;
    }
    if (taskList?.data && taskList?.itemNumber > 0) {
      const dataElement = tableData?.data?.[Number(taskList?.itemNumber) - 1];
      if (dataElement["data"]) {
        const result = checkAllCompleted(dataElement["data"]);
        if (result) {
         setPreviousTasksCompleted((prevState) =>({...prevState,previousCompleted:true}))
          return;

        }
      }
    }
    setPreviousTasksCompleted((prevState) =>({...prevState,previousCompleted:false,checkBoxShow:true}))
    return;

  };

  const updateAlert = (value) => {
    setPreviousTasksCompleted((prevState) => ({
      ...prevState,
      checkBoxShow: value,
    }));
  };


  const isCheckboxDisabled = () => {
    return !previousTasksCompleted.previousCompleted;

  };

  return (
    <>
      <Loader show={loading} />
      {previousTasksCompleted.checkBoxShow && (
          <Alert
            className="my-3"
            style={{fontSize:"16px"}}
            variant="outlined"
            severity="warning"
          >
            {COMPLETE_PREVIOUS_TASKS}
          </Alert>
      )}
      <TableContainer
        component={Paper}
        id="task-view-by-day-table-css"
        style={{ maxHeight: "500px", overflowY: "scroll" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Task</TableCell>
              <TableCell align="left" style={{ fontWeight: "bold" }}>
                Duration
              </TableCell>
              <TableCell align="left" style={{ fontWeight: "bold" }}>
                Complete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskList?.data?.data?.map((learningItem, index) => (
              <TableRow key={index}>
                <TableCell>
                  {learningItem.title} 
                </TableCell>
                <TableCell>
                  {learningItem.totalDuration && learningItem.totalDuration !="00:00:00" ?
                    learningItem.totalDuration : " " ?? ""}
                </TableCell>
                <TableCell>
                  {isCheckboxDisabled() ? (
                  <Tooltip
                  arrow
                  componentsProps={{
                    tooltip: {
                      sx: {fontSize :"16px", fontWeight:"700"}
                    },
                  }}
                  title="Please Complete Your Previous tasks first"
                  placement="left"
                >
                  <div  style={{cursor:"not-allowed"}}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    style={{ border :"1px solid black" }}
                    disabled
                  />
                  </div>
                </Tooltip>
                  ) : (
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={isCompletedTask(learningItem)}
                      defaultChecked={isCompletedTask(learningItem)}
                      id="flexCheckDefault"
                      style={{ border :"1px solid black" }}
                      onClick={() => markTaskCompleted(learningItem)}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
        {taskList?.data?.data[0]?.eveningReview  &&
          <TableRow key="eveningReview">
          <TableCell colSpan={3}>
      <ul>
          <li>
            <strong>{"Evening Review :"}</strong>
            <ul>
              {taskList?.data?.data[0]?.eveningReview?.At_Bedtime_Everynight?.tasks.map((task, taskIndex) => (
                <li key={taskIndex}>{task}</li>
              ))}
            </ul>
          </li> 
      </ul>
    </TableCell>
          </TableRow>
         }
          </TableBody>
        </Table>
      </TableContainer>
      <div className="d-flex justify-content-center align-items-center">
        <Button
          variant="contained"
          id="submit-date-css"
          className="mt-3"
          onClick={() =>submitData()}
        >
          Submit
        </Button>
      </div>
    </>
  );
}
