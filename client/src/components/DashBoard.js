import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserContext from '../contexts/UserContext';
import { withRouter } from 'react-router-dom';
import AppBarCustomer from './AppBarCustomer';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Loading from './Loading';
import getboards from '../utils/getboards';
import ShareIcon from '@material-ui/icons/Share';
import Tooltip from '@material-ui/core/Tooltip';
import PublicIcon from '@material-ui/icons/Public';
import changestatusboard from '../utils/changestatusboard';
import DeleteIcon from '@material-ui/icons/Delete';
import deleteboard from '../utils/deleteboard';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? '#97CEFA' : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
}));

const Dashboard = (props) => {
  const { userContext } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [boards, setBoards] = useState([]);

  const classes = useStyles();

  const handleChange = (event, index) => {
    const _boards = [...boards];
    _boards[index].is_public = event.target.checked;
    setBoards(_boards);
    (async () => {
      await changestatusboard(
        boards[index].title,
        boards[index].is_public,
        boards[index]._id,
        userContext.token
      );
    })();
  };

  useEffect(() => {
    (async () => {
      const { status, body } = await getboards(userContext.token);
      if (status) {
        const _boards = body.map(i => {
          return {
            _id: i._id,
            title: i.title,
            updated_at: i.updated_at,
            is_public: i.is_public,
            shared: false,
            title_shared: "Public URL",
            url: window.location.href + `board/${i._id}`
          };
        });
        setBoards(_boards);
      }
    })();
    setLoading(true);
  }, [userContext]);

  const handleCopy = (event, url, index) => {
    navigator.clipboard.writeText(url);

    const _boards = [...boards];
    _boards[index].shared = true;
    _boards[index].title_shared = "Copied";
    setBoards(_boards);

  }

  const handleDelete = (event, id, index) => {
    (async () => {
      const { success, msg } = await deleteboard(id, userContext.token);
      if (success) {
        props.history.go(0);
      }
    })();
  }

  if (!loading) {
    return <Loading />
  } else {
    return (
      <AppBarCustomer>
        <Container maxWidth="md" component="main">
          <br />
          <Grid container spacing={5} alignItems="flex-end">
            {boards.map((board, index) => (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={board._id} xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader
                    title={board.title.toUpperCase()}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={boards[index].is_public}
                            onChange={e => handleChange(e, index)}
                            name="checked"
                            color="primary"
                          />
                        }
                        label="Public"
                      />
                    </div>
                    <h5>{board.updated_at}</h5>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={e => handleDelete(e, board._id, index)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant="contained" color="primary" onClick={() => props.history.push(`board/${board._id}`)}>
                      Edit Board
                    </Button>
                    <Button variant="text" color="primary" onClick={e => handleCopy(e, board.url, index)}>
                      <Tooltip title={boards[index].title_shared} aria-label="add">
                        {boards[index].shared? <PublicIcon/ > : <ShareIcon />}
                      </Tooltip>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </AppBarCustomer>
    );
  }
}

export default withRouter(Dashboard);