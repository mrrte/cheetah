import React, { useEffect, useState } from "react";
import DayWiseTaskList from "./DayWiseTaskList";
import MyTooltip from "../../utils/MyTooltip/MyTooltip";
import { useLocation } from "react-router-dom";
import ExcelRenderer from "../ExcelRenderer/ExcelRenderer";
import TopicWiseTaskList from "./TopicWiseTaskList";
import { toast } from "react-toastify";
import CompletedTaskDetailsModal from "./CompletedTaskListModal";
import * as ScheduleApi from  "../../apis/schedule.api"
import Loader from "../Loader";
import { filterCompletedTaskList, ProgressCalculator } from "../../utils";
import { DOWNLOAD_SCHEDULE, PERFORMANCE_MESSAGING } from "../../constants";
import { SERVER_URL } from "../../constants/envConstants";
import { removePublicFromURL } from "../../utils";
import CalendarView from "../CalendarView/CalendarView";
import { useDispatch, useSelector } from "react-redux";
import RebaseModal from "../RebaseModal/RebaseModal";
import { updateScheduleDetails } from "../../store/schedule/scheduleSlice";
import PaymentModal from '../Payments/PaymentModal'; // Make sure to create this component
import PaymentCheckoutForm from '../Payments/PaymentCheckoutForm'
import moment from "moment"

const StudyPlanCheckBox = () => {
  const location = useLocation();
  const [tableData,setTableData] = useState({ data:[], taskView: "taskViewByDay", loading: true , filePath :'' })
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCheckoutForm,setShowCheckoutForm]= useState(false)
  const [isPurchased, setIsPurchased] = useState(false);
  const [taskViewByDayData,setTaskViewByDayData] = useState({
    data : [],
    progress : "0"
  })
  const [taskViewByTopicData,setTaskViewByTopicData] = useState({
    data : [],
    progress : "0"
  })
  const dispatch = useDispatch()
  useEffect(()=>{
    retrieveUserDetails()
  },[])
  useEffect(() => {
    // Logic to handle content visibility after successful purchase
    if(localStorage.getItem('isPurchased')){
      const  checkIspurcahsed=localStorage.getItem('isPurchased')
      setIsPurchased(checkIspurcahsed)
       if (checkIspurcahsed) {
         setShowPaymentModal(false);
       }
    }
  
  }, [isPurchased]);

  const retrieveUserDetails=async()=>{
    try {
      const userId  = localStorage.getItem("userId")
      const data  = {
        taskView : tableData.taskView , 
        userId : userId
      }
      const response = await ScheduleApi.retrieveSchedulePlan(data);
      if(response.status){
        dispatch(updateScheduleDetails(response))
        const formattedData = JSON.parse(response?.json)
        const taskView = response?.taskView
        // console.log("formattedData",formattedData)

        setTableData({data : formattedData, taskView : taskView, loading: false,filePath: response?.filePath ?? ""})
      }
                 
    } catch (error) {
        console.error("error while retrieveing user details", error)
        if(location?.state?.json){
          const formattedData = JSON.parse(location?.state?.json)
          const taskView = location?.state?.taskView
          setTableData({data : formattedData, taskView : taskView, loading: false,filePath: location?.state?.filePath ?? ""})
        }
    }
  }

  
  return (
    <>
      <>
      <Loader show={tableData?.loading} />
        <div className="d-flex justify-content-around">
          <CheckBox text="Calendar View" disable={false} setTableData={setTableData} value="calendarView" />
          <CheckBox text="Task View by Day"  disable={false} setTableData={setTableData} tableData={tableData} value="taskViewByDay" />
        
          <CheckBox text="Task View by Topic"  disable={false} setTableData={setTableData} tableData={tableData} value="taskViewByTopic"  />
        </div>
        {showPaymentModal && <PaymentModal setShowPaymentModal={setShowPaymentModal}showPaymentModal={showPaymentModal}showCheckoutForm={showCheckoutForm}setShowCheckoutForm ={setShowCheckoutForm} />}
    {showCheckoutForm && <PaymentCheckoutForm setShowCheckoutForm={setShowCheckoutForm}showCheckoutForm={showCheckoutForm} setIsPurchased={setIsPurchased}setShowPaymentModal={setShowPaymentModal}showPaymentModal={showPaymentModal}  />}
        {tableData?.taskView == "taskViewByDay" && <DayWiseTaskList tableData={tableData} setTableData={setTableData} taskViewByDayData={taskViewByDayData}  setTaskViewByDayData={setTaskViewByDayData}setShowPaymentModal={setShowPaymentModal}showPaymentModal={showPaymentModal}setIsPurchased={setIsPurchased}isPurchased={isPurchased} /> }
        {tableData?.taskView=="taskViewByTopic" && <TopicWiseTaskList tableData={tableData} setTableData={setTableData} taskViewByDayData={taskViewByTopicData}  setTaskViewByDayData={setTaskViewByTopicData} setIsPurchased={setIsPurchased}isPurchased={isPurchased} setShowPaymentModal={setShowPaymentModal}/>}
        {tableData?.taskView =="calendarView"  && <CalendarView table={tableData?.data?.taskViewByDayData} />}
        
        <StudyPlanAction taskViewByDayData={taskViewByDayData} setTaskViewByDayData={setTaskViewByDayData} tableData={tableData}  />
      </>
      {/* <PerformanceMessaging/> */}
      <PrintSchedule tableData={tableData} />
    </>
  );
};

