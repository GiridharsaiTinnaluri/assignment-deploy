import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";


const Habit = ({ data, onChange }) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.completedHabits)
    const {time, description, days, _id: id} = data;
   // console.log(auth.indexOf(id) !== -1, id, auth);
  //  console.log(data);
    return(
        <div className="habit-wrapper">
            <div >
                <input type="checkbox" name="habit" id={id}
                value={id} onChange={(e) => dispatch(authActions.completedHabits({
                    value: e.target.value,
                    checked: e.target.checked,
                    name: e.target.name
                }))}
                checked={auth.indexOf(id) !== -1}
                 />
            </div>
                 <label htmlFor={id} className="habit-card">
                            {/* <div className="habit-time">{time}</div> */}
                            <div className="habbit-desc">{description}</div>
                            <i className="habit-day">every {days.map((i, index) => {return <span key={index}>{i+", "}</span>})} at {time}</i>
               
                </label>
          
        </div>
    )
}

export default Habit;