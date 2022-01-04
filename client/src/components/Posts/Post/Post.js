import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = (props) => {

  const classes = useStyles();

  const { post, setCurrentId } = props

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post.likes.length > 0) {
      const { likes } = post
      const likedPost = likes.find((like) => like === ( user?.result?.googleId || user?.result?._id));
      if( likedPost ) {
        return <>
                  <ThumbUpAltIcon 
                        fontSize="small" />
                        &nbsp;{ 
                                likes.length > 2 ? `You and ${likes.length - 1} others` : 
                                                   `${likes.length} like${ likes.length > 1 ? 's' : '' }` 
                              }
               </>
      } 

      return <>
                 <ThumbUpAltOutlined 
                        fontSize="small" />
                        &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
             </>
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} 
                 image={post.image} 
                 title={post.title} 
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{ post.name }</Typography>
        <Typography variant="body2">{ moment(post.createdAt).fromNow() }</Typography>
      </div>
      {
         ( user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button onClick={() => setCurrentId(post._id)} 
                    style={{ color: 'white' }} 
                    size="small"> <MoreHorizIcon fontSize="medium" />
            </Button>
          </div> )
      }
      <div className={classes.details}>
        <Typography variant="body2" 
                    color="textSecondary" 
                    component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} 
                  gutterBottom 
                  variant="h5" 
                  component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" 
                    color="textSecondary" 
                    component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" 
                color="primary" 
                disabled={!user?.result} 
                onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {
          ( user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Button size="small" 
                    color="secondary" 
                    onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete
            </Button>
          )
        }
      </CardActions>
    </Card>
  );
};

export default Post;
