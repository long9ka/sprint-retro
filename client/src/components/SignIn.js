import { useState, useContext } from 'react';
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { EventNote } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import login from '../utils/login';
import { withRouter } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import loaduser from '../utils/loaduser';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
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


// init state
const initUserState = {
  username: "",
  password: "",
};
const initAlertState = {
  visible: false,
  serverity: "",
  msg: "",
};

const SignIn = (props) => {
  const [user, setUser] = useState(initUserState);
  const [alert, setAlert] = useState(initAlertState);
  const [abc, setAbc] = useState("....dsdsd/...");
  const { userContext, setUserContext } = useContext(UserContext);


  const classes = useStyles();

  const handleSignIn = (e) => {
    e.preventDefault();
    (async () => {
      const { status, msg } = await login(user);
      if (status) {
        const { success, user, token } = await loaduser();
        console.log(status);
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
    setUser({ ...user, username: e.target.value });
    setAlert(initAlertState);
  }

  const handlePasswordChange = (e) => {
    setUser({ ...user, password: e.target.value });
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
          Sprint retro
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignIn}>
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
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
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

export default withRouter(SignIn);