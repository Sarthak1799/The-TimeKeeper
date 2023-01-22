import { useState,useEffect } from 'react';
import { createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from "@material-ui/core/CssBaseline"
import Alert from '@material-ui/lab/Alert'
import Header from './components/Header'
import FormBox from './components/FormBox'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Timezones from './components/timezones'
import NotFound from './components/404'
import { Container,LinearProgress } from '@material-ui/core'
import zoneService from './services/timezones'
import {BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'


const theme = createMuiTheme({
  palette: {
    background: {
      default: '#311b92'
    }
  },
  typography: {
      fontFamily: 'Quicksand',
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700
  }
})

const App = () => {
   const [user,setUser] = useState(null)
   const [zones,setZones] = useState([])
   const [update,setUpdate] = useState(null)
   const [alert,setAlert] = useState(false)
   const [alertmsg,setAlertmsg] = useState('')
   const [pending, setPending] = useState(true)
   const history = useHistory()

   const handleAdd = async (zoneObj) => {
     setPending(true)
     try {
      const response = await zoneService.createZone(user,zoneObj)
      setZones(zones.concat(response))
      setUpdate(Math.floor(Math.random()*100))
     }
     catch(exception){
      setAlert(true)
      setAlertmsg(`${ exception.response.data.error}`)
      setTimeout(() => {
       setAlert(false)
       setAlertmsg('')
     },5000)
     }
   }

   const handleRemoving = async (zoneObj) => {
    const result = window.confirm('Remove Timezone?')

    if(result){
      setPending(true)
      try{
        await zoneService.removeZone(user,zoneObj)
        setUpdate(Math.floor(Math.random()*100))  
      }
      catch(exception){
        setAlert(true)
           setAlertmsg(`${ exception.response.data.error}`)
           setTimeout(() => {
            setAlert(false)
            setAlertmsg('')
          },5000)
      }
    }
  }

   useEffect(() => {
    const loggedBlogUser = window.localStorage.getItem('loggedBlogUser')
    if(loggedBlogUser){
      const user = JSON.parse(loggedBlogUser)
      setUser(user)
      zoneService.setToken(user.token)
      const uname = user.username
      history.push(`/api/users/${uname}/zones`)
    }
   },[])

   useEffect(() => {
    const ac = new AbortController();
    const get = async () => {
      if(user){
        await zoneService.getAll(user).then(zones => setZones(zones),{signal:ac.signal})
      }
    }
    get()
    setPending(false)
     return () => ac.abort()
   },[user,update])

return (
  <Router>
    <Container maxWidth="lg">
<MuiThemeProvider theme={theme}>
  <CssBaseline />
  <Header />
  <div style={{margin:30}}>
  {alert && <Alert variant="filled" severity="error">{alertmsg}</Alert>}
  {pending && <LinearProgress color='secondary' />}
  </div>
  <Switch>
    {!user && <Route exact path='/'>
    <FormBox />
     </Route>}
     {!user && <Route exact path='/api/login'>
       {!pending && <Login setPending={setPending} setUpdate={setUpdate}
         setUser={setUser} setAlert={setAlert} setAlertmsg={setAlertmsg}/>}
     </Route>}
     {!user && <Route exact path='/api/users/signup'>
         {!pending && <SignUp setPending={setPending} setUpdate={setUpdate}
         setUser={setUser} setAlert={setAlert} setAlertmsg={setAlertmsg} />}
     </Route>}
     {user && <Route exact path='/api/users/:username/zones'>
    {!pending && <Timezones setUser={setUser} zones={zones} handleAdd={handleAdd} handleRemoving={handleRemoving} />}
       </Route>}
       <Route path='*'>
         <NotFound setUser={setUser}/>
       </Route>
  </Switch>
  </MuiThemeProvider>
  </Container>
  </Router>
)
}

export default App;
