import { Typography, Button } from "@mui/material";

export function Navbar(){

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
                        <Button variant="contained"
                        > Logout</Button>
                    </div> 
                </div>
            </div>
    );
}