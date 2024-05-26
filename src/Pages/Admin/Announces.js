import React, { useState } from 'react';
import ProjectCardsList from '../../Components/ProjectCard/ProjectCard';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar'
import SearchBar from '../../Components/SearchBar/SearchBar';
import DropdownMenu from '../../Components/DropdownMenu/DropdownMenu'; // Import DropdownMenu component
import { dropdownOptions } from '../../MockData/MockData';
import '../../Components/ProjectCard/ProjectCard.css'

function Announces(){
    return(
        <>
            <NavigationBar NameSection={"Anuncios"}/>
        </>
    );
}

export default Announces;