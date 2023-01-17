import { Link } from "react-router-dom";
import {GrInProgress} from 'react-icons/gr'
import {GiTrophiesShelf} from 'react-icons/gi'
import './css/Header.css'
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
// import AuthContext from "../context/authContext";
import { authActions } from '../store';

const Footer = () => {
    // const {isLoggedIn, logout} = useContext(AuthContext);
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    return <>
        <section className="footer">
            <div className="Header-links-wrapper">
                {isAuth && (<ul>
                    <li>
                        <Link to="/Progress">
                            <GrInProgress /> Progress   
                        </Link>
                    </li>
                    <li>
                        <Link to="Rewards">
                            <GiTrophiesShelf/>Rewards
                        </Link>
                    </li>
                </ul>)} 
            </div>
        </section>
    </>
}

export default Footer;