import React, { useContext, useState } from "react";
import UserContext from '../contexts/UserContext';
import AppBarCustomer from './AppBarCustomer';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Modal from '@material-ui/core/Modal';
import { withRouter } from 'react-router-dom';
import * as bcryptjs from 'bcryptjs';
import Alert from '@material-ui/lab/Alert';
import updateprofile from '../utils/updateprofile';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }, 
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#97CEFA',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initAlertState = {
  visible: false,
  serverity: "",
  msg: "",
};

const Profile = (props) => {
  const { userContext, setUserContext } = useContext(UserContext);
  const [alert, setAlert] = useState(initAlertState);
  const classes = useStyles();

  const [fullname, setFullname] = useState(userContext.user.fullname);
  const [password, setPassword] = useState();
  const [cpassword, setCPassword] = useState("");

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setAlert(initAlertState);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmPassword = (e) => {
    e.preventDefault();
    // compare password
    (async () => {
      const isMatch = await bcryptjs.compare(cpassword, userContext.user.password);
      if (isMatch) {
        const { success, body } = await updateprofile(fullname, !password? cpassword: password, userContext.token);
        if (success) {
          setUserContext({
            ...userContext,
            user: body,
          });
          props.history.go(0);
        }
      } else {
        setAlert({
          ...alert,
          visible: true,
          serverity: "error",
          msg: "Password don't match",
        });
      }
      handleClose();
    })();
  }

  const handleChangeFullname = (e) => {
    setFullname(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }
  
  const handleConfirmPasswordChange = (e) => {
    setCPassword(e.target.value);
  }

  const body = (
    <div style={modalStyle} className={classes.modal}>
      <h2 id="simple-modal-title">Confirm Password</h2>
      <form noValidate onSubmit={handleConfirmPassword}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          autoFocus
          name="conf-password"
          label="Curent password"
          type="password"
          id="conf-password"
          autoComplete="current-password"
          onChange={handleConfirmPasswordChange}
        />
      </form>
    </div>
  );

  return (
    <AppBarCustomer>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            My profile
        </Typography>
          <form className={classes.form} noValidate onSubmit={handleOpen}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              defaultValue={userContext.user.fullname}
              id="full_name"
              label="Full name"
              name="full_name"
              autoComplete="full_name"
              autoFocus
              onChange={handleChangeFullname}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              defaultValue={userContext.user.username}
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              disabled
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
              onChange={handleChangePassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update
          </Button>
          </form>
        </div>
        <br />
        { alert.visible ?
          <Alert variant="filled" severity={alert.serverity}>
            Alert: {alert.msg}
          </Alert>
          : ""
        }
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </Container>
    </AppBarCustomer>
  );
}

export default withRouter(Profile);