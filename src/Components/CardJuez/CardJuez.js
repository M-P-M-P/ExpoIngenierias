import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Juez.css';
import Badge from '../Badge/Badge.js';

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

export function Cardlist({ projects, categories, areas }) {
  const defaultIdPersona = 5;  // Define un valor por defecto para idpersona por ahora antes de poner el auth0

  return (
    <>
      {projects.map(project =>
        <CardCalif
          projectId={project.id}
          title={project.title}
          description={project.description}
          categoria={categories[project.id_category]}
          nivelDesarrollo={areas[project.id_area]}
          idpersona={defaultIdPersona}
          key={project.id}
        />
      )}
    </>
  );
}
