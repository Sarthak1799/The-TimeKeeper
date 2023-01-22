import {Box, makeStyles, Grid, Button,Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import {useState} from 'react'
const { DateTime } = require("luxon")

const useStyles = makeStyles({
    box: {
        background: "#2a2b2b",
        width: 600,
        height: 250,
        borderRadius: 30,
        margin: 15,
        borderColor: '#faeb1b',
        transition: 'background 0.5s',
        '&:hover': {
            background: '#23033d',
        },
        ['@media (min-width:380px) and (max-width:880px)']: {  // eslint-disable-line no-useless-computed-key
            width: 400,
            height:250,
         },
         ['@media (max-width:380px)']: {  // eslint-disable-line no-useless-computed-key
            width: 200,
            height:150,
         }  
        
    },
    text: {
        color: '#dfbce3',
        ['@media (min-width:380px) and (max-width:880px)']: {  // eslint-disable-line no-useless-computed-key
            fontSize: '2.5rem'
         },
         ['@media (max-width:380px)']: {  // eslint-disable-line no-useless-computed-key
            fontSize: '1.2rem'
         }  
    }
})

const Timezone = ({ zone,handleRemoving }) => {
    const classes = useStyles()
    const [time,setTime] = useState('')
    const [date,setDate] = useState('')
    const tzone = zone.timezone

    const tick = () => {
        setTime(DateTime.local().setZone(zone.timezone).toString().substring(11,19))
        let dt = DateTime.local().setZone(zone.timezone).toFormat('DD')
        setDate(dt.toString())
    } 

        setInterval(tick,1000)
    

    return (
        <div>
            <Box className={classes.box}  border={1} 
              p={3}>
                  <Grid container justify='space-between'>
                  <Typography className={classes.text} variant='h5' align='left'>{tzone} </Typography>
                <Typography className={classes.text} variant='h5' align='right'>{date} </Typography>
                  </Grid>
                  <Typography className={classes.text} variant='h1' align='center'>{time} </Typography>
                 
                  <Grid container justify='center'>
       <Button color='secondary' startIcon={<DeleteIcon />} align='center' 
       variant='outlined' onClick={() => handleRemoving(zone)}>Delete</Button>
       </Grid>
       </Box>
        </div>
    )
}

export default Timezone