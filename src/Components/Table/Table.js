import React, { useState } from 'react';
import "./Table.css";
import UserRow from './UserRow';

function Table({ data, searchQuery, selectedRole }) {
    const [tableData, setTableData] = useState(data);

    // Filter data based on search query and selected role
    React.useEffect(() => {
        let filteredData = data;

        if (searchQuery !== "") {
            filteredData = filteredData.filter((row) => row.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (selectedRole !== "") {
            filteredData = filteredData.filter((row) => row.roles.includes(selectedRole));
        }

        setTableData(filteredData);
    }, [searchQuery, selectedRole, data]);

    const handleDelete = (id) => {
        // Filter out the row with the given id
        const updatedData = tableData.filter(row => row.id !== id);
        // Update the state with the new data
        setTableData(updatedData);
    };

    const handleRoleChange = (id, role) => {
        const updatedData = tableData.map((row) => {
            if (row.id !== id) return row; // Only update the target row
    
            // Prevent changes for "Administrador" role
            if (row.roles.includes("Administrador")) return row;
    
            // Prevent "Alumno" role from being changed or having roles changed if the user is an "Alumno"
            if (row.roles.includes("Alumno") || role === "Alumno") return row;
    
            // Handle role changes between "Profesor" and "Juez" only
            if (role === "Profesor" || role === "Juez") {
                if (row.roles.includes(role)) {
                    // Remove role if user has more than one role
                    if (row.roles.length > 1) {
                        return { ...row, roles: row.roles.filter((r) => r !== role) };
                    }
                } else {
                    // Add the new role
                    return { ...row, roles: [...row.roles, role] };
                }
            }
            return row;
        });
        setTableData(updatedData);
    };
    

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        {/* Headers */}
                        <th className="text-center">Usuarios</th>
                        <th className="text-center">Roles</th>
                        <th className="text-center">Administrar</th>
                        {/* Add more headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {/* Rows */}
                    {tableData.map((user) => (
                        <UserRow 
                            key={user.id} 
                            user={user} 
                            onDelete={handleDelete} 
                            onRoleChange={(role) => handleRoleChange(user.id, role)} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
