import React, { useEffect, useState } from "react";
import { countCompletedAndPending, ProgressCalculator } from "../../utils";
import { topicByDayOrganizer } from "../../utils/topicByDayUtil";
import SelectRescheduleDate from "./SelectRescheduleDate";
import TaskDetailsModal from "./TaskDetailModal";



const DayWiseTaskList = ({setTableData,tableData,taskViewByDayData,setTaskViewByDayData,setShowPaymentModal,showPaymentModal,isPurchased}) => {


  const [showModal,setShowModal]= useState(false)
  const [openTaskDetails, setOpenTaskDetails] = useState(false)
  const [taskList, setTaskList]= useState({data :{}, itemNumber:null})

  const [progress, setProgress] = useState("0")
 
  // console.log("tabletabletabletabletabletabletabletabletabletabletabletabletabletabletable", JSON.stringify(table))
  // console.log("DayWiseTaskListDayWiseTaskList ",tableData)


  useEffect(()=>{
    if(tableData?.data){
        const transformedData = topicByDayOrganizer(tableData?.data);
        console.log("transformedData",transformedData)
        if(transformedData.length >0){
          const calculateProgress = ProgressCalculator(transformedData)
          setTaskViewByDayData((prevData) => ({...prevData , data :transformedData, progress:calculateProgress}))
        }
    }
  },[tableData?.data])

  useEffect(() => {
    if(taskViewByDayData.length >0 ){
 
      const calculateProgress = ProgressCalculator(transformedData)
      setTaskViewByDayData((prevData) => ({...prevData , progress :calculateProgress}))

    }

  }, [openTaskDetails]);


  const isCompleted = (studyPlanData) => {
    let completedCount = 0;
    let pendingCount = 0;
    if(studyPlanData?.data?.length >0){
      studyPlanData?.data?.forEach((item) => {
        if (item.status === "Completed") {
          completedCount++;
        } else if (item.status === "Pending") {
          pendingCount++;
        }
      });

      const totalCount  = completedCount+pendingCount
      if(completedCount >0 && totalCount >0){
        const percentageCompleted = (completedCount / totalCount) * 100;
        return percentageCompleted

      }
    }

    return false;
  };

  //const isAnyContentBlurred = table.some((item, index) => index > 3);
  const openTaskListDetails = (item, itemNumber) => {
    if (!isPurchased && itemNumber > 3) { // Day4 and onwards
      setShowPaymentModal(true);
    } else {
      setTaskList({ data: item, itemNumber: itemNumber  });
      setOpenTaskDetails(true);
    }
  };
  const applyStyles = (item, dayIndex) => {
    const isBlurred = !isPurchased && dayIndex > 3;
    const completedPercentage = isCompleted(item);
    const styles = { cursor: 'pointer' };

    if (isBlurred) {
      styles.filter = 'blur(4px)';
    }
    
    if (completedPercentage) {
      styles.backgroundImage = `linear-gradient(to right, #7fd37f ${completedPercentage}%, transparent 50%)`;
    }

    return styles;
  };

  return (
    <>
    <SelectRescheduleDate showModal={showModal} setShowModal={setShowModal} setTableData={setTableData} taskViewByDayData={taskViewByDayData} table={taskViewByDayData.data} />
    {taskList?.data && taskList?.itemNumber!=null && <TaskDetailsModal  openTaskDetails={openTaskDetails} setOpenTaskDetails={setOpenTaskDetails} taskList={taskList} setTableData={setTableData}
     tableData={taskViewByDayData} /> }
    <div className="row">
      <div className="col-md-3"></div>
      <button
        type="button"
        className="btn btn-warning homepage-btn-style study-plan-action-style mt-3 col-md-2"
        style={{ backgroundColor: "#1155cc", color: "white", border:"1px solid black" }}
        onClick={()=>{setShowModal(true)}}
      >
        Start Tracking
      </button>
    </div>

      <div className="row mt-3">
        <div
          className="col-md-11"
          style={{ maxHeight: "600px", overflowY: "scroll" }}
        >



        {taskViewByDayData?.data?.length > 0 &&
       taskViewByDayData?.data?.map((item, dayIndex) => {
          const isBlurred = dayIndex > 3;
          return (
            <div className={`row mb-1`} key={dayIndex}>
              <div className={`col-md-3 mr-2 daywise-tasklist-col-style ${!isPurchased && dayIndex > 3 ? 'blurred-content' : ''}`}>
                {item?.data[0]?.date && item?.data[0]?.date !=" " ? item?.data[0]?.date : item?.day === "Day1" ? "Current Day" : item?.day}
              </div>
              <div
                className="col daywise-tasklist-col-style"
                onClick={() => openTaskListDetails(item, dayIndex)}
                style={applyStyles(item, dayIndex)}
              >
               
                {`${item?.data[0]?.title}...`}
              </div>
            </div>
          );
        })}
       { !isPurchased &&  (
        
          <button
            type="button"
            className="btn btn-warning homepage-btn-style study-plan-action-style mt-3 col-md-2 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "#1155cc", color: "white", border: "1px solid black", bottom: "50%",width: "20rem",left: "32rem",position:"relative"}}
            onClick={() => setShowPaymentModal(true)}
          >
            Purchase To Continue
          </button>
        
      )}
        </div>
        <div className="col d-flex justify-content-end">
          <div className="progress progress-bar-vertical">
            <div
              className="progress-bar progress-striped"
              role="progressbar"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ height: `${taskViewByDayData?.progress}%`, backgroundColor: "#93c47d" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DayWiseTaskList;
