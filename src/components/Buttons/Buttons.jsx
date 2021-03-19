import { useEffect } from "react";
import { fromEvent } from 'rxjs';
import { bufferTime, filter } from 'rxjs/operators';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Buttons = ({ isActive, start, pause, reset }) => {
  const classes = useStyles();

  useEffect(() => {
    const btnEl = document.getElementById("click");

    const click$ = fromEvent(btnEl, "click")
      .pipe(
        bufferTime(300),
        filter((clicks) => clicks.length === 2)
      )
      .subscribe(() => pause());
    return () => click$.unsubscribe();
  }, [pause]);

  const stopTimer = () => {
    pause();
    reset();
  };
     
    return (
        <div className={classes.root}>
        <Button variant="contained" color="primary"
          onClick={isActive ? stopTimer : start}
        >
          {isActive ? `STOP` : `START`}
        </Button>

        <Button variant="contained" color="primary"
          id="click" disabled={!isActive}>
          Wait
        </Button>

        <Button variant="contained" color="primary"
          onClick={reset}
          disabled={!isActive}
        >
          Reset
        </Button>
      </div>
    )
}

export default Buttons
