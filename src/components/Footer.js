import { Typography,Grid } from '@material-ui/core/'

const Footer = () => {
    
    return (
        <>
        <Grid container justify="center">
        <div style={{position:'relative', bottom:0}}>
        
        <Typography variant='subtitle1' color='secondary'><span>&copy;</span> Sarthak Soni</Typography>
        </div>
        </Grid>
        </>
    )
}

export default Footer