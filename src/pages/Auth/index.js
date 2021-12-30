import { Stack, SvgIcon, Typography } from '@mui/material'
import React, { useState, useEffect, Fragment } from 'react'
import { CelebrationRounded, EmailRounded, Google, LinkedIn, Lock, LockOutlined, Person, Twitter, VpnKey } from '@mui/icons-material'
import { AuthButton, AuthWrapper, FormContainer, FormControl, FormTitle, FormWrapper, LinkButton, Panel, PanelImage, PanelWrapper, SigninForm, SignupForm, SocialButton, useStyles } from './style'
import { useNavigate, useLocation  } from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import { login } from '../../stores/actions/Auth'
//use to detect user login or register
const useAuth = (location)=>{
    const [isLogin,setIsLogin] = useState(true)
    useEffect(() => {
        if(location.pathname === '/login')
            setIsLogin(true)
        else
            setIsLogin(false)
    }, [location])
    return[isLogin]
}

const Facebook = (props)=><SvgIcon {...props}><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" sx="svg-inline--fa fa-facebook-f fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg></SvgIcon>

function Auth(props) {
    const location = useLocation();
    const [isLogin] = useAuth(location);
    const navigate  = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { currentUser, loadingLogin} = useSelector((state) => state.authReducer);
    const [loginForm, setLoginForm] = useState({
        email:"",
        password:""
    })
    useEffect(() => {
        if(currentUser){
            console.log(currentUser)
            navigate("/")
        }
        return () => {
            
        }
    }, [currentUser,navigate])
    const handleSubmit = (event)=>{
        event.preventDefault()
        if(event.target.login){
            console.log('login')
            dispatch(login({Email:loginForm.email, Password:loginForm.password}))
        }
        else{
            console.log('register')
        }
        
    }
    return (
        <Fragment>

            <AuthWrapper className={(isLogin?"":"sign-up-mode")}>
                <FormContainer>
                    <FormWrapper className="signin-signup">
                        <SigninForm onSubmit={handleSubmit} className="sign-in-form">
                            <FormTitle>Đăng nhập</FormTitle>
                            <FormControl>
                                <EmailRounded/>
                                <input type="email" value={loginForm.email} onChange={(e)=> setLoginForm({...loginForm,email:e.target.value})}  placeholder="Email" />
                            </FormControl>
                            <FormControl>
                                <VpnKey/>
                                <input type="password" value={loginForm.password} onChange={(e)=> setLoginForm({...loginForm,password:e.target.value})}  placeholder="Password" />
                            </FormControl>
                            <AuthButton type='submit' disabled={loadingLogin} name='login'>
                                Đăng nhập
                            </AuthButton>
                            <Typography sx={{padding:'0.5rem 0'}}>Or Sign in with social platforms</Typography>
                            <Stack padding='5px 0' direction='row'>
                                <SocialButton to='#'>
                                    <Facebook/>
                                </SocialButton>
                                <SocialButton to='#'>
                                    <Twitter/>
                                </SocialButton>
                                <SocialButton to='#'>
                                    <Google/>
                                </SocialButton>
                                <SocialButton to='#'>
                                    <LinkedIn/>
                                </SocialButton>
                            </Stack>
                        </SigninForm>
                    <SignupForm onSubmit={handleSubmit} className="sign-up-form">
                        <FormTitle>Đăng ký</FormTitle>
                        <FormControl>
                            <Person/>
                            <input type="text" placeholder="Display Name" />
                        </FormControl>
                        <FormControl>
                            <CelebrationRounded/>
                            <input type="date" placeholder="Birthday" />
                        </FormControl>
                        <FormControl>
                            <EmailRounded/>
                            <input type="email" placeholder="Email" />
                        </FormControl>
                        <FormControl>
                            <Lock/>
                            <input type="password" placeholder="Password" />
                        </FormControl>
                        <FormControl>
                            <LockOutlined/>
                            <input type="password" placeholder="Confirm Password" />
                        </FormControl>
                        <AuthButton type='submit' name='register'>
                            Đăng ký
                        </AuthButton>
                        <Typography sx={{padding:'0.5rem 0'}}>Or Sign up with social platforms</Typography>
                        <Stack padding='5px 0' direction='row'>
                                <SocialButton to='#'>
                                    <Facebook/>
                                </SocialButton>
                                <SocialButton to='#'>
                                    <Twitter/>
                                </SocialButton>
                                <SocialButton to='#'>
                                    <Google/>
                                </SocialButton>
                                <SocialButton to='#'>
                                    <LinkedIn/>
                                </SocialButton>
                        </Stack>
                    </SignupForm>
                    </FormWrapper>
                </FormContainer>

                <PanelWrapper>
                    <Panel sx={classes.leftPanel} className="left-panel">
                        <div className="content">
                            <h3>Người dùng mới?</h3>
                            <p>
                                Đăng ký trở thành thành viên để nhận những ưu đãi mơi nhất!
                            </p>
                            <LinkButton to='/register' className="btn transparent">
                                Đăng ký
                            </LinkButton>
                        </div>
                        <PanelImage src="/assets/background/log.svg" className="image" alt="" />
                    </Panel>
                    <Panel sx={classes.rightPanel} className="right-panel">
                        <div className="content">
                            <h3>Đã có tài khoản?</h3>
                            <p>
                                Đăng nhập và sử dụng các tính năng của MoviePro
                            </p>
                            <LinkButton to='/login' className="btn transparent">
                                Đăng nhập
                            </LinkButton>
                        </div>
                        <PanelImage src="/assets/background/register.svg" className="image" alt="" />
                    </Panel>
                </PanelWrapper>
            </AuthWrapper>
        </Fragment>
        
    )
}

export default Auth