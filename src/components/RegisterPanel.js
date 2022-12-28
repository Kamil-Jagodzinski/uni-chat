import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { tryCreateAccount } from "../app/neoActions";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

export default function RegisterPanel(props){
    
    const [userID, setUserID] = React.useState( '' )
    const [nickname, setNickname] = React.useState( '' )
    const [name, setName] = React.useState( '' )
    const [surename, setSurename] = React.useState( '' )
    const [logID, setLogID] = React.useState( '' )
    const [email, setEmail] = React.useState( 'email@agh.edu.pl' )
    const [bio, setBio] = React.useState( '' )
    const [pass, setPass] = React.useState( '' )
    const [pass2, setPass2] = React.useState( '' )

    const dispatch = useDispatch();

    const sendCreateAccount = async () =>{
        const res = await tryCreateAccount(userID, nickname, name, surename, logID, email, bio, pass, pass2)
        if (res !== null){
            console.log(res)
            dispatch(login(res.properties))
            props.setView(0)
        }
    }
    
    return (
    <Box    component="form" style={styles.registerPanel} 
            sx={{mt: 1, p: 0.5, display: 'flex', flexDirection: 'column'}}>
        
        <Box sx={{ m: 0.5, p: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Typography variant='h5'> Rejstracja </Typography>
        </Box>

        <Box sx={{ m: 0.5, p: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
            <TextField
            required
            id="userid"
            label="Nazwa ID"
            value = {userID}
            onChange = {(e)=>setUserID(e.target.value)}
            />

            <TextField
            required
            id="nickname"
            label="Nickname"
            value = {nickname}
            onChange = {(e)=>setNickname(e.target.value)}
            />
        </Box>

        <Box sx={{ m: 0.5, p: 0.5, display: 'flex', justifyContent: 'space-between'}} >
            <TextField
            required
            id="name"
            label="Imię"
            value = {name}
            onChange = {(e)=>setName(e.target.value)}
            />

            <TextField
            required
            id="surename"
            label="Nazwisko"
            value = {surename}
            onChange = {(e)=>setSurename(e.target.value)}
            />
        </Box>

        <Box sx={{ m: 0.5, p: 0.5, display: 'flex', justifyContent: 'space-between'}} >
            <TextField
            required
            id="idx"
            label="Numer indesku"
            value = {logID}
            onChange = {(e)=>setLogID(e.target.value)}
            />

            <TextField
            required
            id="email"
            label="Email w domenie AGH"
            value={email}
            onChange = {(e)=>setEmail(e.target.value)}
            />
        </Box>

        <Box sx={{ m: 0.5, p: 0.5, display: 'flex', justifyContent: 'space-between'}} >
            <TextField
            required
            id="pass"
            type="password"
            label="Hasło"
            value={pass}
            onChange = {(e)=>setPass(e.target.value)}
            />

            <TextField
            required
            id="pass2"
            type="password"
            label="Powtórz Hasło"
            value={pass2}
            onChange = {(e)=>setPass2(e.target.value)}
            />
        </Box>

        <TextField  placeholder="Opis użytwnika"    multiline
                    rows={3}    fullWidth   variant="filled"
                    inputProps={{ maxLength: 300 }} value={bio}
                    onChange = {(e)=>setBio(e.target.value)}/>

        <Box sx={{ m: 0.5, p: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Button variant = "contained" 
                    endIcon = { <AppRegistrationIcon  /> } 
                    onClick = { ()=>{ sendCreateAccount() } }>
                    Utwórz konto
            </Button>
        </Box>
      </Box>
    )
}

const styles = {
    registerPanel:{
        border: 'solid 1px blue',
        borderRadius: '15px',
    },
}