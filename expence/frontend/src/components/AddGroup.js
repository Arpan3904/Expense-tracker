import React, { useState } from 'react';
import axios from "axios";
import './CssFiles/Settle.css'; // Import CSS file for styling

const AddGroup = () => {
    const [groupName, setGroupName] = useState('');
    const [memberName, setMemberName] = useState('');
    const [members, setMembers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleGroupNameChange = (e) => {
        setGroupName(e.target.value);
    };

    const handleMemberNameChange = (e) => {
        setMemberName(e.target.value);
    };

    const handleAddMember = async () => {
        if (memberName.trim() !== '') {
            try {
                // Check if the member exists in the user table
                const response = await axios.get(`http://localhost:8080/api/users/checkuser/${memberName.trim()}`);
                console.log(response.status);
                console.log(response.data);

                if (response.data) {
                    setMembers(prevMembers => [...prevMembers, response.data]);
                    setMemberName(''); // Clear input after successful addition
                    setErrorMessage(''); // Clear error message if any
                } else {
                    window.alert("person is not exist");
                }
            } catch (error) {
                console.error('Error checking user:', error);
            }
        }
    };

    const handleRemoveMember = (index) => {
        const updatedMembers = [...members];
        updatedMembers.splice(index, 1);
        setMembers(updatedMembers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Prepare request body
            const requestBody = JSON.stringify({ groupName, members });

            // Make POST request to add group
            const groupResponse = await fetch('http://localhost:8080/api/addgroup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: requestBody
            });

            // Check if request was successful
            if (groupResponse.ok) {
                console.log("Group added successfully! " + groupName);
                console.log("mmm"+members);
                // Reset state after successful submission
                setGroupName('');
                setMembers([]);
                console.log("State reset successfully!");
            } else {
                // Handle error response
                const errorData = await groupResponse.json();
                console.error('Error during Add Group:', errorData);
            }
        } catch (error) {
            console.error('Error during Add Group:', error);
        }
    };

    return (
        <div className="addGroupContainer">
            <h2>Create Group</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter group name"
                    value={groupName}
                    onChange={handleGroupNameChange}
                    className="inputField"
                />
                <br />
                <input
                    type="text"
                    placeholder="Enter member name"
                    value={memberName}
                    onChange={handleMemberNameChange}
                    className="inputField"
                />
                <button type="button" onClick={handleAddMember} className="addMemberButton">Add Member</button>
                <br />
                {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                {members.map((member, index) => (
                    <div key={index} className="memberItem">
                        <span>{member.username}</span>
                        <button type="button" onClick={() => handleRemoveMember(index)} className="removeMemberButton">Remove</button>
                    </div>
                ))}
                <br />
                <button type="submit" className="submitButton">Add Group</button>

            </form>
        </div>
    );
};

export default AddGroup;
