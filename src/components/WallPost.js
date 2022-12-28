import React from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import UserPopup from './UserPopup';


export default function WallPost(props){
    
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);

    return (
        <Card style={styles.wallPost}>
            <Box sx={{ p: 0.5, display: 'flex'}}>
                <Typography variant="body1" sx={{p: 1}} >
                    {props.info === undefined ? null : props.info[4]}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box    sx={{ display: 'flex', p: 0.2}} 
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}>
                        
                    <Avatar sx={{ width: 40, height: 40, ml: 2, mr: 2}} 
                            variant="circular" 
                            src={props.info === undefined ? null : props.info[2]} />

                    <Stack >
                        <Typography fontWeight={700} variant="body1"  >
                            {props.info === undefined ? null : props.info[0]} </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            {props.info === undefined ? null : props.info[1]} </Typography>
                    </Stack>
                </Box>

                <Popover    id="mouse-over-popover" sx={{ pointerEvents: 'none'}}
                            open={open} anchorEl={anchorEl} style={styles.userPopup}
                            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                            transformOrigin={{vertical: 'top', horizontal: 'left'}}
                            onClose={handlePopoverClose} disableRestoreFocus>
                    <UserPopup info={props.info === undefined ? null : props.info}/>
                </Popover>
            
                <Box sx={{ pl: 0.2, pr: 0.2, mr: 0.2, width: 2/5}}>
                    <Typography variant="body2"  >
                        {props.info === undefined ? null :props.info[5]}</Typography>
                </Box>
            </Box>           
        </Card>
    )
}

const styles = {
    wallPost:{
        border: 'solid 1px blue',
        borderRadius: '15px',
        width: '100%',
    }
}
