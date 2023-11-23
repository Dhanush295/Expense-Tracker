import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRecoilValue } from "recoil";
import { transactionQuery } from "../store/selector/transSelector";
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from "@mui/material";


export interface Transaction {
  id: number;
  title: string;
  description: string;
  date: string;
  amount: number;
  type: string;
  category: string;
}


export function Transaction() {
  const transactionHistory = useRecoilValue<Transaction[]>(transactionQuery);

  return (
    <div>
      <h1>Transaction History</h1>
      <TableContainer component={Paper}  sx={{maxWidth: 900, marginLeft: 35, marginTop: 5}}>
        <Table sx={{ minWidth: 500}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Update</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionHistory.map((item) => (
              <TableRow key={item.id}>
                <TableCell  component="th" scope="row">{item.title}</TableCell>
                <TableCell  align="right">{item.description}</TableCell>
                <TableCell  align="right">{item.type}</TableCell>
                <TableCell  align="right">{item.date}</TableCell>
                <TableCell  align="right">{item.category}</TableCell>
                <TableCell align="right"><UpdateIcon /></TableCell>
                <TableCell  align="right"><DeleteIcon /></TableCell>
                <TableCell  align="right">{item.amount}</TableCell>
              </TableRow>
            ))}
             <TableRow>
            <TableCell rowSpan={3} />
            <TableCell style={{fontWeight: "bold", fontSize: 20}} colSpan={6}>Total Expense </TableCell>
            <TableCell style={{fontWeight: "bold", fontSize: 20}} align="right">800</TableCell>
          </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
      
    </div>
  );
}