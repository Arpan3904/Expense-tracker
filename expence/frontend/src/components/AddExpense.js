import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CssFiles/Settle.css'; // Import your CSS file

const AddExpense = () => {
    const [groups, setGroups] = useState([]);
    const [members, setMembers] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(0);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [splitEqually, setSplitEqually] = useState(true); // State to manage equal split
    const [unequalAmounts, setUnequalAmounts] = useState({}); // State to manage unequal amounts
    const [error, setError] = useState('');

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/groups');
            setGroups(response.data);
        } catch (error) {
            console.error('Fetch groups error:', error);
        }
    };

    const fetchMembers = async (selectedGroup) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/groups/${selectedGroup}/members`);
            setMembers(response.data);
        } catch (error) {
            console.error('Fetch members error:', error);
        }
    };

    const handleGroupChange = async (e) => {
        setSelectedGroup(e.target.value);
        setSelectedMembers([]);
        if (e.target.value) {
            fetchMembers(e.target.value);
        } else {
            setMembers([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (splitEqually || isUnequalAmountValid()) {
            try {
                const response = await axios.post('http://localhost:8080/api/expenses', {
                    group: selectedGroup,
                    members: selectedMembers,
                    description,
                    amount
                });
                console.log('Expense added successfully:', response.data);
            } catch (error) {
                setError('Failed to add expense. Please try again.');
                console.error('Add expense error:', error);
            }
        } else {
            setError('Total amount assigned to members must equal the total amount.');
        }
    };

    const handleCheckboxChange = (memberId) => {
        const index = selectedMembers.indexOf(memberId);
        if (index === -1) {
            setSelectedMembers([...selectedMembers, memberId]);
            // Initialize the unequal amounts state for the newly selected member
            setUnequalAmounts(prevState => ({
                ...prevState,
                [memberId]: ''
            }));
        } else {
            const updatedSelectedMembers = [...selectedMembers];
            updatedSelectedMembers.splice(index, 1);
            setSelectedMembers(updatedSelectedMembers);
            // Remove the member's unequal amount state if the member is deselected
            setUnequalAmounts(prevState => {
                const updatedState = { ...prevState };
                delete updatedState[memberId];
                return updatedState;
            });
        }
    };

    const handleSplitEquallyChange = () => {
        setSplitEqually(!splitEqually);
        // Reset unequal amounts when switching between equal and unequal split
        setUnequalAmounts({});
    };

    const handleUnequalAmountChange = (memberId, value) => {
        setUnequalAmounts(prevState => ({
            ...prevState,
            [memberId]: value
        }));
    };

    const isUnequalAmountValid = () => {
        let total = 0;
        for (const memberId in unequalAmounts) {
            total += parseInt(unequalAmounts[memberId] || 0);
        }
        return total === parseInt(amount);
    };

    return (
        <div className="settle-container">
            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-element">
                    <label className="label">Select Group:</label>
                    <select className="select" value={selectedGroup} onChange={handleGroupChange}>
                        <option value="">Select a group</option>
                        {groups.map(group => (
                            <option key={group.id} value={group.id}>{group.groupName}</option>
                        ))}
                    </select>
                </div>
                <div className="form-element">
                    <label className="label">Amount:</label>
                    <input className="input" type="number" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>
                {selectedGroup && (
                    <div className="form-element">
                        <label className="label">Select Members:</label>
                        <div className="member-checkboxes">
                            {members.map(member => (
                                <label key={member.id} className="member-checkbox">
                                    <input
                                        type="checkbox"
                                        value={member.id}
                                        checked={selectedMembers.includes(member.id)}
                                        onChange={() => handleCheckboxChange(member.id)}
                                    />
                                    {member.username}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {selectedMembers.length > 0 && (
                    <div className="form-element">
                        <label className="label">Split Equally:</label>
                        <input
                            type="checkbox"
                            checked={splitEqually}
                            onChange={handleSplitEquallyChange}
                        />
                    </div>
                )}
                {!splitEqually && selectedMembers.length > 0 && (
                    <div className="unequal-amounts">
                        {selectedMembers.map(memberId => (
                            <div key={memberId} className="form-element">
                                <label
                                    className="label">{`Amount for ${members.find(member => member.id === memberId).username}:`}</label>
                                <input
                                    className="input"
                                    type="number"
                                    value={unequalAmounts[memberId] || ''}
                                    onChange={e => handleUnequalAmountChange(memberId, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                )}
                <div className="form-element">
                    <label className="label">Description:</label>
                    <input className="input" type="text" value={description}
                           onChange={(e) => setDescription(e.target.value)}/>
                </div>

                {error && <p className="error">{error}</p>}
                <button className="button" type="submit">Add Expense</button>
            </form>
        </div>
    );
};

export default AddExpense;