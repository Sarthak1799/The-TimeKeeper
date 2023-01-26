import {useState} from 'react';
import {makeStyles, Button, TextField, IconButton} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete'
import zonelist from '../services/zonelist'

const useStyles = makeStyles({
    inputRoot:{
        color: '#fa1b92'
    },
    btn: {
        maxWidth: 1
    }
})

const ZoneForm = ({ handleAdd }) => {
    const classes = useStyles()
    const [timezone,setTimezone] = useState('')
    const [inputtimezone,setInputTimezone] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(false)
        if(timezone === '' || inputtimezone === ''){
            setError(true)
            return
        } else {
            handleAdd({
                timezone
              })
              setTimezone('')
              setInputTimezone('')
        }
    }

    const Search = () => (
        <IconButton type='submit'>
        <SearchIcon />
       </IconButton>
    )
        
    

    return (
        <div>
            <form style={{display:'flex'}} noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Autocomplete
      id="combo-box-demo"
      value={timezone}  
    onChange={(e,newValue) => setTimezone(newValue)}
     inputValue={inputtimezone}
     onInputChange={(e,newInputValue) => setInputTimezone(newInputValue)}
     classes={{inputRoot: classes.inputRoot}}
      options={zonelist.TimeZones}
      getOptionSelected={(option,value) => option.value === value.value}
      style={{ width: 1200 }}
      renderInput={(params) => 
      <TextField {...params} InputLabelProps={{style: { color: '#fff' }}} 
      label='Add TimeZone' variant="filled"  error={error}  />}
    />
    <Button type='submit' startIcon={<AddIcon style={{fontSize:30}} />} variant='contained'></Button>

            </form>
        </div>
    )
}

export default ZoneForm

