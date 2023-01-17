import { useState, useEffect } from 'react';
import {AiOutlineLogin} from 'react-icons/ai'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

const RegisterScreen = () => {
    const [formData, setFormData] = useState({
        username:"",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const [formError, setFormError] = useState({})
    const history = useHistory();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(authActions.message(''));
        }, 2000)
        return () => {
            clearTimeout(timer);
        }
    })

    
    const changeHandler = (e) => {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    
    // Validating form data
    const validateForm = () => {
        let error = {}
        
        if(formData.username === '') {
            error.username = "Username is requied"
        } else if(Number.parseInt(formData.username.length) < 5) {
            error.username = "Username should be min 5 characters"
        }

        if(formData.email === '') {
            error.email = 'Email is required!'
        } else {
            let Regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if(!Regex.test(formData.email)) {
                error.email = 'Invalid Email'
            }
        }

        if(formData.password === '') {
            error.password = 'password required!'
        }else if(formData.confirmPassword === '') {
            error.confirmPassword = 'confirm Password required!'
        }else if(formData.password.length < 5 || formData.confirmPassword.length < 5) {
            error.password = "password should be min 5 characters"
            error.confirmPassword = "password should be min 5 characters"
        }else if(formData.password !== formData.confirmPassword) {
            error.password = 'Password not matched'
            error.confirmPassword = 'Password not matched'
        }


        setFormError({ ...error });

        return Object.keys(error).length < 1;
    }

    //Form submit 
    // send request to server
    const submitHandler =  (e) => {
        e.preventDefault();

        dispatch(authActions.isLoading())
        let isvalid = validateForm()
        if(!isvalid) {
            dispatch(authActions.stopLoading())
            return;
        }

        axios.post('/api/user/register', {
            name: formData.username,
            email: formData.email,
            password: formData.password
        })
        .then(res => {
            //console.log(res);
            if(parseInt(res.status) === 201) {
                localStorage.setItem('TOKEN', res.data.token); 
                localStorage.setItem('USER', JSON.stringify(res.data.newUser)); 
                localStorage.setItem('USERID', JSON.stringify(res.data.newUser.id))
                dispatch(authActions.login({
                    user: res.data.newUser,
                    token: res.data.token
                }))
                dispatch(authActions.message(res.data.message));
                history.replace('/')
            }
            setFormData({
                username:"",
                email: "",
                password: "",
                confirmPassword: ""
            })
        }).catch(err => {
            console.log(err);
            const errorMessage = (err.response &&
                 err.response.data && 
                 err.response.data.message) 
                 || err.message || err.toString();

            dispatch(authActions.message(errorMessage));
          
        }).finally(() => {
            dispatch(authActions.stopLoading())
        })
    }


    return <>
        <section className='Login-header'>
            <h1>
                <AiOutlineLogin/>
                Register
            </h1>
        </section>

        <p className='not-valid'>{auth.message}</p> 

        <section>
            <form onSubmit={submitHandler}>
                 <div>
                    <label htmlFor='username' className='input-label'>username</label> <br/>
                    <input
                    className='input'
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={changeHandler}
                    placeholder='Enter username'
                    ></input>
                    <span className='not-valid'>{formError.username}</span>
                </div>

                <div>
                    <label htmlFor='email' className='input-label'>Email</label> <br/>
                    <input
                    className='input'
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder='Enter email ...'
                    onChange={changeHandler}
                    ></input>
                    <span className='not-valid'>{formError.email}</span>
                </div>

                <div>
                    <label htmlFor='password' className='input-label'>Password</label> <br/>
                    <input
                    className='input'
                    type="password"
                    name="password"
                    placeholder='Enter password'
                    value={formData.password}
                    onChange={changeHandler}
                    ></input>
                    <span className='not-valid'>{formError.password}</span>
                </div>

                <div>
                    <label htmlFor='confirmPassword' className='input-label'>Confirm Password</label> <br/>
                    <input
                    className='input'
                    placeholder='Enter confirm password..'
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={changeHandler}
                    ></input>
                    <span className='not-valid'>{formError.confirmPassword}</span>
                </div>

                <div>
                    <button type='submit' className='btn-login' disabled={auth.isLoading}> {auth.isLoading?"Loading ..." : "Register"} </button>
                </div>
            </form>
        </section>
    </>
}

export default RegisterScreen;