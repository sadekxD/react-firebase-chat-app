import React, { useEffect, useRef } from 'react';
import SimpleCard from './Card'
import * as VanillaTilt from 'vanilla-tilt';
import { 
    makeStyles,
    Grid,
    Paper,
 } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
    paper: {
        // margin: theme.spacing(1),
        width: '100%',
        height: theme.spacing(14),
        boxShadow: 1,
        backgroundColor: '#212121'
    },
    paper1: {
        width: '100%',
        height: theme.spacing(40),
        boxShadow: 1,
        backgroundColor: '#212121',
    },
    paper2: {
        width: '100%',
        height: theme.spacing(18),
        boxShadow: 1,
        backgroundColor: '#212121',
    },
    paper3: {
        width: '100%',
        height: theme.spacing(10),
        boxShadow: 1,
        backgroundColor: '#212121',
    }
}))

const Content = () => {
    const node = useRef(null);
    const node2 = useRef(null);
    useEffect(() => {
        VanillaTilt.init(node.current.childNodes, {
            max: 2,
            speed: 400,
            glare: true,
            reverse: true,
            'max-glare': 0.2,
            scale: 1.05,
        });
    })
    const onclick = (e) => {
        node.current.onclick =()=> name();
        console.log(e.pageX, e.pageY);
    }

    const name =()=>{
        console.log(node)
    }

    const classes = useStyles();
    
    return(
        <>
        <Grid container ref={node}  spacing={4} style={{margin: 0, width: '100%'}}>
            <Grid item lg={3} sm={6} xs={12}>
                <Paper onClick={onclick} square className={classes.paper} />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <Paper square className={classes.paper} />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <Paper square className={classes.paper} />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <Paper square className={classes.paper} />
            </Grid>
        </Grid>
        <Grid container ref={node2} spacing={4} style={{margin: 0, width: '100%'}}>
            <Grid item md={4} sm={12} xs={12}>
                <Paper square className={classes.paper1} />
            </Grid>
            <Grid item container md={8} sm={12} xs={12} spacing={2}>
                <Grid item md={4} sm={12} xs={12}>
                    {/* <Paper square className={classes.paper} /> */}
                    <SimpleCard />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                    {/* <Paper square className={classes.paper} /> */}
                    <SimpleCard />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                    {/* <Paper square className={classes.paper} /> */}
                    <SimpleCard />
                </Grid>
            </Grid>
            <Grid item md={6} sm={4} xs={12}>
                <Paper square className={classes.paper2} />
            </Grid>
            <Grid item md={6} sm={4} xs={12}>
                <Paper square className={classes.paper2} />
            </Grid>
            <Grid item md={12} sm={4} xs={12}>
                <Paper square className={classes.paper2} />
            </Grid>
        </Grid>
        </>
    )
}

export default Content;