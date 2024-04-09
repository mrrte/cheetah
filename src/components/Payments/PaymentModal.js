
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import PaymentCheckoutForm from "./PaymentCheckoutForm";
const PaymentModal = ({ setShowPaymentModal ,showPaymentModal,setShowCheckoutForm,showCheckoutForm}) => {
  
  // Payment logic and UI goes here
console.log("hello")
const closeModal = () => {
    setShowPaymentModal(false)
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const chargeForRecording=()=>{

    setShowCheckoutForm(true)
    setShowPaymentModal(false)
  }
  return (
    <>
    {console.log("checkoutcheck")}
     
    <Modal
      className="buy-session-video-modal"
      open={showPaymentModal}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box  sx={style}>

          <ClearIcon
            style={{ float: "right", cursor: "pointer" }}
            onClick={closeModal}
          ></ClearIcon>
          <div className="d-flex flex-column align-items-center p-2">
            <p className="purchase-rec-head-style">
             Purchase Complete Schedule for <strong>$4.99</strong>
            
            </p>
            <p className="font-weight-bold purchase-confirmation-style m-0 p-0">
             
            </p>
            <div className={"d-flex flex-wrap-reverse justify-content-center gap-10 p-3"}>
              <Button
                id="purchase-btn-style"
                variant="outlined"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                id="vip-btn-style"
                variant="contained"
                onClick={chargeForRecording}
              >
                Complete Purchase!
              </Button>
            </div>
          </div>
       
      </Box>
    </Modal>
  </>

  );
};

export default PaymentModal;