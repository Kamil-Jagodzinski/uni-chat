import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import { tryLogin } from "../app/neoActions";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

export default function LoginPanel(props){

    const [logID, setLogID] = React.useState( '100000' )
    const [pass, setPass] = React.useState( '' )

    const dispatch = useDispatch();

    const sendLogin = async () =>{
        const res = await tryLogin(logID, pass)
        if (res !== null){
            console.log(res)
            dispatch(login(res.properties))
            props.setView(0)
        }
    }

    return (
    <Box    component="form" style={styles.loginPanel} 
            sx={{mt: 1, p: 0.5, display: 'flex', flexDirection: 'column',  }}>

        <Box sx={{ m: 0.5, p: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Typography variant='h5'> Logowanie </Typography>
        </Box>
        
        <Box sx={{ m: 0.5, p: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
            <TextField
            required
            id="user-uni-id"
            label="Numer indesku"
            value = {logID}
            onChange = {(e)=>setLogID(e.target.value)}
            />

            <TextField
            required
            id="user-pass"
            type="password"
            label="Hasło"
            value = {pass}
            onChange = {(e)=>setPass(e.target.value)}
            />
        </Box>

        <Box sx={{ m: 0.5, p: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Button variant = "contained" 
                    endIcon = { <LoginIcon  /> } 
                    onClick = { ()=>{ sendLogin() } }>
                    Zaloguj
            </Button>
        </Box>

      </Box>
    )
}

const styles = {
    loginPanel:{
        border: 'solid 1px blue',
        borderRadius: '15px',
    },
}