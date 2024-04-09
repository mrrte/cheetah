import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const PaymentCheckoutForm = ({ setShowCheckoutForm, showCheckoutForm ,setIsPurchased}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardholderName, setCardholderName] = useState('');
  const [zipcode, setZipcode] = useState('');
  const { userInfo } = useSelector(state => state.user)

  const closeModal = () => {
    setShowCheckoutForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
  
    });

    if (error) {
      console.log('[error]', error);
    } else {
      
        setShowCheckoutForm(false);
      setIsPurchased(true)
      localStorage.setItem('isPurchased', 'true');
 toast.success("successfully purchased")
       await sendingEmailNotification()
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  async function sendingEmailNotification() {
    try {
      if(userInfo?.email){
        // URL to send the request to
        const url =
          "https://services.leadconnectorhq.com/hooks/C0FdQ0aF2iPmvHNvd4ZQ/webhook-trigger/1d3cb8cc-264d-4e41-902f-4e03b3a62722";
        
        const data  = {
          email : userInfo?.email
        }
    
        // Make POST request using Axios
        axios
          .post(url, data)
          .then((response) => {
            console.log("Response:", response.data);
            return true
          })
          .catch((error) => {
            console.error("Error:", error);
            return false
          });
        
      }
    } catch (error) {
      console.log("error while sending email notifications", error);
      return false
    }
  }
  

  return (
    <Modal
      className="buy-session-video-modal"
      open={showCheckoutForm}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <ClearIcon
          style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}
          onClick={closeModal}
        />
         <p className="purchase-rec-head-style">
            <strong>Add Your Card Details</strong>
            
            </p>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
    
         
          <label style={{ marginBottom: "10px", display: "block" }}>
            Card number
            <div id="stripe-input" style={{border : "1px solid #ccc", width:'100%',padding:'11px',borderRadius:'5px'}}>
            <CardNumberElement  />
            </div>
          </label>
          <label style={{ marginBottom: "10px", display: "block",borderRadius:"2px solid red" }}>
            Expiration date
            <div id="stripe-input" style={{border : "1px solid #ccc", height: "38px",padding:'11px',borderRadius:'5px'}}>
            <CardExpiryElement className="stripe-card-style font-nova bodr-r width-50px" />
            </div>
          </label>
          <label style={{ marginBottom: "10px", display: "block" }}>
            CVC
            <div id="stripe-input" style={{border : "1px solid #ccc", height: "38px",padding:'11px',borderRadius:'5px'}}>
            <CardCvcElement className="stripe-card-style font-nova bodr-r width-50px" />
            </div>
          </label>
          <label style={{ marginBottom: "10px", display: "block" }}>
          zipcode
            <input
              type="text"
              value={zipcode}
              placeholder="zipcode"
              onChange={(e) => setZipcode(e.target.value)}
              style={inputStyle}
              required
            />
          </label>
          <button type="submit" disabled={!stripe} style={submitButtonStyle}>
            {" Pay $4.99"}
          </button>
        </form>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
  minWidth: "300px",
  maxWidth: "400px",
  width: "80%",
  borderRadius: "10px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const submitButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "100%",
};

export default PaymentCheckoutForm;
