import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import TaskListDetails from "../TaskViewByDay/TaskViewByDay";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./styles.css";
import { toast } from "react-toastify";
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

export default function CompletedTaskDetailsModal({
  completedData,
  openCompleteListModal,
  setOpenCompleteListModal,
}) {
  const closeCompletedTaskDetailsModal = () => {
    setOpenCompleteListModal(false);
  };

  const tableCellStyle = {
    fontSize: "21px",
    fontWeight: "500",
  };
  const tableBodyCell = {
    fontSize: "17px",
  };

  return (
    <>
      <Modal
        open={openCompleteListModal}
        onClose={closeCompletedTaskDetailsModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="d-flex flex-column justify-content-center align-items-center"
        >

         <div className="d-flex  justify-content-between align-items-center" style={{width :"100%"}} >
         <Typography id="modal-modal-title" variant="h6" component="h2">
            Completed Tasks Checklist{" "}
            <ChecklistRtlIcon style={{ height: "2rem", marginLeft: "5px" }} />
          </Typography>
          <ClearIcon onClick={() =>closeCompletedTaskDetailsModal()} />
          </div>

          <div>
          <TableContainer
  style={{ height: "400px", overflowY: "scroll" }}
  component={Paper}
  id="task-view-by-day-table-css"
>
  <Table aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell style={tableCellStyle}>Day</TableCell>
        <TableCell style={tableCellStyle}>Task</TableCell>
        <TableCell align="left" style={tableCellStyle}>
          Duration
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {completedData?.length > 0 &&
        completedData.map((day, dayIndex) =>
          day?.activities?.length > 0 ? (
            day.activities.map((activity, activityIndex) => (
              <TableRow
                style={tableBodyCell}
                key={`${dayIndex}-${activityIndex}`}
              >
                {activityIndex === 0 && (
                  <TableCell rowSpan={day.activities.length} style={tableBodyCell}>
                    {day.day}
                  </TableCell>
                )}
                <TableCell style={tableBodyCell}>
                  {activity?.name ?? activity?.title ?? " "}
                </TableCell>
                <TableCell style={tableBodyCell}>
                  {activity.totalDuration ?? " "}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow style={tableBodyCell} key={dayIndex}>
              <TableCell style={tableBodyCell}>{day.day}</TableCell>
              <TableCell style={tableBodyCell}>No Completed Tasks</TableCell>
              <TableCell style={tableBodyCell}>-</TableCell>
            </TableRow>
          )
        )}
    </TableBody>
  </Table>
</TableContainer>

          </div>
        </Box>
      </Modal>
    </>
  );
}
