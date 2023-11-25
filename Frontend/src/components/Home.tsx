import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';


function DisplayExpenses(){
    return(
        <div>
                
        <Card sx={{maxWidth: 400, marginTop:20, minWidth: 400 ,minHeight: 100}}>
            <div style={{display: "flex", justifyContent:" center"}}>
                <Typography style={{color: "Black",fontWeight:"bold", fontSize: 20}}>Your Balance:</Typography>
                <div style={{paddingLeft: 5}}>
                <Typography style={{color: "Black",fontWeight:"bold" ,fontSize: 20}}>$600</Typography>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "space-around", margin:20}}>
            <div>
                <Typography style={{color: 'Green', fontSize: 20}}>Income</Typography>
                <Typography style={{color: 'Green', fontSize: 20}}>$600</Typography>
            </div>
            <div>
                <Typography style={{color: 'red', fontSize: 20}}>Expense</Typography>
                <Typography style={{color: 'red', fontSize: 20}}>$600</Typography>
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



    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <Card sx={{ minWidth: 275, maxWidth: 500, marginTop: 5}}>
        <CardContent>
            <Typography sx={{ fontSize: 20, fontWeight:"bold" }} color="black" >
            Create Expense
            </Typography>
            <div>
                <div >
                    <div style={{ margin: 10}}>
                        <TextField label="Title" id="outlined-size-small"size="small" />
                    </div>
                    <div style={{ margin: 10}}>
                        <TextField label="Description" id="outlined-size-normal" size="small" />
                    </div>
                    <div style={{ margin: 10}}>
                        <TextField label="Category" id="outlined-size-normal" size="small" />
                    </div>
                    <div style={{ margin: 10}}>
                        <FormControl sx={{minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Type</InputLabel>
                        <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="Type"
                    >
                        <MenuItem value='Income'>Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                        </Select>
                        </FormControl>
                    </div>
                    <div style={{ margin: 10}}>
                        <TextField label="Amount" id="outlined-size-normal" size="small" />
                    </div>
                    <div style={{ margin: 10}}>
                        <input type="datetime-local" value="+010000-01-01T05:00" />
                    </div>
                </div>
            </div>
            </CardContent>
            <CardActions>
            <Button style={{marginLeft: 80}} variant="contained">Create</Button>
            </CardActions>
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

function useState(title: any): [any, any] {
    throw new Error('Function not implemented.');
}
