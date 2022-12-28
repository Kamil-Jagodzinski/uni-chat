import React from 'react';
import AppBar  from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/system/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import UserPanel from './components/UserPanel';
import Wall from './components/Wall';
import Footer from './components/Footer';
import UserPost from './components/UserPost';
import RegisterPanel from './components/RegisterPanel';
import LoginPanel from './components/LoginPanel';
import EditProfilePanel from './components/EditProfilePanel';
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

export default function App() {
  const [appState, setAppState] = React.useState( 0 )
  const user = useSelector(selectUser);
  
  return (
    <div style={styles.app}>
      <CssBaseline />
      <AppBar style = {styles.header} position='relative'>
        <Toolbar>
          <Typography variant='h2'> Uni chat </Typography>
        </Toolbar>
      </AppBar>


      <Container maxWidth='xl' sx={{p: 0.5, gap: 2, display: 'flex'}}>
        <Box sx={{ height: 1000 , spacing: 2}}>
          <UserPanel setView={setAppState}/>
          { user ===  null ? null : <UserPost /> }
          { appState === 0 ?  ""  :
            appState === 1 ?  <RegisterPanel setView={setAppState}/> :
            appState === 2 ?  <LoginPanel setView={setAppState}/>:
                              <EditProfilePanel setView={setAppState}/>}
        </Box>

        <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 5 }}/>

        <Wall/>

      </Container>

      <Footer/>
    </div>
  );
}

const styles = {
  app:{
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  header: {
    padding: '10px',
    marginBottom: '50px',
  }
}