import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './AreaCard.css';
import imagen from './Areas.png';
function Areacard({data}){
    const {id,name,description} = data;
    const truncateString = (str, num) => {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + ' . . .';
    };

    const handleDescalify = () => {
        const confirmed = window.confirm("Estas seguro de que quieres descalificar el proyecto?");
        if (confirmed) {
          // Add your logic to descalify the project here
        }
      };

    return (
        <div className='tar'>
            <img src={imagen} className="card-img-top" alt="Project Image"/>
            <div className='contenido'>
            <h2>{truncateString(`${name}`,7)}</h2>
            <p>{truncateString(`${description}`,53)}</p>
            <Link to={`/Areas/${id}`} className="btn btn-primary custom-primaty-btn btnPrin">Editar</Link>
            <button className="btn  btn-danger mx-2 btnElim" onClick={handleDescalify}>Eliminar</button>
            </div>
        </div>
    );
}

export default function AreasCardList({data}){
    let areasInfo=data;
    return(
        <div className="contenedor row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
        {areasInfo.map(area => (
          <div key={area.id} className='tarjeta'>
            <Areacard data={area} />
          </div>
        ))}
      </div>
  );
}