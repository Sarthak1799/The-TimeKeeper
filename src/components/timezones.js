import { useHistory } from 'react-router-dom'
import {Button,Grid} from '@material-ui/core'
import Timezone from './Timezone'
import ZoneForm from './ZoneForm'

const Timezones = ({ setUser, zones ,handleAdd, handleRemoving}) => {
    const history = useHistory()

    const logout = async () => {
        window.localStorage.removeItem('loggedBlogUser')
        setUser(null)
        history.push('/')
    }
    return (
        <>
        
        <div style={{marginBottom:15}}>
        <Grid container justify="center">
        <Button variant='contained' color='secondary' onClick={logout}>Logout</Button>
        </Grid>
        </div>
        <div style={{margin:25}}>
        <div style={{margin:25}}>
        <ZoneForm handleAdd={handleAdd} />
        </div>
        
        <Grid container direction="column" alignItems="center" justify="center">
        {zones.map(zone => <Timezone key={zone.id} zone={zone} handleRemoving={handleRemoving} />)}
        </Grid>
        </div>
        </>
    )
}

export default Timezones