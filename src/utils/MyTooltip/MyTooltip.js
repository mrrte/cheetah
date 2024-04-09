import React from 'react'
import { Tooltip } from "@mui/material";

function MyTooltip({children}) {
  return (
    <Tooltip
            title="Coming soon"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  width: "100px",
                  bgcolor: "wheat",
                  fontSize: "14px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                  color: "black",
                  "& .MuiTooltip-arrow": {
                    color: "wheat",
                  },
                },
              },
            }}
          >
            {children}
          </Tooltip>
  )
}

export default MyTooltip