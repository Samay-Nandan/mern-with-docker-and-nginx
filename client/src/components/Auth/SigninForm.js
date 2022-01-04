import { Grid } from '@material-ui/core';
import Input from "./Input"

const SigninForm = ( props ) => {

    const { showPassword, handleChange, handleShowPassword } = props

    return (
            <Grid container spacing={2}>
                <Input name="email" 
                       label="Email Address" 
                       handleChange={handleChange} 
                       type="email" />
                <Input name="password" 
                       label="Password" 
                       handleChange={handleChange} 
                       type={showPassword ? 'text' : 'password'} 
                       handleShowPassword={handleShowPassword} />
            </Grid>

    )
}

export default SigninForm
