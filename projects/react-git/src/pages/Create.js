import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useHistory } from 'react-router-dom';


export default function Create() {
  const history = useHistory();
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    // eslint-disable-next-line eqeqeq
    if (title == '') {
      setTitleError(true)
    }
    // eslint-disable-next-line eqeqeq
    if (details == '') {
      setDetailsError(true)
    }

    if (title && details) {
      fetch('https://my-json-server.typicode.com/antreesy/db/notes', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({title, details, category})
      }).then(() => history.push('/'))
    }
  }
  const [category, setCategory] = useState('todos')

  return (
    <Box sx={{
      marginTop: 3,
      marginBottom: 3,
      padding: 3,
      backgroundColor: "#fff",
    }}>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        color="textSecondary"
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e)=> setTitle(e.target.value)}
          label="Note Title"
          variant="outlined"
          color='secondary'
          fullWidth
          required
          error={titleError}
          sx={{marginBottom: 2}}
        />

        <TextField
          onChange={(e)=> setDetails(e.target.value)}
          label="Details"
          variant="outlined"
          color='secondary'
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
          sx={{marginBottom: 2}}
        />

      <FormControl sx={{display: "flex", marginBottom: 2}}>
        <FormLabel>Note Category</FormLabel>
        <RadioGroup 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{display: "flex", flexDirection: "row"}}
        >
          <FormControlLabel
            value="money" 
            label="Money"
            control={<Radio />}
          />

          <FormControlLabel
            value="todos" 
            label="Todos"
            control={<Radio />}
          />

          <FormControlLabel
            value="reminders" 
            label="Reminders"
            control={<Radio />}
          />

          <FormControlLabel
            value="work" 
            label="Work"
            control={<Radio />}
          />

        </RadioGroup>
      </FormControl>

        <Button
          type='submit'
          color = "secondary"
          variant = "contained"
          children = "submit"
          endIcon = {<KeyboardArrowRightIcon/>}
        />
      </form>

    </Box>
  )
}
