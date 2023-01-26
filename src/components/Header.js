import React from 'react'
import { Typography, makeStyles, Grid } from '@material-ui/core'

const useStyles = makeStyles({
    div: {
      marginBottom: 40
    },
    the: {
        fontSize: '5.5rem',
        color: 'white',
        ['@media (min-width:380px) and (max-width:880px)']: {  // eslint-disable-line no-useless-computed-key
           fontSize: '2.5rem'
        },
        ['@media (max-width:380px)']: {  // eslint-disable-line no-useless-computed-key
            fontSize: '1.5rem'
         }
    },
    timekeeper: {
        fontSize: '9.5rem',
        color: 'white',
        ['@media (min-width:380px) and (max-width:880px)']: {  // eslint-disable-line no-useless-computed-key
            fontSize: '4.5rem'
         },
         ['@media (max-width:380px)']: {  // eslint-disable-line no-useless-computed-key
            fontSize: '2.5rem'
         }
    }
})

const Header = () => {
    const classes = useStyles()
    return (
         <Grid container justify="center">
          <div className={classes.div}>
            <Typography align="center">
                <span className={classes.the}>The</span>
                <span className={classes.timekeeper}>TimeKeeper</span>
            </Typography> 
          </div>
         </Grid>
         
              
    )
}

export default Header