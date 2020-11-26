import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <CircularProgress />
      <p>Loading ...</p>
    </div>
  );
}

export default Loading;