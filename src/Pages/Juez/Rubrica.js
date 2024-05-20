import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Rubrica.css';
import NavigationBar from '../../Components/NavigationBar/Judge/NavigationBar';

const Rubrica = () => {
  const [criteria, setCriteria] = useState([]);
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [comments, setComments] = useState([]);
  const [additionalComment, setAdditionalComment] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/criterias');
        const data = await response.json();
        setCriteria(data);
        setSelectedCriteria(Array(data.length).fill(0));
        setComments(Array(data.length).fill(''));
      } catch (error) {
        console.error('Error al obtener los criterios:', error);
      }
    };

    fetchCriteria();
  }, []);

  const handleSliderChange = (index, value) => {
    setSelectedCriteria(prevSelectedCriteria => {
      const newSelectedCriteria = [...prevSelectedCriteria];
      newSelectedCriteria[index] = value;
      return newSelectedCriteria;
    });
  };

  const handleCommentChange = (index, value) => {
    setComments(prevComments => {
      const newComments = [...prevComments];
      newComments[index] = value;
      return newComments;
    });
  };

  const handleAdditionalCommentChange = (value) => {
    setAdditionalComment(value);
  };

  const handleSubmit = () => {
    if (additionalComment.trim().length < 100) {
      setShowErrorMessage(true);
      return;
    }

    const totalScore = selectedCriteria.reduce((acc, value) => acc + value, 0);

    const criteriaMessage = selectedCriteria.map((value, index) => {
      return `${criteria[index].description}: Score: ${value}\nComentario: ${comments[index]}`;
    }).join('\n');

    if (window.confirm(`¿Estás seguro de que deseas enviar tu rúbrica?\n\nPuntaje Total: ${totalScore / 5}\n${criteriaMessage}\nComentario adicional: ${additionalComment}`)) {
      window.location.href = './ProyectosJuez';
    }
  };

  return (
    <>
      <NavigationBar NameSection={"Rúbrica"} />
      <div className="container">
        <h1>CALIFICA EL PROYECTO EN BASE A LA RÚBRICA</h1>
        <div className="rubrica-container">
          {criteria.map((criterion, index) => (
            <div className="criterion" key={index}>
              <h3>{criterion.description}</h3>
              <p>Calificación: {selectedCriteria[index]}</p>

              <div className="PB-range-slider-div">
                <p>0 (Deficiente)</p>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={selectedCriteria[index]}
                  onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                  id={`myRange${index}`}
                />
                <p>5 (Excelente)</p>
              </div>
              <textarea
                placeholder={`Comentarios adicionales sobre ${criterion.description}`}
                className="comment-box"
                value={comments[index]}
                onChange={(e) => handleCommentChange(index, e.target.value)}
              />
            </div>
          ))}
          <textarea
            placeholder="Comentario adicional sobre el proyecto (mínimo 100 caracteres)"
            className="comment-box"
            value={additionalComment}
            onChange={(e) => handleAdditionalCommentChange(e.target.value)}
          />
          {showErrorMessage && additionalComment.trim().length < 100 && <p className="error-message">Por favor, ingresa un comentario adicional con al menos 100 caracteres.</p>}
          <div className="buttons-container2">
            <Link to="/ProyectosJuez" className="btn2">Cancelar</Link>
            <button onClick={handleSubmit} className="btn3">Enviar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rubrica;
