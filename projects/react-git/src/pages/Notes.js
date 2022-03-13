import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import NoteCard from '../components/NoteCard'

export default function Notes() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch('https://my-json-server.typicode.com/antreesy/db/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])

  const handleDelete = async (id) => {
    await fetch('https://my-json-server.typicode.com/antreesy/db/notes/'+id, {
      method: 'DELETE'
    })

    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
  }

  return (
    <Grid
      container
      spacing={3}
      sx={{
        paddingTop: 3,
        paddingBottom: 3,
      }}
    >
      {notes.map(note => (
        <Grid item xs={12} sm={6} md={3} key={note.id}>
          <NoteCard note={note} handleDelete={handleDelete} />
        </Grid>
      ))}
    </Grid>
  )
}
