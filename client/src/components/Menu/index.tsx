import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import './style.css'
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.primary,
        },
        pos: {
            marginBottom: 12,
        },
        h1: {
            fontSize: "2rem",
            marginBottom: 12,
        },
        h2: {
            fontSize: "5rem",
            marginBottom: 12,
        },
        button: {
            width: "1000px",
            height: "100%",
            left: 0

        }
    }),
);

export default function Menu() {
    const classes = useStyles();
    const [spacing, setSpacing] = React.useState<GridSpacing>(5);

    return (
        <div className="MenuPage">

            <Grid className="MenuPage" container spacing={spacing} direction="column" alignItems="center" justify="center" >

                <h1>Menu</h1>
                <Grid className="abc2" item xs={10} sm={6}>
                    <Button className={classes.button} color="secondary" variant="contained" component={Link} to="/chat/Programming">
                        <Typography className={classes.h1} component="h1">
                            Programming
                        </Typography>
                    </Button>
                    <div>
                        &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                    </div>
                    <Button className={classes.button} color="primary" variant="contained" component={Link}  to="/chat/Math">
                        <Typography className={classes.h1} component="h1">
                            Math
                        </Typography>
                    </Button>
                    <div>
                        &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                    </div>
                    <Button className={classes.button} color="secondary" variant="contained" component={Link} to="/chat/Technology">
                        <Typography className={classes.h1} component="h1">
                            Technology
                        </Typography>
                    </Button>
                </Grid>
                <Grid className="abc2" item xs={10} sm={5}>
                    <Button className={classes.button} color="primary" variant="contained" component={Link}  to="/chat/Physics">
                        <span></span>
                        <Typography className={classes.h1} component="h1">
                            Physics
                        </Typography>
                    </Button>
                    <div>
                        &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                    </div>
                    <Button className={classes.button} color="primary" variant="contained" component={Link} to="/chat/Lounge">
                        <Typography className={classes.h1} component="h1">
                            Lounge
                        </Typography>
                    </Button>

                </Grid>

            </Grid >
        </div>
    )
}