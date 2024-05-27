import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function JudgeRow({ user }) {
    const { projectId } = useParams(); // Use react-router-dom to get the projectId from the URL
    const [asignJudge, setAsignJudge] = useState(false);

    useEffect(() => {
        if (projectId) {
            axios.get(`http://localhost:8000/Admin/getProjectJudges`, {
                params: { projectId }
            })
            .then(response => {
                // Assuming response.data contains the list of judge IDs as strings
                const judgeIds = response.data;
                if (judgeIds.includes(user.id)) {
                    setAsignJudge(true);
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
                {asignJudge ? (
                    <button className="btn btn-danger">Eliminar</button>
                ) : (
                    <button className="btn btn-primary custom-primaty-btn">Asignar</button>
                )}
            </td>
        </tr>
    );
}

export default JudgeRow;
