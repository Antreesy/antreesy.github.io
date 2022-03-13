import React from "react";
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Delete from "@mui/icons-material/Delete";
import { Avatar, IconButton, Typography } from "@mui/material";

export default function NoteCard({note, handleDelete}) {
    return (
        <Card elevation={5}>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{
                            backgroundColor: () => {
                                switch (note.category[0]) {
                                    case ('w'): {return "blue";}
                                    case ('m'): {return "yellow";}
                                    case ('t'): {return "green";}
                                    case ('r'): {return "red";}
                                    default: {return "#666";}
                                }
                            }
                        }}
                    >{note.category[0].toUpperCase()}</Avatar>
                }
                action={
                    <IconButton onClick={() => handleDelete(note.id)} color="secondary">
                        <Delete />
                    </IconButton>
                }
                title={note.title}
                subheader={note.category}
            />
            <CardContent>
                <Typography
                    variant="body2"
                    color="textSecondary"
                >
                   {note.details} 
                </Typography>
            </CardContent>
        </Card>
            // 
        
    )
}