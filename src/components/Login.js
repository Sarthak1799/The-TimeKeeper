import {useState} from 'react';
import zoneService from '../services/timezones'
import {useHistory,Link} from 'react-router-dom'
import {Box, makeStyles, Grid, Button, TextField, Typography} from '@material-ui/core'
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
        width: 200,
        height:150,
        borderRadius:30
     }  
  },
  btn: {
      padding: 10,
      
  },
  field: {
    marginBottom:20,
    minWidth:150,
    marginTop:20,
    display: 'block'
  } 
})

const Login = ({setUser,setAlert,setAlertmsg,setPending,setUpdate}) => {
   const classes = useStyles()
    const [username,setUsername] = useState('')
    const  [password,setPassword] = useState('')
    const [ufielderror,setufielderror] = useState(false)
    const [pfielderror,setpfielderror] = useState(false)
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setufielderror(false)
        setpfielderror(false)
        if(username === '' || password === ''){
          setAlert(true)
          setAlertmsg('Username or Password was not provided!')
          setTimeout(() => {
            setAlert(false)
            setAlertmsg('')
          },5000)
          if(username === ''){
            setufielderror(true)
          } 
          if(password === ''){
            setpfielderror(true)
          }
          return
        } else {
          try{
            setPending(true)
            const user = await zoneService.login({ username,password })
            setUser(user)
            const uname = user.username
            window.localStorage.setItem('loggedBlogUser',JSON.stringify(user))
            zoneService.setToken(user.token)
            setUsername('')
            setPassword('')
            history.push(`/api/users/${uname}/zones`)
            setUpdate(Math.floor(Math.random()*1000))
          }
          catch(exception){
            setPending(false)
           setAlert(true)
           setAlertmsg(`${ exception.response.data.error}`)
           setTimeout(() => {
            setAlert(false)
            setAlertmsg('')
          },5000)
          }
        }
      }

  return (
    <>
    <Grid container direction="column" alignItems="center" justify="center">
     <Box className={classes.box} display="flex" alignItems="center" 
     justifyContent="center" p={25}>
     <div>
      <Typography align='center' variant='h5'>Login</Typography>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField 
        className={classes.field}
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        label='Username'
        variant='outlined'
        color='primary'
        required
        error={ufielderror}>
        </TextField>
        <TextField 
        className={classes.field}
        type='password'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        label='Password'
        variant='outlined'
        color='primary'
        required
        error={pfielderror}>
        </TextField>
        <Button type='submit' color='primary' variant='outlined'>
          Login
        </Button>
      </form>
      </div>
    </Box>
    <Button component={Link} to='/'>Back</Button> 
    </Grid>
    <Footer />
    </>
  )
}


export default Login