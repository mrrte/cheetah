import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { SCHEDULE_ALREADY_EXISTED } from "../../constants";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  padding: "0 15px 26px 12px",
  borderRadius: "8px",
};

export default function NavigateToDashboard({
  setgoToDashboard,
  goToDashboard,
  formData
}) {
  const navigate = useNavigate();

  const handleClose = () => {
    setgoToDashboard(false);
  };
  return (
    <>
      <Modal
        open={goToDashboard}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className="d-flex  justify-content-between align-items-center"
            style={{ width: "100%" }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {SCHEDULE_ALREADY_EXISTED}
            </Typography>
            <ClearIcon onClick={() => handleClose()} />
          </div>
          <div className="d-flex flex-column justify-content-center ">
            <button
              type="button"
              className="btn btn-warning homepage-btn-style  mb-2"
              onClick={() => navigate("/dashboard")}
            >
              Check Schedule
            </button>
            <button
                type="button"
                className="btn btn-warning homepage-btn-style"
                style={{ backgroundColor : "red", color:"white",border:"none"}}
                onClick={() =>  navigate("/proficiency-setup", { state: formData })}
              >
                Create New Schedule
              </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
