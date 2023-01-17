
import React from "react";

import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from 'react-redux';
import CardComponent from '../CardComponent';

const Milestone = () => {

    const { milestonePoints,  nextMilestone } = useSelector(state => state.auth.user);

    return (
        <CardComponent>
            <section className='milestone-section1'>
                <div>{milestonePoints}</div>
                <p>MileStone</p>
                <div>{`Target Days:  ${nextMilestone}`}</div>
            </section>
            
            <ProgressBar completed={Math.ceil((milestonePoints/nextMilestone)*100)} />
            <i style={{color: "slategray"}}>Perform All Habits To Increase Milestone Points</i>
        </CardComponent>
    )
}

export default Milestone;
