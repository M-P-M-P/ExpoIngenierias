import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './CategoriesCard.css';
import imagen1 from './1.png';
import imagen2 from './2.png';
import imagen3 from './3.png';
import imagenLoco from './Areas.png';


function CategoriesCard({data}){
    const {id,title,description} = data;
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

    const imagen = (title)=>{
        if(title==="Concepto"){
            return imagen1;
        }else if(title==="Prototipo"){
          return imagen2;

        }else if(title==="Producto"){
          return imagen3;
        }else{
          return imagenLoco;
        }
    };

    return (
        <div className='tar'>
            <img src={imagen(`${title}`)} className="card-img-top" alt="Project Image"/>
            <div className='contenido'>
            <h2>{truncateString(`${title}`,10)}</h2>
            <p>{truncateString(`${description}`,53)}</p>
            <Link to={`/Areas/${id}`} className="btn btn-primary custom-primaty-btn btnPrin">Editar</Link>
            <button className="btn  btn-danger mx-2 btnElim" onClick={handleDescalify}>Eliminar</button>
            </div>
        </div>
    );
}

export default function CategoriesCardList({data}){
    let categoriesInfo=data;
    return(
        <div className="contenedor row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
        {categoriesInfo.map(categories => (
          <div key={categories.id} className='tarjeta'>
            <CategoriesCard data={categories} />
          </div>
        ))}
      </div>
  );
}