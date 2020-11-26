import { useState, useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import getboardid from '../utils/getboardid';
import Loading from './Loading';
import { withRouter } from 'react-router-dom';
import NotFound from './NotFound';
import AppBarCustomer from './AppBarCustomer';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AccountCircle from '@material-ui/icons/AccountCircle';

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

const BoardDetail = (props) => {
  const { userContext } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(true);
  const [board, setBoard] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const { status, body } = await getboardid(props.match.params.id, userContext.token);
      setFound(status);
      if (status) {
        setBoard(body);
        setLoading(true);
      }
    })();
  }, []);

  if (!loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <AppBarCustomer>
      {
        !found? <NotFound /> : 
        <div>
        <Container component="main" maxWidth="xs">
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              defaultValue={board.title}
              size="small"
              id="title"
              label="Title Board"
              name="title"
              autoComplete="title"
            />
            <input type="submit" hidden></input>
          </form>
        </Container>
        </div>
      }
      </AppBarCustomer>
    );
  }
}

export default withRouter(BoardDetail);
