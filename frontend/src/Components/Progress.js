import CardComponent from "../CardComponent";
import { PieChart } from 'react-minimal-pie-chart';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


const Progress = () => {
    const todayHabits = useSelector(state => state.auth.todayHabits)
    const completed = useSelector(state => state.auth.completedHabits)
    const [total, setTotal] = useState(0);

   useEffect(() => {
        let length = 0;
        todayHabits.forEach(element => {
                length += element.length;
        });
        setTotal(length);
   }, [])

    return (
        <CardComponent>
            <i> Your Progress Today </i>

            <div>
                <div>
                    Total Habits: {parseInt(total)}
                </div>
                <div>
                    completed Habits: {parseInt(completed.length)}
                </div>
            </div>

             <PieChart
                data={[{ value: parseInt(completed.length), color: '#E38627' }]}
                style={{ height: '300px' }}
                totalValue={parseInt(total)}
                lineWidth={20}
                label={({ dataEntry }) => dataEntry.value}
                labelStyle={{
                    fontSize: '25px',
                    fontFamily: 'sans-serif',
                    fill: '#E38627',
                }}
                labelPosition={0}
                />

                <i>{`You Made ${parseInt((completed.length/total)*100)}% progress`}</i>
                <br/>
                <i style={{color: "red"}}>Note: {`Select The Completed Habits To See The Progress`}</i>
        </CardComponent>
    )
}

export default Progress;