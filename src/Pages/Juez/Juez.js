import React, { useState, useEffect } from 'react';
import NavigationBar from '../../Components/NavigationBar/Judge/NavigationBar';
import { Cardlist } from '../../Components/CardJuez/CardJuez.js';

function PageJuez() {
  const [filterText, setFilterText] = useState("");
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState({});
  const [areas, setAreas] = useState({});

  useEffect(() => {
    // Realizar la llamada al servidor para obtener los proyectos
    fetch('http://localhost:8000/api/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error al obtener los proyectos:', error));

    // Realizar la llamada al servidor para obtener las categorías
    fetch('http://localhost:8000/api/categories')
      .then(response => response.json())
      .then(data => {
        const categoryMap = {};
        data.forEach(category => {
          categoryMap[category.id] = category.title;
        });
        setCategories(categoryMap);
      })
      .catch(error => console.error('Error al obtener las categorías:', error));

    // Realizar la llamada al servidor para obtener las áreas
    fetch('http://localhost:8000/api/areas')
      .then(response => response.json())
      .then(data => {
        const areaMap = {};
        data.forEach(area => {
          areaMap[area.id] = area.name;
        });
        setAreas(areaMap);
      })
      .catch(error => console.error('Error al obtener las áreas:', error));
  }, []);

  function handleChange(e) {
    setFilterText(e.target.value);
  }

  return (
    <>
      <NavigationBar NameSection={"Proyectos"} />
      <div className="container-fluid">
        <div className="centered-content">
          <input
            placeholder="Buscar proyecto por nombre"
            type="text"
            name="text"
            className="input"
            value={filterText}
            onChange={handleChange}
          />
        </div>
        <div className="proyectos">
          <Cardlist
            filterText={filterText}
            categories={categories}
            areas={areas}
          />
        </div>
      </div>
    </>
  );
}

export default PageJuez;
