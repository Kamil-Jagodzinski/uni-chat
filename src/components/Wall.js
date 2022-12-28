import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import WallPost from './WallPost';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { tryGetContent } from "../app/neoActions";

export default function Wall() {
  
  const [content, setContent] = React.useState( null );

  
  
  return (
    <Box >
      <Box sx={{ m: 0.1, p: 0.1, display: 'flex', justifyContent: 'flex-end', }} >
        <Tooltip title="Odśwież" onClick = { async ()=>{ setContent( await tryGetContent() ) } }>
          <IconButton >
            <RefreshIcon/>
          </IconButton>
        </Tooltip>
      </Box>
      

      <Divider/>
      
      <List
        sx={{
          width: '100%',
          position: 'relative',
          overflow: 'auto',
          paddingLeft: '20px',
          paddingRight: '20px',
          maxHeight: 1000,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        
      <li >
          <ul>
          { content === null ? null:
            content.map((item, id) => (
              <ListItem key={`item-${id}`}>
                  <WallPost info={ content === null ? null : item._fields}/>
              </ListItem>
          ))}
          </ul>
      </li>
      
      </List>
    </Box>
  );
}