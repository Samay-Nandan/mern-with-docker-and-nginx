import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = (props) => {
  const { setCurrentId } = props
  const { container } = useStyles();

  const posts = useSelector(({ posts }) => posts);

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={container} 
            container 
            alignItems="stretch" 
            spacing={3}>
              {
                posts.map((post) => (
                  <Grid key={post._id} 
                        item xs={12} 
                        sm={6} 
                        md={6}>
                    <Post post={post} setCurrentId={setCurrentId} />
                  </Grid>
                ))
              }
      </Grid>
    )
  );
};

export default Posts;
