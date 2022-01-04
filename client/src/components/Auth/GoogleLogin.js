import { GoogleLogin } from 'react-google-login';
import { AUTH } from '../../constants/actionTypes';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import Icon from './icon';
import useStyles from './styles';

const GoogleLoginForm = () => {

    const { googleButton } = useStyles();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSuccess = async (response) => {

        const { profileObj, tokenId } = response;

        const data = {
            result: profileObj, 
            token: tokenId
        }
    
        try {
          dispatch({ type: AUTH, data });
    
          navigate("/")
        } catch (error) {
          console.log(error);
        }
      };

      const onFailure = (e) => alert(e.details ? e.details : e.error)

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
            render={({ onClick, disabled }) => (
            <Button 
                    className={googleButton} 
                    color="primary" 
                    fullWidth 
                    onClick={onClick} 
                    disabled={disabled} 
                    startIcon={<Icon />} 
                    variant="contained"
            >
                Google Sign In
            </Button>
            )}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy="single_host_origin"
      />
    )
}

export default GoogleLoginForm
