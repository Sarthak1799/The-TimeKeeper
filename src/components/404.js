import {Typography,Grid} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'

const NotFound = ({setUser}) => {
    const history = useHistory()
    const Notfoundfunc = async () => {
        window.localStorage.removeItem('loggedBlogUser')
        setUser(null)
        history.push('/')   
    }
    return (
        <div>
        <Grid container alignItems='center' justify="center" direction='column'>
        <Typography variant='h1'>Not Found! :(</Typography>
        <div style={{margin:40}}>
        <Typography variant='h3'>Wandered too far off eh?</Typography>
        </div>
         <Link style={{color:'white',fontSize:'30px'}} onClick={Notfoundfunc} >Take me back!</Link>
        </Grid>
        </div>
    )
}

export default NotFound