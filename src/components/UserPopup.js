import React from "react";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';


export default function UserPopup(props){
    return (
        <Card sx={{ mb: 1}} style={styles.userPopup}>
            <Box sx={{ p: 0.5, display: 'flex'}}>
                <Box sx={{ mr: 2 }}>
                    <Avatar sx={{ width: 80, height: 80 }} 
                            variant="circular" 
                            src= {props.info === null ? null : props.info[2]} />

                </Box>
                
                <Stack spacing={0.5} style={{overflow: "hidden", textOverflow: "ellipsis", width: '320px'}}>
                    <Typography fontWeight={700} variant="h5"  >
                        {props.info === null ? null : props.info[0]}</Typography>
                    <Typography variant="body1" color="text.secondary"  >
                        {props.info === null ? null : props.info[1]} </Typography>
                </Stack>

            </Box>
            <Divider />
            <Box sx={{ p: 2, display: 'flex' }} style={{overflow: "hidden", textOverflow: "ellipsis", height: '100px'}}>
                <Typography variant="body2" fontWeight={600}>
                    {props.info === null ? null : props.info[3]}</Typography>
            </Box>
           
        </Card>
    )
}

const styles = {
    userPopup:{
        border: 'solid 2px blue',
        borderRadius: '15px',
    },
}