const CheckBox = ({ text, disable, setTableData,tableData, value }) => {
  
  const updateTaskViewScreen =async(value)=>{
    try {
      if(value == "calendarView"){
        setTableData((prevState)=>({...prevState, taskView:value}))
        return;
      } 
      if(value != tableData.taskView && value !="calendarView"){
        setTableData((prevState)=>({...prevState, loading:true}))
        const userId = localStorage.getItem("userId")

        if(userId && value){
          const data  = {
            userId : userId,
            taskView : value
          }
          const response = await ScheduleApi.retrieveSchedulePlan(data);
          if(response.status){
            const formattedData = JSON.parse(response?.json)
            const taskView = response?.taskView
            setTableData({data : formattedData, taskView : taskView, loading: false,filePath: response?.filePath ?? ""})
          }
        }
  
        setTableData((prevState)=>({...prevState, loading:false}))
      }
    } catch (error) {
       console.log("error while selecting checkbox", error);
       setTableData((prevState)=>({...prevState, loading:false}))

    }
  }

  return (
    <div className="form-check d-flex justify-content-center">
      <input
        className="form-check-input checkbox-style mx-1"
        type="checkbox"
        checked={tableData?.taskView === value}
        // disabled={disable}
        onChange={() => updateTaskViewScreen(value)}
      />
      <label className="form-check-label label-style">{text}</label>
    </div>
  );
};

