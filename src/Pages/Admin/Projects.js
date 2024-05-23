import React, { useState } from 'react';
import ProjectCardsList from '../../Components/ProjectCard/ProjectCard';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar'
import SearchBar from '../../Components/SearchBar/SearchBar';
import DropdownMenu from '../../Components/DropdownMenu/DropdownMenu'; // Import DropdownMenu component
import { dropdownOptions } from '../../MockData/MockData';
import '../../Components/ProjectCard/ProjectCard.css'

const URI='http://localhost:8000/Ediciones/'


function Projects() {
    const [selectedEdition, setSelectedEdition] = useState(null); // State to track selected edition
    const [searchTerm, setSearchTerm] = useState(""); // State to track search term

    const handleEditionSelect = (edition) => {
        setSelectedEdition(edition);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <>  
            <NavigationBar NameSection={"Proyectos"}/>
            <div className="container-fluid mt-3">
                <div className="contenedor">
                    <SearchBar onSearch={handleSearch} />
                        <DropdownMenu 
                            title="Selecciona la Edición"
                            url={URI}
                            onSelect={(edition) => {
                                if (edition === "Selecciona la Edición") {
                                    setSelectedEdition(null);
                                } else {
                                    setSelectedEdition(edition);
                                }
                            }}
                        />   
                </div>
                <div className="contenedor">
                    <ProjectCardsList filter={selectedEdition} searchTerm={searchTerm} />
                </div>
            </div>
        </>
    );
}

export default Projects;
