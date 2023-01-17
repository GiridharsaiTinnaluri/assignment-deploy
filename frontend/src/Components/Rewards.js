import CardComponent from "../CardComponent";
import {FaGift} from 'react-icons/fa';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Rewards = () => {
    const user = useSelector(state => state.auth.user)

    return (
        <CardComponent>
            <i style={{textDecoration: "underline"}}> Reward Points </i>

            <div>
                <div>
                    Total Rewards: ${user.rewards}
                </div>
                <div style={{margin: "20px 10px"}}>
                    <FaGift style={{fontSize: "200px", color:"blue"}}/>
                </div>
            </div>

             <p>Claim Code: {`\"hdhaahdahsd;adhj;ashdahdashdloisdadjasdka\"`}</p>

                <i>{`Use Above code to claim the Reward points`}</i>
<br/>
                <i style={{color: "red"}}>Note: {`Complete The Milestone To Get Rewards`}</i>

        </CardComponent>
    )
}

export default Rewards;