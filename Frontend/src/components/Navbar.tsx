import { Typography, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export function Navbar(){

    const [UserEmail, setUserEmail ] = useState(' ');
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchData(){
            const response = await axios.get('http://localhost:300/me', {
                headers:{
                    "authorization" : "Bearer " + localStorage.getItem('key')
                }
            })
            setUserEmail(response.data.email)
        }; fetchData()
    }, [])

    if(!UserEmail){
        return(
            <div style={{display: 'flex', backgroundColor:"black", color:"white" ,justifyContent: 'space-between'}}> 
                    <div style={{padding:10, color:"white", fontWeight: 'bolder'}}>
                    <Typography variant="h4" component="h2" >Expense Tracker</Typography>
                    </div>
                    <div style={{display: 'flex', padding: 10}}>
                        <div style={{padding: 10}}>
                        <Typography color={"white"} variant='h5'>Hi</Typography>
                        </div>
                        <div style={{padding: 10}}>
                            <Button variant="contained" onClick={()=> navigate('/login')}
                            > Login</Button>
                        </div> 
                    </div>
                </div>
        );

    }
    return(
        <div style={{display: 'flex', backgroundColor:"black", color:"white" ,justifyContent: 'space-between'}}> 
                <div style={{padding:10, color:"white", fontWeight: 'bolder'}}>
                <Typography variant="h4" component="h2" >Expense Tracker</Typography>
                </div>
                <div style={{display: 'flex', padding: 10}}>
                    <div style={{padding: 10}}>
                    <Typography color={"white"} variant='h5'>{UserEmail}</Typography>
                    </div>
                    <div style={{padding: 10}}>
                        <Button variant="contained" onClick={()=> {localStorage.setItem("key", " ")}}
                        > Logout</Button>
                    </div> 
                </div>
            </div>
    );
}