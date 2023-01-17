import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialAuthState = {
    isAuthenticated: false,
    message: null,
    user: null,
    isLoading: false,
    token:'',
    todayHabits:[],
    completedHabits:[],
    createHabitMessage:"",
    isHabitCreated: false,
    createHabitLoading: false,
    todayHabitLoading: false,
    habitMessage:''
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logout(state) {
            localStorage.removeItem('USER');
            localStorage.removeItem('TOKEN');
            localStorage.removeItem("USERID")
            state.isAuthenticated = false
            state.user = null
            state.token = ''
            state.todayHabits = []
        },
        userUpdate(state, action) {
            state.user = action.payload
        },
        isLoading(state) {
            state.isLoading = true
        },
        stopLoading(state) {
            state.isLoading = false
        },
        message(state, action) {
            state.message = action.payload
        },
        habitMessage(state, action) {
            state.habitMessage = action.payload
        },
        todayHabits(state, action) {
           console.log(action.payload);
            state.todayHabits[action.payload.index] = action.payload.data
        },
        completedHabits(state, action) {
            if(action.payload.name === 'habit') {
                let copy = state.completedHabits;
                
                if (action.payload.checked) {
                    copy.push(action.payload.value);
                } else {
                    copy = copy.filter(item => item !== action.payload.value)
                }
                
                state.completedHabits = copy
            }
          //  console.log(state.completedHabits);
        },
        createHabitMessage(state, action) {
            state.createHabitMessage = action.payload
        },
        habitCreated(state, action) {
             state.todayHabits = []
            //state.isHabitCreated = false
        },
        iscreateLoading(state) {
            state.createHabitLoading = true
        },
        stopCreateLoading(state) {
            state.createHabitLoading = false
        },
        isTodayHabitLoading(state) {
            state.todayHabitLoading = true
        },
        stopTodayLoading(state) {
            state.todayHabitLoading = false
        },
    }

})

// const habitCreated = createSlice({
//     name: 'habit',
//     initialState: {
//         isHabitCreated: false
//     },
//     reducers: {
//         habitCreated(state, action) {
//             state.isHabitCreated = action.payload
//         }
//     }
// })

const store  = configureStore({
    reducer: {
        auth: authSlice.reducer,
        // habit: habitCreated.reducer,
    }
})

export const authActions = authSlice.actions;
// export const habitCreatedAction = habitCreated.actions
export default store;