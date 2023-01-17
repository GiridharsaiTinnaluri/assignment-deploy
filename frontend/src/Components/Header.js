import { Link, useHistory } from "react-router-dom";
import {AiOutlineLogout, AiOutlineLogin} from 'react-icons/ai'
import './css/Header.css'
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../store';

const Header = () => {
    const history = useHistory();
    // getting intial login details from Reducer
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        // calling logout action
        dispatch(authActions.logout());
        history.replace('/')
    }   

    return <>
        <section className="Header-header">
            <div className="Header-title">
                <h4>HABIT BUILDER</h4>
            </div>

            <div className="Header-links-wrapper">
               {!isAuth && (<ul>
                    <li>
                        <Link to="/Login">
                            <AiOutlineLogin /> Login   
                        </Link>
                    </li>
                    <li>
                        <Link to="Register">
                            Register
                        </Link>
                    </li>
                </ul>)}

                {isAuth && (<ul>
                    <li>
                        <Link to="/">
                            Back
                        </Link>
                    </li>
                    <li>
                        <button className="btn" onClick={logoutHandler}>
                            <AiOutlineLogout /> logout 
                        </button>
                    </li>

                </ul>)} 
            </div>
        </section>
    </>
}

export default Header;