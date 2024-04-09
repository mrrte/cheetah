import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import TaskListDetails from "../TaskViewByDay/TaskViewByDay";
import ClearIcon from '@mui/icons-material/Clear';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow: 24,
  p: 4,
};

export default function TaskDetailsModal({
  openTaskDetails,
  setOpenTaskDetails,
  taskList,
  setTableData,
  tableData
}) {
  const closeTaskDetailsModal = () => {
    setOpenTaskDetails(false);
  };

  return (
    <>
      <Modal
        open={openTaskDetails}
        onClose={closeTaskDetailsModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="d-flex  justify-content-between align-items-center" style={{width :"100%"}} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`${taskList?.data?.day === "Day1" ? "Current Day" : taskList?.data?.day} Task Checklist`}
            <ChecklistRtlIcon style={{ height: "2rem", marginLeft: "5px" }}/>
          </Typography>
          <ClearIcon onClick={() =>closeTaskDetailsModal()} />
          </div>
          <div>
            
            <TaskListDetails taskList={taskList} tableData={tableData} setTableData={setTableData} setOpenTaskDetails={setOpenTaskDetails}  />
          </div>
        </Box>
      </Modal>
    </>
  );
}
