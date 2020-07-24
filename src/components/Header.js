import React from 'react';
import { 
    AppBar, 
    Toolbar, 
    IconButton, 
    Typography,
    makeStyles
  } from '@material-ui/core';

import AcUnitIcon from '@material-ui/icons/AcUnit';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100vw'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}))

const Header = () => {
    const classes = useStyles()
    return(
        <AppBar position="static" >
            <Toolbar>
            <IconButton edge="start" className={classes.menuButton}>
                <AcUnitIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                News
            </Typography>
            <IconButton edge="start" className={classes.menuButton}>
                <AcUnitIcon />
            </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header;