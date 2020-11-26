import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../contexts/UserContext';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import EventNote from '@material-ui/icons/EventNote';
import { withRouter } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import createboard from '../utils/createboard';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  child: {
    marginTop: theme.spacing(10),
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const AppBarCustomer = (props) => {
  const { userContext, setUserContext } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const classes = useStyles();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseLogout = () => {
    setAnchorEl(null);
    // logout
    localStorage.removeItem("token");
    setUserContext({
      ...userContext,
      isAuththenticated: false,
      user: null,
      token: null,
    });
    props.history.replace("/login");
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
    props.history.push("/profile");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleCreateBoard = (e) => {
    e.preventDefault();
    (async () => {
      const { success, board } = await createboard(title, userContext.token);
      if (success) {
        props.history.push(`/board/${board._id}`);
      }
    })();
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Avatar className={classes.avatar}>
            <EventNote />
          </Avatar>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Sprint retro
          </Typography>
          <nav>
            <form noValidate onSubmit={handleCreateBoard}>
              <Input 
                placeholder="Title" 
                inputProps={{ 'aria-label': 'description' }}
                className={classes.link}
                onChange={handleTitleChange}
              />
              <Button
                type="submit"
                variant="text"
                color="primary"
                className={classes.link}
                startIcon={<AddCircleOutline />}
              >
                Create
              </Button>
            </form>
          </nav>
          <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleCloseProfile}>Profile</MenuItem>
                <MenuItem onClick={handleCloseLogout}>
                    Logout
                </MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <div className={classes.child}>
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default withRouter(AppBarCustomer);