import React, { useState } from 'react';
import axios from 'axios';
import  './CssFiles/Settle.css'// Import the CSS file

const SettleWithFriend = () => {
    const [friendName, setFriendName] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const friendsList = ['Arpan', 'Jenil', 'Om', 'Shyam'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/settle', { friendName, amount });
            // Handle successful settlement (e.g., show success message)
            console.log('Settlement with friend successful:', response.data);
        } catch (error) {
            setError('Failed to settle with friend. Please try again.');
            console.error('Settlement error:', error);
        }
    };

    return (
        <div className="settle-container">
            <h2>Settle with Friend</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-element">
                    <label className="label">Select Friend:</label>
                    <select className="select" value={friendName} onChange={(e) => setFriendName(e.target.value)}>
                        <option value="">Select Friend</option>
                        {friendsList.map((friend) => (
                            <option key={friend} value={friend}>
                                {friend}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-element">
                    <label className="label">Amount:</label>
                    <input className="input" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                {error && <p className="error">{error}</p>}
                <button className="button" type="submit">Settle</button>
            </form>
        </div>
    );
};

export default SettleWithFriend;
