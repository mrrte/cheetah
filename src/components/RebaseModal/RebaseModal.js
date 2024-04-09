import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';
import MyTooltip from '../../utils/MyTooltip/MyTooltip';
import * as ScheduleApi from '../../apis/schedule.api'
import { useSelector } from 'react-redux';
import { convertToHours, ProgressCalculator } from '../../utils';
import { topicByDayOrganizerWithRebase } from '../../utils/topicByDayForRebase';
import Loader from '../Loader';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RebaseModal({rebaseModal,setRebaseModal,rebaseHours,setTaskViewByDayData,tableData}) {

  const handleClose = () => setRebaseModal(false);
  const { scheduleId, userId} = useSelector(state => state.schedule)
  const [loader, setLoader] = React.useState(false)

  const rebaseTasksNow=async()=>{
    try {
        setLoader(true)
        const rebaseResponse = await ScheduleApi.rebaseSchedule({rebaseHours,scheduleId});
        if(rebaseResponse.status && rebaseResponse?.rebaseHours){
              const totalHours = convertToHours(rebaseResponse?.rebaseHours);
              const transformedData = topicByDayOrganizerWithRebase(tableData?.data,totalHours)
              if(transformedData?.transfromedOrganizedData?.length >0){
                const calculateProgress = ProgressCalculator(transformedData?.transfromedOrganizedData)
                const dataToUpdate = {
                  userId : userId,
                  idsList : transformedData?.idsList
                }
                await ScheduleApi.updateSchedulePlan(dataToUpdate);
                setTaskViewByDayData((prevData) => ({...prevData , data :transformedData?.transfromedOrganizedData, progress:calculateProgress}))
              }
        }
        setLoader(false)
        setRebaseModal(false)
        
    } catch (error) {
        console.log("rebase tasks now", error);
        toast.error("error while rebasing tasks", error)
        setLoader(false)
        setRebaseModal(false)

        return false;
    }
  }

  return (
    <>
      <Modal
        open={rebaseModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style} className="d-flex flex-column justify-content-center align-items-center">
          {loader && <Loader show={loader} />}
         <Typography id="modal-modal-title" variant="h6" component="h3" style={{fontSize:"18px", fontWeight:"700" , marginBottom:"3px"}}>
            {`You need to study ${rebaseHours} hours per day`}
          </Typography>
          <MyTooltip> 
          <button
            type="button"
            className="btn btn-warning homepage-btn-style study-plan-action-style"
            style={{ backgroundColor: "#1155cc", color: "white", border:"1px solid black" }}
            onClick={() => rebaseTasksNow()}
          >
            {"Rebase Now"}
          </button>
          </MyTooltip>
        </Box>
      </Modal>
    </>
  );
}