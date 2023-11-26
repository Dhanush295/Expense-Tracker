import React, { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useRecoilValue, useSetRecoilState } from "recoil";
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from "axios";


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

  const [transactionHistory, setTransactionHistory ] = React.useState<Transaction[]>([]);

  useEffect(()=>{
    async function fetchdata(){
      try{

        const response = await axios('http://localhost:3000/getexpenses', {
        headers: {
          "authorization" : "Bearer " + localStorage.getItem('key')
        }
      });
      console.log(response.data.history)
      if (response.data.history) {
        setTransactionHistory(response.data.history );
      }
      else{
        return console.log("No transaction yet")
      }

      }
      catch(error){
        console.log(error);
      }
      
    }; fetchdata();
  }, [])


  

  if (transactionHistory) {
    const total = transactionHistory.reduce((acc, transaction)=>acc + transaction.amount, 0)

  const handleDelete = async (itemId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) {
        return; 
    }

    try {
        const response = await axios.delete(`http://localhost:3000/expense/${itemId}`,
        {
            headers: {
                "authorization": "Bearer " + localStorage.getItem('key')
            }
        });
        if (response.data) {
          alert(response.data.message);
          window.location.assign('/transaction');
          
          
        } else {
            console.log("No item to delete");
        }
    } catch (error) {
        console.error("Error deleting item:", error);
    }
  };

    return (
      <div>
        <h1>Transaction History</h1>
        <TableContainer component={Paper} sx={{ maxWidth: 900, marginLeft: 35, marginTop: 5 }}>
          <Table>
            <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              {transactionHistory.map((item) => (
                 <TableRow >
                 <TableCell  component="th" scope="row">{item.title}</TableCell>
                 <TableCell  align="right">{item.description}</TableCell>
                 <TableCell  align="right">{item.type}</TableCell>
                 <TableCell  align="right">{item.date}</TableCell>
                 <TableCell  align="right">{item.category}</TableCell>
                 <TableCell  align="right"onClick={() => handleDelete(item.id)}><DeleteIcon /></TableCell>
                 <TableCell  align="right">{item.amount}</TableCell>
               </TableRow>
             ))}
              <TableRow>
             <TableCell rowSpan={3} />
             <TableCell style={{fontWeight: "bold", fontSize: 20}} colSpan={5}>Total Expense </TableCell>
             <TableCell style={{fontWeight: "bold", fontSize: 20}} align="right">${total}</TableCell>
           </TableRow>
           </TableBody>
         </Table>
       </TableContainer>
      </div>
    );
  }

  // Handle cases where transactionHistory is null or empty
  return (
    <div>
      <h1>Transaction History</h1>
      <p>No transaction history available.</p>
    </div>
  );
}
