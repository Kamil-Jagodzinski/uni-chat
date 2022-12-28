import React from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { trySend } from "../app/neoActions";


export default function UserPost(props){

    const [content, setContent] = React.useState( '' )
    const user = useSelector(selectUser);

    const sendPost = async () =>{
        const res = await trySend( user.idx, content, props.replyTo)
        
        if (res !== null){
            setContent(" ")
        }
    }

    return (
        <Card style={styles.userPost}>
            <Box sx={{ p: 0.5, display: 'flex'}}>
                <TextField  placeholder="Co słychać?"   multiline
                            rows={3}    fullWidth   variant="filled"
                            inputProps={{ maxLength: 300 }} value={content}
                            onChange = {(e)=>setContent(e.target.value)}/>

            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Avatar sx={{ width: 40, height: 40, m: 0.5, ml: 2}} 
                        variant="circular" 
                        src={user === null ? null : user.avatar}/>


                <Tooltip title="Wyślij" sx={{ width: 40, height: 40, m: 0.5, mr: 2}}>
                <IconButton onClick = { ()=>{ sendPost() } }>
                        <SendIcon/>
                    </IconButton>
                </Tooltip>
            </Box>           
        </Card>
    )
}

const styles = {
    userPost:{
        border: 'solid 1px blue',
        borderRadius: '15px',
    },
}