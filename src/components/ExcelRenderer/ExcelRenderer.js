import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ExcelRenderer({ table }) {
  console.log("table",table)
  return (
    
    <TableContainer component={Paper}  style={{maxHeight:"650px", overflowY:"scroll"}}>
      <Table sx={{ minWidth: 650,background:"#E2E2E2",border:"1px solid #a7a7a7" }} aria-label="simple table">
        <TableBody>
          {table?.length > 0 &&
            table.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border:"1px solid #a7a7a7"} }}
              >
                <TableCell component="th" scope="row"style={{ border:"1px solid #a7a7a7", fontSize:"17px"}} >
                  {row[0]}
                </TableCell>
                <TableCell align="right" style={{ border:"1px solid #a7a7a7", fontSize:"17px"}} >{row[1]}</TableCell>
                <TableCell align="right" style={{ border:"1px solid #a7a7a7", fontSize:"17px"}} >{row[2]}</TableCell>
                <TableCell align="right" style={{ border:"1px solid #a7a7a7", fontSize:"17px"}} >{row[3]}</TableCell>
                <TableCell align="right" style={{ border:"1px solid #a7a7a7", fontSize:"17px"}} >{row[4]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}