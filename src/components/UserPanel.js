import React from "react";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";

export default function UserPanel(props){
    
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const sendLogout = () =>{        
        dispatch(logout())
    }

    return (
        <Card style={styles.userPanel} sx={{ mb: 1}}>
            <Box sx={{ p: 0.5, display: 'flex'}}>
                <Box sx={{ mr: 2 }}>
                    <Avatar sx={{ width: 80, height: 80 }} 
                            variant="circular" 
                            src={user === null ? null : user.avatar} />
                </Box>
                
                <Stack spacing={0.5} style={{overflow: "hidden", textOverflow: "ellipsis", width: '280px'}}>
                    <Typography fontWeight={700} variant="h5"  >
                        { user === null ? 'Nie zalogowano' : user.nickname }
                    </Typography>
                    <Typography variant="body1" color="text.secondary"  >
                        { user === null ? ' ' : user.name+' '+user.surename } 
                    </Typography>
                    <Typography variant="body1" color="text.secondary" >
                        { user === null ? ' ' : user.userid} 
                    </Typography>
                </Stack>

                { user === null 
                    ?<Box sx={{ p: 0.5, display: 'flex'}}>
                        <Tooltip title="Załóż konto" onClick = { ()=>{ props.setView(1) } }>
                            <IconButton >
                                <AppRegistrationIcon/>
                            </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Zaloguj" onClick = { ()=>{ props.setView(2) } }>
                            <IconButton >
                                <LoginIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    :<Box sx={{ p: 0.5, display: 'flex'}}>
                        <Tooltip title="Edytuj">
                            <IconButton onClick = { ()=>{ props.setView(3) } }>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Wyloguj">
                            <IconButton onClick = { ()=>{ sendLogout();  props.setView(0) } }>
                                <LogoutIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>}
            </Box>
            <Divider />
            <Box sx={{ p: 2, display: 'flex' }} style={{overflow: "hidden", textOverflow: "ellipsis", height: '100px'}}>
                <Typography variant="body2" fontWeight={600}>
                {user === null ? null : user.bio}</Typography>
            </Box>
           
        </Card>
    )
}

const styles = {
    userPanel:{
        border: 'solid 4px blue',
        borderRadius: '15px',
    },
}