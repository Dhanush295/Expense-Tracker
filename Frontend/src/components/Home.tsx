import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { Transaction } from './Transaction';

function DisplayExpenses(){
    const [allTransaction , setExpenses ]= React.useState<Transaction[]>([]);

    React.useEffect(()=>{
      async function fetchdata(){
        try{
  
          const response = await axios('http://localhost:3000/getexpenses', {
          headers: {
            "authorization" : "Bearer " + localStorage.getItem('key')
          }
        });
        console.log(response.data.history)
        if (response.data.history) {
            setExpenses(response.data.history);
        }
        else{
          console.log("Please Login!")
        }
  
        }
        catch(error){
          console.log(error);
        }
        
      }; fetchdata();
    }, [])

    let total = 0;
    let expenseTotal = 0;
    
    if (allTransaction.length > 0) {
        total = allTransaction.reduce((acc, transactions) => acc + transactions.amount, 0);
    
        const expenseItems = allTransaction.filter(item => item.type === "Expense");
        console.log('Expense Items:', expenseItems);
        if (expenseItems.length > 0) {
            expenseTotal = expenseItems.reduce((acc, item) => acc + item.amount, 0);
        }
    }
    console.log('All Transactions:', allTransaction);
    console.log('Expense Items:', expenseTotal);
    
    const income = total - expenseTotal;
    

    return(
        <div>
                
        <Card sx={{maxWidth: 400, marginTop:20, minWidth: 400 ,minHeight: 100}}>
            <div style={{display: "flex", justifyContent:" center"}}>
                <Typography style={{color: "Black",fontWeight:"bold", fontSize: 20}}>Total Expenses:</Typography>
                <div style={{paddingLeft: 5}}>
                <Typography style={{color: "Black",fontWeight:"bold" ,fontSize: 20}}>${total}</Typography>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "space-around", margin:20}}>
            <div>
                <Typography style={{color: 'Green', fontSize: 20}}>Income</Typography>
                <Typography style={{color: 'Green', fontSize: 20}}>${income}</Typography>
            </div>
            <div>
                <Typography style={{color: 'red', fontSize: 20}}>Expense</Typography>
                <Typography style={{color: 'red', fontSize: 20}}>${expenseTotal}</Typography>
            </div>
            </div>
            <div style={{margin: 5}}>
            <Button href="/transaction">Expense List</Button>
            </div>
        </Card>
        
    </div>
    );
}

function CreateExpense(){
    
    const [title, setTitle] = React.useState(''); 
    const [description, setDescription] = React.useState(''); 
    const [amount, setAmount] = React.useState(Number); 
    const [type, setType] = React.useState(''); 
    const [category, setCategory] = React.useState(''); 

    const currentDate = new Date();
    const isoDateTime = currentDate.toISOString();
    const date = isoDateTime;

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
      };

    const handleTypeChange = (event: { target: { value: any; }; }) => {
        const selectedType = event.target.value;
        if (selectedType === 'Income' || selectedType === 'Expense') {
            setType(selectedType);
        } else {
            
            console.error('Invalid type selected:', selectedType);
        }
    };

    const handleSubmit = async () => {
        try {    
            const response = await axios.post(
                "http://localhost:3000/createexpense",
                {
                    title: title,
                    description: description,
                    amount: amount,
                    type: type,
                    category: category,
                    date: date
                },
                {
                    headers: {
                        "authorization": "Bearer " + localStorage.getItem('key')
                    }
                }
            );
    
            console.log('Response:', response.data); 
        } catch (error) {
            console.error('Error creating expense:', error);
        }
    };

    return (
            <div style={{ display:"flex",justifyContent:"start", marginLeft:10}}>
                <Card variant="outlined" style={{maxWidth: 400, marginTop: 100}}>
                    <div style={{padding: 10}}>
                        <Typography variant='h5' textAlign={"center"}>Create Expense</Typography>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="Title"
                        type="Title"
                        label="Title"
                        name="Title"
                        onChange={(e)=>{ setTitle(e.target.value)}}
                        autoComplete="current-Title"
                        autoFocus
                        
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        label="Description"
                        type="description"
                        id="description"
                        onChange={(e)=>{ setDescription(e.target.value)}}
                        autoComplete="current-description"
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="amount"
                        label="Amount"
                        type="amount"
                        onChange={(e)=>{
                            const inputValue = e.target.value;
                            const parsedAmount = inputValue !== '' ? parseFloat(inputValue) : 0; 
                            setAmount(parsedAmount); }}
                        id="amount"
                        autoComplete="current-link"
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="Category"
                        label="Category"
                        type="Category"
                        id="Category"
                        onChange={(e)=>{setCategory(e.target.value)}}
                        autoComplete="current-price"
                        />
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                            <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            onChange={handleChange}
                            label="Type"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Income"}>Income</MenuItem>
                            <MenuItem value={"Expense"}>Expense</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit} 
                        >
                        Create Expense
                        </Button>
                    </div>
                </Card>

            </div>
            
        );

}

   


export function Home(){

    return(

        <div style={{display: 'flex', justifyContent: 'space-around',  flexWrap: "wrap"}}>
            <DisplayExpenses />
            <CreateExpense />           
    </div>
        
    );
}


