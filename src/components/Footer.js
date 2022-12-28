import React from "react";
import Typography from '@mui/material/Typography';


export default function Footer() {

    return <div style={styles.desc}>
        <Typography style={styles.fromTop} align='center' variant='subtitle2'> 
            Kamil Jagodziński, id: 402309
        </Typography>

        <Typography style={styles.fromTop} align='center' variant='subtitle2'> 
            Projekt wykonany w ramach projektu z przedmiotu PDwCO
        </Typography>
    </div >
}    

const styles = {
    desc:{
        width: '100%',
        height: '40px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        backgroundColor: ' #1976D2',
        justifyContent: 'space-between',
      }
}