const StudyPlanAction = ({taskViewByDayData,setTaskViewByDayData,tableData}) => {

  const  [completedData, setCompletedData] = useState([])
  const [openCompleteListModal,setOpenCompleteListModal] = useState(false)
  const { userId } = useSelector((state) => state.user);
  const [rebaseModal, setRebaseModal] = useState(false)
  const [loader, setLoader] = useState(false)
  const [rebaseHours, setRebaseHours] = useState('')

  const CompletedTaskList =()=>{
    if(taskViewByDayData?.data){
        const completedStudyPlan = filterCompletedTaskList(taskViewByDayData?.data)
        if(completedStudyPlan.length >0){
          setCompletedData(completedStudyPlan)
          setOpenCompleteListModal(true)
        }else{
          toast.error("There is no completed task available !!")
        }
    }
  }

  function checkPendingTasks(data) {
    const currentDate = moment();
    for(const item in data){
      const dayDate = data[item]?.data[0]?.date
      if(dayDate) {
        const updaedDate = moment(dayDate, 'MM/DD/YYYY');
        if (updaedDate.isBefore(currentDate, 'day')) {
            return false
        }
      }
    }
    return true;
}

// Example usage

  const rebaseTask = async () => {
    try {
      // setLoader(true)
      if(!(taskViewByDayData?.data[0]?.data[0].date)){
        toast.error("Tracking is not started yet !!");
        setLoader(false)
        return;
      }

      const havePending = checkPendingTasks(taskViewByDayData?.data);
      if(havePending){
        toast.error("Pending task of previous passed out day not available");
        setLoader(false)
        return;
      }

      const calculateProgress = ProgressCalculator(taskViewByDayData?.data);
      if(calculateProgress == 100){
        toast.error("There is nothing to rebase !!");
        setLoader(false)
        return;
      }
     
      const rebaseHrRes = await ScheduleApi.findRebaseHours({ userId: userId });
      if (rebaseHrRes.status && rebaseHrRes.totalDuration) {
        setLoader(false)
        setRebaseModal(true);
        setRebaseHours(rebaseHrRes.totalDuration)
        return;
      }
      toast.error("Something went wrong !!");
      setLoader(false)
    } catch (error) {
      console.log("error while finding rebase hours", error);
      toast.error("Something went wrong !!");
      setLoader(false)
      return false;
    }
  };
  return (
    <>
    <CompletedTaskDetailsModal completedData={completedData} openCompleteListModal={openCompleteListModal} setOpenCompleteListModal={setOpenCompleteListModal}  />
    {rebaseHours && rebaseModal && <RebaseModal rebaseModal={rebaseModal} setRebaseModal={setRebaseHours} rebaseHours={rebaseHours} setTaskViewByDayData={setTaskViewByDayData} tableData={tableData} />}
    <div className="d-flex justify-content-around mt-4">
      {/* <MyTooltip> */}
      {taskViewByDayData?.data ?
        <button
          type="button"
          className="btn btn-warning homepage-btn-style study-plan-action-style"
          onClick={CompletedTaskList}
        >
          See Completed Tasks
        </button>  : 
        <MyTooltip>
          <button
            type="button"
            className="btn btn-warning homepage-btn-style study-plan-action-style"
            onClick={CompletedTaskList}
          >
            See Completed Tasks
          </button>
        </MyTooltip>
        }
      {/* <MyTooltip> */}
      { tableData.taskView == "taskViewByDay" &&
          <button
            type="button"
            className="btn btn-warning homepage-btn-style study-plan-action-style"
            style={{ backgroundColor: "#1155cc", color: "white", border:"1px solid black" }}
            onClick={() => rebaseTask()}
            disabled={loader}
          >
            {loader ? <Loader show={loader} /> :"Rebaseline"}
          </button>
      }
          {/* </MyTooltip> */}
      {/* <MyTooltip>
        <button
          type="button"
          className="btn btn-warning homepage-btn-style study-plan-action-style"
          // style={{ backgroundColor: "#1155cc", color: "white" }}
        >
          Notification Preferences
        </button>
      </MyTooltip> */}
    </div>
    </>
  );
};

export default StudyPlanCheckBox;



const PerformanceMessaging=()=>{
  return<>
    <MyTooltip>
    <div className="alert alert-style d-flex justify-content-center m-3" role="alert"style={{backgroundColor : "#c9daf8"}} >
      {PERFORMANCE_MESSAGING}
      </div>
    </MyTooltip>
  </>
}


const PrintSchedule=({tableData})=>{

  return<>
<div  className="alert alert-style d-flex justify-content-center m-3" role="alert">
  <a
    href={
      tableData?.filePath
        ? removePublicFromURL(`${SERVER_URL}/${tableData?.filePath}`)
        : "#"
    }
    download
    target="_blank"
  >
    {DOWNLOAD_SCHEDULE}
  </a>
</div>
 </>
}
