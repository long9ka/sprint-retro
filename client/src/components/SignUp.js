import { useState, useContext } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  Container,
  Grid,
  TextField,
  Typography,
  makeStyles,

} from '@material-ui/core';
import {
  ArrowBack,
  EventNote,
} from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import loaduser from '../utils/loaduser';
import register from '../utils/register';
import UserContext from '../contexts/UserContext';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initNewUserState = {
  username: "",
  password: "",
  fullname: "",
};
const initAlertState = {
  visible: false,
  serverity: "",
  msg: "",
};

const SignUp = (props) => {
  const [newUser, setNewUser] = useState(initNewUserState);
  const [alert, setAlert] = useState(initAlertState);
  const {userContext, setUserContext} = useContext(UserContext);
  const classes = useStyles();

  const handleSignUp = (e) => {
    e.preventDefault();
    (async () => {
      const { status, msg } = await register(newUser);
      if (status) {
        const { success, user, token } = await loaduser();
        if (success) {
          setUserContext({
            ...userContext,
            isAuthenticated: success,
            user,
            token
          });
          props.history.replace("/");
        }
      } else {
        setAlert({
          ...alert,
          visible: true,
          serverity: "error",
          msg
        });
      }
    })();
  }

  const handleUsernameChange = (e) => {
    setNewUser({ ...newUser, username: e.target.value });
    setAlert(initAlertState);
  }

  const handlePasswordChange = (e) => {
    setNewUser({ ...newUser, password: e.target.value });
    setAlert(initAlertState);
  }

  const handleFullnameChange = (e) => {
    setNewUser({ ...newUser, fullname: e.target.value });
    setAlert(initAlertState);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EventNote />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignUp}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="full_name"
            label="Full name"
            name="full_name"
            autoComplete="full_name"
            autoFocus
            onChange={handleFullnameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleUsernameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Button variant="text" onClick={props.history.goBack}>
                <Avatar className={classes.avatar}>
                  <ArrowBack />
                </Avatar>
                Go back
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <br />
      { alert.visible ?
        <Alert variant="filled" severity={alert.serverity}>
          Alert: {alert.msg}
        </Alert>
        : ""
      }
    </Container>
  );
}

export default withRouter(SignUp);