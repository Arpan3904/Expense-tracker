import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CssFiles/Dashboard.css';
import axios from 'axios';

const Dashboard = ({ expenses }) => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/groups');
            setGroups(response.data.map(group => ({ ...group, showMembers: false })));
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const toggleMemberList = async (groupId) => {
        const updatedGroups = groups.map(group => {
            if (group.id === groupId) {
                return { ...group, showMembers: !group.showMembers };
            } else {
                return group;
            }
        });
        setGroups(updatedGroups);
    };

    return (
        <div className="dashboard-container">
            <div>
                <h2>Groups:</h2>
                <ul className="group-list">
                    {groups.map(group => (
                        <li key={group.id}>
                            <div className="group-name" onClick={() => toggleMemberList(group.id)}>
                                {group.groupName}
                                <button>{group.showMembers ? '▲' : '▼'}</button>
                            </div>
                            {group.showMembers && (
                                <ul className="member-list">
                                    {group.members.map(member => (
                                        <li key={member.id}>{member.username}</li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="button-container">
                {/* Buttons for navigation */}
                <Link to="/add-expense">
                    <button>Add Expense</button>
                </Link>
                <Link to="/settle">
                    <button>Settle</button>
                </Link>
                <Link to="/add-group">
                    <button>Add Group</button>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;