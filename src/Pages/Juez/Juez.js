import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from '../../Components/NavigationBar/Judge/NavigationBar';
import { Cardlist } from '../../Components/CardJuez/CardJuez';
import Loader from '../../Components/Loader/Loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

function PageJuez() {
  const { idpersona } = useParams();
  const [filterText, setFilterText] = useState("");
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState({});
  const [areas, setAreas] = useState({});
  const [loading, setLoading] = useState(true);  // Estado de carga

  useEffect(() => {
    // Realizar la llamada al servidor para obtener los proyectos asignados al juez
    fetch(`http://localhost:8000/api/judgeProjects/${idpersona}`)
      .then(response => response.json())
      .then(projectIds => {
        // Realizar la segunda llamada al servidor para obtener todos los proyectos
        fetch('http://localhost:8000/api/projects')
          .then(response => response.json())
          .then(allProjects => {
            // Filtrar proyectos con los IDs obtenidos del primer fetch
            const filteredProjects = allProjects.filter(project => projectIds.includes(project.id));
            setProjects(filteredProjects);
            setLoading(false);  // Desactivar el estado de carga
          })
          .catch(error => {
            console.error('Error al obtener los proyectos:', error);
            setLoading(false);  // Desactivar el estado de carga en caso de error
          });
      })
      .catch(error => {
        console.error('Error al obtener los proyectos asignados al juez:', error);
        setLoading(false);  // Desactivar el estado de carga en caso de error
      });

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
  }, [idpersona]);

  function handleChange(e) {
    setFilterText(e.target.value);
  }

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(filterText.toLowerCase())
  );

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
          {loading ? (
            <Loader />  // Mostrar el loader mientras se cargan los datos
          ) : (
            <Cardlist
              projects={filteredProjects}
              categories={categories}
              areas={areas}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default PageJuez;
