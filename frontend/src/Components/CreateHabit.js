import { useState,useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
import { days as week} from '../util/days';
import CardComponent from '../CardComponent';

const RegisterScreen = () => {
    const [formData, setFormData] = useState({
        description:"",
        time: "",
        days: []
    })

    const [formError, setFormError] = useState({});
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(authActions.createHabitMessage(''));
        }, 2000)
        return () => {
            clearTimeout(timer);
        }
    })

    const changeHandler = (e) => {
        console.log(e.target.value);
        if(e.target.name === 'days') {
            let copy = { ...formData };

            if (e.target.checked) {
                copy.days.push(e.target.value);
            } else {
               copy.days = copy.days.filter(item => item !== e.target.value)
            }

            setFormData(copy);

        } else {
            setFormData((prev) => {
                return {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            })
        }
    }

    const validateForm = () => {
        let error = {}
        console.log(auth.user.id);
        if(formData.description === '') {
            error.description = "habit is requied"
        } else if(formData.description.length < 2) {
            error.description = "habit should be min 2 characters"
        }

        if(formData.time === '') {
            error.time = 'time is required!'
        } 

        if(formData.days.length < 1) {
            error.days = 'day is required'
        }


        setFormError({ ...error });

        return Object.keys(error).length < 1;
    }

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(authActions.iscreateLoading())
        let isvalid= validateForm()


        if(!isvalid) {
            dispatch(authActions.stopCreateLoading())
            return;
        }

        axios.post('/api/habits/createHabit', {
            habitDescription: formData.description,
            time: formData.time,
            days: formData.days,
            userId:  JSON.parse(localStorage.getItem("USERID"))
        }, {
            headers:{"Authorization": `Bearer ${auth.token}`}
        })
        .then(res => {
            if(parseInt(res.status) === 201) {
                dispatch(authActions.createHabitMessage("Created successful"));
                dispatch(authActions.habitCreated());
            }
            setFormData({
                description:"",
                time: "",
                days: []
            })
        }).catch(err => {
            const errorMessage = (err.response &&
                 err.response.data && 
                 err.response.data.message) 
                 || err.message || err.toString();

                 dispatch(authActions.createHabitMessage(errorMessage));
          
        }).finally(() => {
            dispatch(authActions.stopCreateLoading())
        })
    }



    return <CardComponent>
       {/* Display Message */}
        <p className='createhabit-errormessage'>{auth.createHabitMessage}</p>

        <section className='createhabit-section2'>
            <form onSubmit={submitHandler}>
                 <div className='habit'>
                    <label htmlFor='description' className='input-label'>Habit</label> <br/>
                    <input
                    type="text"
                    name="description"
                    placeholder='describe a habit here...'
                    value={formData.description}
                    onChange={changeHandler}
                    ></input>
                    <span className='not-valid'>{formError.description}</span>
                </div>
                <div className='time-week-wrapper'>
                    <div className='time'>
                        <label htmlFor='time' className='input-label'>Time</label> <br/>
                        <input
                        type="time"
                        name="time"
                        id="time"
                        value={formData.time}
                        onChange={changeHandler}
                        ></input>
                        <span className='not-valid'>{formError.time}</span>
                    </div>

                    <div className='week'>
                        <label htmlFor='days' className='input-label'>Days</label>
                          <div className='week-group'>
                            <div className={formData.days.indexOf(week[0]) !== -1 ? "circle-wrap bg-b-cw" : "circle-wrap bg-w-cb"}>
                                <input type="checkbox" id="sun"  name="days" value={week[0]} onChange={changeHandler} checked={formData.days.indexOf(week[0]) !== -1}/>
                                <label htmlFor="sun">sun</label>
                            </div>
                            <div className={formData.days.indexOf(week[1]) !== -1 ? "circle-wrap bg-b-cw" : "circle-wrap bg-w-cb"}>
                                <input type="checkbox" id="mon" name="days" value={week[1]} onChange={changeHandler} checked={formData.days.indexOf(week[1]) !== -1}/>
                                <label htmlFor="mon">mon</label>
                            </div>
                            <div className={formData.days.indexOf(week[2]) !== -1 ? "circle-wrap bg-b-cw" : "circle-wrap bg-w-cb"}>
                                <input type="checkbox" id="tue" name="days" value={week[2]} onChange={changeHandler} checked={formData.days.indexOf(week[2]) !== -1}/>
                                <label htmlFor="tue">tue</label>
                            </div>
                            <div className={formData.days.indexOf(week[3]) !== -1 ? "circle-wrap bg-b-cw" : "circle-wrap bg-w-cb"}>
                                <input type="checkbox" id="wed" name="days" value={week[3]} onChange={changeHandler} checked={formData.days.indexOf(week[3]) !== -1}/>
                                <label htmlFor="wed">wed</label>
                            </div>
                            <div className={formData.days.indexOf(week[4]) !== -1 ? "circle-wrap bg-b-cw" : "circle-wrap bg-w-cb"}>
                                <input type="checkbox" id="thu" name="days" value={week[4]} onChange={changeHandler} checked={formData.days.indexOf(week[4]) !== -1}/>
                                <label htmlFor="thu">thu</label>
                            </div>
                            <div className={formData.days.indexOf(week[5]) !== -1 ? "circle-wrap bg-b-cw" : "circle-wrap bg-w-cb"}>
                                <input type="checkbox" id="fri" className={formData.days.indexOf(week[5]) !== -1 ? "bg-b-cw" : "bg-w-cb"} name="days" value={week[5]} onChange={changeHandler} checked={formData.days.indexOf(week[5]) !== -1}/>
                                <label htmlFor="fri">fri</label>
                            </div>
                            <div className={formData.days.indexOf(week[6]) !== -1 ? "circle-wrap bg-b-cw" : "circle-wrap bg-w-cb"}>
                                <input type="checkbox" id="sat" name="days" value={week[6]} onChange={changeHandler} checked={formData.days.indexOf(week[6]) !== -1}/>
                                <label htmlFor="sat">sat</label>
                            </div>
                          </div>
                        <span className='not-valid'>{formError.days}</span>
                    </div>
                </div>
                <div>
                    <button type='submit' className='habit-btn' disabled={auth.createHabitLoading}> {auth.createHabitLoading? "Sending Request" : "Create Habit"} </button>
                </div>
            </form>
        </section>
        <i style={{color: "slategray"}}>Please Create Your Habit Here !!</i>
    </CardComponent>
}

export default RegisterScreen;