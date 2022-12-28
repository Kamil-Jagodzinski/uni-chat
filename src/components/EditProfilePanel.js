import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { tryEditAccount } from "../app/neoActions";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";

export default function EditProfilePanel(props){
    
    const user = useSelector(selectUser);

    const [userID, setUserID] = React.useState( user === null ? null : user.userid )
    const [nickname, setNickname] = React.useState( user === null ? null : user.nickname )
    const [name, setName] = React.useState( user === null ? null : user.name )
    const [surename, setSurename] = React.useState( user === null ? null : user.surename )
    const [bio, setBio] = React.useState( user === undefined ? " " : user.bio )
    const [avatar, setAvatar] = React.useState( user === undefined ? " " : user.avatar )
    const [pass, setPass] = React.useState( "" )
    const [newPass, setNewPass] = React.useState( "" )
    const [newPass2, setNewPass2] = React.useState( "" )

    const dispatch = useDispatch();
    
    const sendEditAccount = async () =>{
        var a =  avatar === undefined ? "." : avatar
        var b =  bio === undefined ? "." : bio
        const res = await tryEditAccount(user.idx, userID, nickname, name, surename, b, a, pass, newPass, newPass2)
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
            <Typography variant='h5'> Edycja </Typography>
        </Box>

        <Box sx={{ m: 0.5, p: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
            <TextField
            required
            id="user-id"
            label="Nazwa ID"
            value = {userID}
            onChange = {(e)=>setUserID(e.target.value)}
            />

            <TextField
            required
            id="user-nick"
            label="Nickname"
            value = {nickname}
            onChange = {(e)=>setNickname(e.target.value)}
            />
        </Box>

        <Box sx={{ m: 0.5, p: 0.5, display: 'flex', justifyContent: 'space-between'}} >
            <TextField
            required
            id="user-name"
            label="Imię"
            value = {name}
            onChange = {(e)=>setName(e.target.value)}
            />

            <TextField
            required
            id="user-surename"
            label="Nazwisko"
            value = {surename}
            onChange = {(e)=>setSurename(e.target.value)}
            />
        </Box>

        <Box sx={{ m: 0.5, p: 0.5, display: 'flex', justifyContent: 'space-between'}} >
            <TextField
            id="user-pass"
            type="password"
            label="Aktuale Hasło"
            value={pass}
            onChange = {(e)=>setPass(e.target.value)}
            />

            <TextField
            required
            id="pic"
            label="Avatar - link do zdjęcia"
            value={avatar}
            onChange = {(e)=>setAvatar(e.target.value)}
            />
        </Box>

        <Box sx={{ m: 0.5, p: 0.5, display: 'flex', justifyContent: 'space-between'}} >
            

            <TextField
            disabled = {pass === "" ? true : false} 
            id="user-new-pass"
            type="password"
            label="Nowe Hasło - opcjonalne"
            value={newPass}
            onChange = {(e)=>setNewPass(e.target.value)}
            />

            <TextField
            disabled = {newPass === "" ? true : false}
            id="user-new-pass2"
            type="password"
            label="Powtórz Hasło"
            value={newPass2}
            onChange = {(e)=>setNewPass2(e.target.value)}
            />
        </Box>

        <TextField  placeholder="Opis użytwnika"    multiline
                    rows={4}    fullWidth   variant="filled"
                    inputProps={{ maxLength: 300 }} value={bio}
                    onChange = {(e)=>setBio(e.target.value)}/>

        <Box sx={{ m: 0.5, p: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Button variant = "contained" 
                    endIcon = { <EditIcon  /> } 
                    onClick = { ()=>{ sendEditAccount() } }>
                    Zapisz
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