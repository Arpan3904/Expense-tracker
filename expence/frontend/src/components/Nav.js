// Nav.js
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ user, handleLogout }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/add-expense">Add Expense</Link>
                </li>
                {user ? (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                        <li>
                            <Link to="/settle">Settle</Link>
                        </li>
                        <li>
                            <Link to="/add-group">Add Group</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Nav;
