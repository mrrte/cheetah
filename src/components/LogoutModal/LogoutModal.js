import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';

const style = {
  position: 'absolute',
  top: '6rem',
  width: 260,
  bgcolor: 'background.paper',
  padding :'6px 5px 19px 30px',
  right:"7px",
  outline:"none",
  boxShadow: 24,
  border : "1px solid #D5D5D5",
  zIndex: 7,
};

export default function LogoutModal({logoutModalOpen, setLogoutModalOpen,}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const logout=()=>{
        dispatch(logoutUser())
        setLogoutModalOpen(false)
        navigate('/')
    }

    
  return (
    <div>
      <Modal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box sx={style}>
        <div className="d-flex  justify-content-end align-items-end mb-1" style={{width :"100%"}} >
          <ClearIcon onClick={() => setLogoutModalOpen(false)} />
          </div>
        <button
            type="button"
            className="btn btn-warning homepage-btn-style study-plan-action-style d-flex justify-content-center"
            style={{ backgroundColor: "#1155cc", color: "white", border:"1px solid black" }}
            onClick={()=> logout()}
          >
            Logout
          </button>
        </Box>
      </Modal>
    </div>
  );
}