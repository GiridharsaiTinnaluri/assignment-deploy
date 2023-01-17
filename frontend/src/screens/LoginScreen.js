import { useState, useCallback, useEffect } from 'react';
import {AiOutlineLogin} from 'react-icons/ai'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

const LoginScreen = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const [formError, setFormError] = useState({});
    const [message, setMessage] = useState("");
    const history = useHistory();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(authActions.message(''));
        }, 2000)
        return () => {
            clearTimeout(timer);
        }
    })

    //memoizing function
    const changeHandler = useCallback((e) => {
        // settinf form data
      //  console.log(e.target.value);
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    },[])

    const validateForm = useCallback(() => {
        let error = {}

        if (formData.email === '') {
            error.email = 'Email required!'
        } else {
            let Regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if(!Regex.test(formData.email)) {
                error.email = 'Invalid Email'
            }
        }

        if (formData.password === '') {
            error.password = 'password required!'
        } else if (formData.password.length < 5) {
            error.password = "Length should be min 5 characters"
        }

        setFormError({ ...error });

        return Object.keys(error).length < 1;
    }, [formData])

     //Form submit 
    // send request to server
    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(authActions.isLoading())
        let isvalid= validateForm()

        if(!isvalid) {
            dispatch(authActions.stopLoading())
            return;
        }

        axios.post('/api/user/login', {
            email: formData.email,
            password: formData.password
        })
        .then(res => {
            //if success get data
            if(parseInt(res.status) === 200) {
                localStorage.setItem('TOKEN', res.data.token); 
                localStorage.setItem('USER', JSON.stringify(res.data.newUser)); 
                localStorage.setItem('USERID', JSON.stringify(res.data.newUser.id))
                dispatch(authActions.message("Login successful"));
                dispatch(authActions.login({
                    user: res.data.newUser,
                    token: res.data.token
                }))
                dispatch(authActions.message(res.data.message));
                history.replace('/')
            }
            setFormData({
                email: "",
                password: ""
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
                Login
            </h1>
        </section>

        <p className='not-valid'>{auth.message}</p>

        <section className=''>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor='email' className='input-label'>Email</label> <br/>
                    <input className='input'
                    type="email"
                    name="email"
                    placeholder='Enter email'
                    value={formData.email}
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
                    value={formData.password}
                    placeholder='Enter password..'
                    onChange={changeHandler}
                    ></input>
                    <span className='not-valid'>{formError.password}</span>
                </div>

                <div>
                    <button type='submit' className='btn-login' disabled={auth.isLoading}> {auth.isLoading?"Loading ..." : "Login"} </button>
                </div>
            </form>
        </section>
    </>
}

export default LoginScreen;