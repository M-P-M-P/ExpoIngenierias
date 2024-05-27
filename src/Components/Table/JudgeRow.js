import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function JudgeRow({ user }) {
    const { projectId } = useParams(); // Use react-router-dom to get the projectId from the URL
    const [assigned, setAssigned] = useState(false);
    
    const assignJudge = () => {
        axios.post(`http://localhost:8000/Admin/assignProjectJudge`, {
            judgeId: user.id, // Assuming judgeId is fixed for now
            projectId: projectId // Assuming projectId is taken from the URL
        })
        .then(response => {
            // Handle successful assignment
            setAssigned(true);
        })
        .catch(error => {
            console.error('There was an error assigning the judge to the project:', error);
        });
    };

    const removeJudge = () => {
        axios.delete(`http://localhost:8000/Admin/remove/projects/${projectId}/judges/${user.id}`)
        .then(response => {
            // Handle successful removal
            setAssigned(false);
        })
        .catch(error => {
            console.error('There was an error removing the judge from the project:', error);
        });
    };

    useEffect(() => {
        if (projectId) {
            axios.get(`http://localhost:8000/Admin/getProjectJudges`, {
                params: { projectId }
            })
            .then(response => {
                // Assuming response.data contains the list of judge IDs as strings
                const judgeIds = response.data;
                if (judgeIds.includes(user.id)) {
                    setAssigned(true);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the project judges:', error);
            });
        }
    }, [projectId, user.id]);

    return (
        <tr key={user.id}>
            {/* First column */}
            <td className="text-center">
                {user.name}
            </td>
        
            {/* Second column - Conditionally render button based on isJudge */}
            <td className="text-center">
                {assigned ? (
                    <button className="btn btn-danger" onClick={removeJudge}>Eliminar</button>
                ) : (
                    <button className="btn btn-primary custom-primaty-btn" onClick={assignJudge}>Asignar</button>
                )}
            </td>
        </tr>
    );
}

export default JudgeRow;
