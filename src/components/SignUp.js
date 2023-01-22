import {useState} from 'react';
import {useHistory,Link} from 'react-router-dom'
import zoneService from '../services/timezones'
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
      marginTop:20,
      minWidth:150,
      display: 'block'
    } 
  })

const SignUp = ({ setUser,setAlert,setAlertmsg,setPending,setUpdate }) => {
    const classes = useStyles()
    const [username,setUsername] = useState('')
    const  [password,setPassword] = useState('')
    const [name, setName] = useState('')
    const [ufielderror,setufielderror] = useState(false)
    const [pfielderror,setpfielderror] = useState(false)
    const [nfielderror,setnfielderror] = useState(false)
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setufielderror(false)
        setpfielderror(false)
        setnfielderror(false)
        if(username === '' || password === '' || name === ''){
          setAlert(true)
          setAlertmsg('Complete Information was not provided!')
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
            if(name === ''){
                setnfielderror(true)
            }
            return
          } else {
            try{
               setPending(true)
                const savedUser = await zoneService.signup({ name,username,password })
                const user = await zoneService.login({ username,password })
                setUser(user)
                window.localStorage.setItem('loggedBlogUser',JSON.stringify(user))
                zoneService.setToken(user.token)
                setName('')
                setUsername('')
                setPassword('')
                history.push(`/api/users/${user.username}/zones`)
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
      <Typography align='center' variant='h5'>Sign Up!</Typography>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      <TextField 
        className={classes.field}
        value={name}
        onChange={({ target }) => setName(target.value)}
        label='Name'
        variant='outlined'
        color='primary'
        required
        error={nfielderror}>
        </TextField>
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
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        label='Password'
        variant='outlined'
        color='primary'
        required
        error={pfielderror}>
        </TextField>
        <Button type='submit' color='primary' variant='outlined'>
          Sign Up
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


export default SignUp