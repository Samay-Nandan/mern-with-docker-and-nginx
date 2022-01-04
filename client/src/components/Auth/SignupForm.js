import { Grid } from '@material-ui/core';
import Input from "./Input"

const SignupForm = (props) => {

    const { showPassword, handleChange, handleShowPassword } = props

    return (
            <Grid container spacing={2}>
                <Input name="firstName" 
                       label="First Name" 
                       handleChange={handleChange} 
                       autoFocus 
                       half />
                <Input name="lastName" 
                       label="Last Name" 
                       handleChange={handleChange} 
                       half />
                <Input name="email" 
                       label="Email Address" 
                       handleChange={handleChange} 
                       type="email" />
                <Input name="password" 
                       label="Password" 
                       handleChange={handleChange} 
                       type={showPassword ? 'text' : 'password'} 
                       handleShowPassword={handleShowPassword} />
                <Input name="confirmPassword" 
                       label="Repeat Password" 
                       handleChange={handleChange} 
                       type="password" /> 
            </Grid>
    )
}

export default SignupForm
