// LoginPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './CssFiles/Default.css'; // Import the CSS file

const DefaultPage = () => {
    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Expense Tracker</h2>

                <div className="option">
                    <Link to="/login">
                        <button>
                            <FontAwesomeIcon icon={faSignInAlt} />
                            <span>Login</span>
                        </button>
                    </Link>
                </div>

                <div className="option">
                    <Link to="/signup">
                        <button>
                            <FontAwesomeIcon icon={faUserPlus} />
                            <span>Sign Up</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DefaultPage;
