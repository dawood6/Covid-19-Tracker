import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CountUp from 'react-countup';

const useStyles = makeStyles({
    root: {
        color: "white",
        width: 200,
        height: 200
    }, title: {
        fontSize: 17
    },
    value: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '15vh'
    }
});

export default function Cards(props) {
    const classes = useStyles();
    const backgroundColors = [
        "dodgerblue",
        "#03AC13",
        "red"
    ]
    const cardsArr = [
        props.confirmedValue,
        props.recoveredValue,
        props.deathValue
    ]
    const mainHead = [
        "Confirmed",
        "Recovered",
        "Deaths"
    ]

    return cardsArr.map((item, index) => (
        <Card key={index} className={classes.root} style={{ backgroundColor: backgroundColors[index] }} variant="outlined">
            <CardContent  >
                <Typography
                    className={classes.title}
                    color="white"
                    gutterBottom
                >
                    {mainHead[index]} Cases In <br /> {props.name}
                </Typography>
                <Typography variant="h5" component="h2" className={classes.value}>
                    <CountUp end={item} duration={3} />
                </Typography>

            </CardContent>
        </Card>
    ))
}
