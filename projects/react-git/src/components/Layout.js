import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'

import PersonIcon from '@mui/icons-material/Person';
import SubjectOutlined from '@mui/icons-material/SubjectOutlined'
import AddCircle from '@mui/icons-material/AddCircle'
import BugReportIcon from '@mui/icons-material/BugReport';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

const drawerWidth = 182
// const appbarWidth = `calc(100% - ${drawerWidth})px`

export default function Layout({children}) {
    const history = useHistory()
    const location = useLocation()
    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color="secondary" />,
            path: '/'
        },
        {
            text: 'Create Notes',
            icon: <AddCircle color="secondary" />,
            path: '/create'
        },
        // {
        //     text: 'Test Page',
        //     icon: <BugReportIcon color="secondary" />,
        //     path: '/test'
        // },
        {
            text: 'Tic Tac Toe',
            icon: <VideogameAssetIcon color="secondary" />,
            path: '/tictac'
        },
    ]

    return (
        <Box sx={{
            display: "flex"
        }}>
            {/* app bar */}
            <AppBar
                elevation={0}
                sx={{
                    paddingLeft: `${drawerWidth}px`
                }}
            >
                <Toolbar>
                    <Typography sx={{flexGrow: 1}}>
                        TODO List
                    </Typography>
                    <Typography sx={{marginRight: 1}}>
                        Antreesy
                    </Typography>
                    <Avatar
                        children={<PersonIcon/>}
                    />
                </Toolbar>
            </AppBar>

            {/* side drawer */}
            <Drawer
                className={"drawer"}
                variant="permanent"
                anchor="left"
                sx={{
                    width: drawerWidth
                }}    
            >
                <Typography variant="h5" sx={{padding: 2}}>
                Some notes
                </Typography>

                <List>
                    {menuItems.map(item => {
                        const linkColor = (location.pathname === item.path) ? '#ce93d8' : "transparent"
                        
                        return (

                        <ListItem
                            button
                            onClick={() => history.push(item.path)}
                            key={item.text}
                            sx={{
                                backgroundColor: linkColor
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    )})}
                </List>
            </Drawer>

            {/* main content */}
            <Container className={"page"} sx={{
                paddingLeft: {drawerWidth}+"px",
                paddingTop: "64px",
                width: "100%",
                }}>
            {children}
            </Container>
        </Box>   
    )
}