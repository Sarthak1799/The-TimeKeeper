import {Box, makeStyles, Grid, Button,ButtonGroup} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Footer from './Footer'

const useStyles = makeStyles({
    box: {
        background: "#f6defa",
        width: 600,
        height: 350,
        borderRadius: 60,
        ['@media (min-width:380px) and (max-width:880px)']: {  // eslint-disable-line no-useless-computed-key
            width: 400,
            height:250,
            borderRadius:30
         },
         ['@media (max-width:380px)']: {  // eslint-disable-line no-useless-computed-key
            width: 300,
            height:150,
            borderRadius:30
         }     
    },
    btn: {
        padding: 10,
    },
})

const FormBox = () => {
    const classes = useStyles()
    return(
        <>
        <Grid container direction="column" alignItems="center" >
          <Box className={classes.box} display="flex" alignItems='center'
          justifyContent="center" p={0}>
            
            <ButtonGroup 
        orientation="vertical"
        size="large"
        color="primary"
        aria-label="vertical outlined primary button group"
      >
        <Button component={Link} to='/api/login'>Login</Button>
        <Button component={Link} to='/api/users/signup'>Sign-up</Button>
        
      </ButtonGroup>             
           </Box> 
        </Grid>
        <Footer />
        </>
    )
}

export default FormBox