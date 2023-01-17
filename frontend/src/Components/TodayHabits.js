import { useCallback, useEffect, useState,useMemo } from 'react';
import axios from 'axios';
import {days} from '../util/days'
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
import Habit from './habit';
import React from 'react';

const TodayHabits = () => {
    const Time = new Date();
    const dispatch = useDispatch();
    const completedHabits = useSelector(state => state.auth.completedHabits);
    const auth = useSelector(state => state.auth);
    const habitsArray = useSelector(state => state.auth.todayHabits);
    const [habits, setHabits] = useState(() => []);
    const [currentDay, setCurrentDay] = useState(() => days[new Date().getDay()]);
    const [index, setIndex] = useState(() => new Date().getDay());
    const [error, setError] = useState({});
    const [disable, setDisable] = useState(true);
    const [submitted, setsubmitted] = useState(false);
    
    const [activeDay, setActiveDay] = useState({
        sun: false,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
    })

    // Adding button functionality
    // Active only to submit current day habits
    useEffect(() => {
        let Today = days[new Date().getDay()];
        if(Today.localeCompare(currentDay, undefined, {sensitivity: 'base'}) ) {
            if(!submitted) {
                setDisable(false);
            }
        } else {
            setDisable(true);
        }
    }, [currentDay])
 
    // fetch days habit records 
    useEffect(() => {
        let Today = days[new Date().getDay()];
        let USERID = JSON.parse(localStorage.getItem("USERID"));

        // Optimising res data by storing in reducer
        if(habitsArray[index]) {
            setHabits(habitsArray[index]);
            setActiveDay((prev) =>  {
                return {
                [currentDay] : !prev[currentDay]}
            })
        } 
        else {

            dispatch(authActions.isLoading());
            axios.get(`/api/habits/userTodayHabits?userId=${USERID}&day=${currentDay}`,{
                headers:{
                        "Authorization": `Bearer ${auth.token}`
                }
            })
            .then(res => {
                    console.log(res);
                    if(parseInt(res.status) === 200) {
                    //dispatch(authActions.message("Register successful"));
                    const resData = res.data.data || [];
                    console.log(res.data.data);
                    setHabits(resData);
                    dispatch(authActions.todayHabits({
                        data: res.data.data,
                        index: index
                    }));
                    }
                    dispatch(authActions.stopLoading())
                }).catch(err => {
                    console.log(err);
                    const errorMessage = (err.response &&
                        err.response.data && 
                        err.response.data.message) 
                        || err.message || err.toString();
    
                dispatch(authActions.message(errorMessage));
                
            }).finally(() => {
                setActiveDay((prev) =>  {
                    return {
                    [currentDay] : !prev[currentDay]}
                })
                dispatch(authActions.stopLoading())
            })

        }

    }, [currentDay])
        
    const fetchhabits = (day) => {
        //console.log(habitsArray);
        let Today = days[day];
       setCurrentDay(Today)
       setIndex(day);
    }
        
    const validateForm = () => {
        let error = {}
        
        if(completedHabits.length < 1) {
            error.message = "Please Select the completed tasks"
            }


        setError({ ...error });

        return Object.keys(error).length < 1;
    }


   const submitHandler = () => {
    let USERID = JSON.parse(localStorage.getItem("USERID"));
    console.log("clicked");

     let isvalid = validateForm()
        if(!isvalid) {
            return;
        }

     axios.post(`/api/habits/dailyProgress`,{
        userId: USERID,
        day: Time.getDay(),
        month: Time.getMonth(),
        year: Time.getFullYear(),
        totalHabits: habits.length,
        completedHabits: completedHabits.length
     },{
        headers:{
            "Authorization": `Bearer ${auth.token}`
        }
    })
    .then(res => {
            console.log(res);
            if(parseInt(res.status) === 201) {
                localStorage.setItem('USER', JSON.stringify(res.data.data));
                dispatch(authActions.userUpdate(res.data.data));
                //setDisable(false);
            }
        }).catch(err => {
            console.log(err);
            const errorMessage = (err.response &&
                err.response.data && 
                err.response.data.message) 
                || err.message || err.toString();

            dispatch(authActions.habitMessage(errorMessage));
        
        }).finally(() => {
            dispatch(authActions.stopTodayLoading())
        })

   }

    return (<>
            {auth.todayHabitLoading && (<h5>Loading...</h5>)}
            
            <div className='today-habits-days-wrapper'>
                <div className={!activeDay.sun ? 'today-habits-day' : 'today-habits-day bg-b-cw'} onClick={() => fetchhabits(0)}>Sun</div>
                <div className={!activeDay.mon ? 'today-habits-day' : 'today-habits-day bg-b-cw'} onClick={() => fetchhabits(1)}>Mon</div>
                <div className={!activeDay.tue ? 'today-habits-day' : 'today-habits-day bg-b-cw'} onClick={() => fetchhabits(2)}>Tue</div>
                <div className={!activeDay.wed ? 'today-habits-day' : 'today-habits-day bg-b-cw'} onClick={() => fetchhabits(3)}>Wed</div>
                <div className={!activeDay.thu ? 'today-habits-day' : 'today-habits-day bg-b-cw'} onClick={() => fetchhabits(4)}>Thur</div>
                <div className={!activeDay.fri ? 'today-habits-day' : 'today-habits-day bg-b-cw'} onClick={() => fetchhabits(5)}>Fri</div>
                <div className={!activeDay.sat ? 'today-habits-day' : 'today-habits-day bg-b-cw'} onClick={() => fetchhabits(6)}>Sat</div>
            </div>

        <div>
            <i style={{color: "slategray"}}>Habits To Complete Today</i>
            </div>
            
        <div className='todayHabit-habit'>
            <p className='not-valid'>{error.message}</p> 

            { !auth.todayHabitLoading &&
                habits.length > 0 && (
                    <ul>
                        {
                            habits.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Habit data={item} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }
        </div>
            {habits.length < 1 && "No Tasks To show"}


        <div>
                <button type="button" className='habit-day-btn' onClick={submitHandler} disabled={!disable}>{disable? "Done": "Disabled"}</button>
        </div>
    </>)
}

export default React.memo(TodayHabits);