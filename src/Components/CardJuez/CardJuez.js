import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Juez.css';
import Badge from '../Badge/Badge.js';
import { useParams } from 'react-router-dom';


function CardCalif({ projectId, title, nivelDesarrollo, description, categoria, idpersona }) {
  const [status, setStatus] = useState('No calificado');
  const badgeClassName = status === 'No calificado' ? 'badge2' : 'badge3';
  const btnClassName = status === 'No calificado' ? 'btncalif' : 'btncalifdisable';
  const btnText = status === 'No calificado' ? 'Calificar' : 'Calificado';
  const calificarLink = status === 'No calificado' ? `/Juez/${idpersona}/Calificar/${projectId}` : null;

  useEffect(() => {
    const fetchCommentStatus = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/comments/${idpersona}/${projectId}`);
        if (response.ok) {
          setStatus('Calificado');
        } else {
          setStatus('No calificado');
        }
      } catch (error) {
        console.error('Error al verificar el estado del comentario:', error);
      }
    };

    fetchCommentStatus();
  }, [idpersona, projectId]);

  const truncateText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + '...';
  };

  return (
    <div className="card">
      <div className="imag">
        <img src={require("../../Assets/CardProto.png")} alt={title} />
      </div>

      <div className="text">
        <p className="h3">{truncateText(title, 50)}</p>
        <p className="p">{truncateText(description, 100)}</p>

        <div className="badge-container">
          <Badge data={categoria} className="badge" />
          <Badge data={nivelDesarrollo} className="badge" />
          <Badge data={status} className={badgeClassName} />
        </div>

        <Link to={`/Juez/${idpersona}/ProyectoJuez/${projectId}`} className="btn23">Ver Proyecto</Link>

        {calificarLink ? (
          <Link to={calificarLink} className={btnClassName}>{btnText}</Link>
        ) : (
          <span className={btnClassName}>{btnText}</span>
        )}
      </div>
    </div>
  );
}

export function Cardlist() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState({});
  const [areas, setAreas] = useState({});
  const { idpersona } = useParams();

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
        })
        .catch(error => console.error('Error al obtener los proyectos:', error));
    })
    .catch(error => console.error('Error al obtener los proyectos asignados al juez:', error));


  
    /*
    VER TODOS LOS PROYECTOS
    fetch('http://localhost:8000/api/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error al obtener los proyectos:', error));
      
      */

    // Realizar la llamada al servidor para obtener las categorías
    fetch('http://localhost:8000/api/categories')
      .then(response => response.json())
      .then(data => {
        // Organizar las categorías en un objeto por id para facilitar la búsqueda
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
        // Organizar las áreas en un objeto por id para facilitar la búsqueda
        const areaMap = {};
        data.forEach(area => {
          areaMap[area.id] = area.name;
        });
        setAreas(areaMap);
      })
      .catch(error => console.error('Error al obtener las áreas:', error));
  }, []);

  return (
    <>
      {projects.map(project =>
        <CardCalif
          projectId={project.id}
          title={project.title}
          description={project.description}
          categoria={categories[project.id_category]}
          nivelDesarrollo={areas[project.id_area]}
          idpersona={idpersona}
          key={project.id}
        />
      )}
    </>
  );
}




//general
