import React from 'react';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Card,
    CardContent,
    Grid,
    Box,
} from "@mui/material";

function Footer() {
  return (
    <footer style={footerStyle}>
      <Card variant="outlined" style={{ display: 'flex', alignItems: 'center' }}>
        <CardContent>
          <div
            style={{
              textAlign: "center",
              border: "1px solid black",
              backgroundColor: "#E9AB17",
              maxWidth: "300px",
              padding: "5px", // Add padding
              marginLeft:'330px'
            }}
          >
            <Typography gutterBottom>
              <b>Try it for Three Days</b>
              <br />
              <b>(No Credit Card Request)</b>
            </Typography>
          </div>
        </CardContent>
        <ChatBubbleIcon sx={{ fontSize: 48, color: '#ADD8E6',marginLeft:'530px' }} /> {/* Include ChatBubbleIcon component */}
      </Card>
    </footer>
  );
}

const footerStyle = {};

export default Footer;
