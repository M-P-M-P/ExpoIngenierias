import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import { useParams } from 'react-router-dom';
import NavigationBar from '../../Components/NavigationBar/Judge/NavigationBar';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import './Page.css';
import './Resume.css';
import React, { useState, useEffect } from 'react';

function RubricaCalf({ Calf1, Calf2, Calf3, Calf4, Calf5, Rubri1, Rubri2, Rubri3, Rubri4, Rubri5 }) {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header><span className='Subtitulo'>Calificación rubro 1: </span> <span className='Texto Resultado'>{Calf1 + " pts"}</span></Accordion.Header>
        <Accordion.Body>{Rubri1}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header><span className='Subtitulo'>Calificación rubro 2: </span> <span className='Texto Resultado'>{Calf2 + " pts"}</span></Accordion.Header>
        <Accordion.Body>{Rubri2}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header><span className='Subtitulo'>Calificación rubro 3: </span> <span className='Texto Resultado'>{Calf3 + " pts"}</span></Accordion.Header>
        <Accordion.Body>{Rubri3}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header><span className='Subtitulo'>Calificación rubro 4: </span> <span className='Texto Resultado'>{Calf4 + " pts"}</span></Accordion.Header>
        <Accordion.Body>{Rubri4}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header><span className='Subtitulo'>Calificación rubro 5: </span> <span className='Texto Resultado'>{Calf5 + " pts"}</span></Accordion.Header>
        <Accordion.Body>{Rubri5}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function InfoProj({ lead, profLead, memeber }) {
  return (
    <div className='col-md-3 '>
      <div className="Info m-2 p-4">
        <h1 className="Titulo text-wrap ps-0">Información del proyecto</h1>
        <div className='container-fluid p-1'>
          <div className="row pb-1">
            <div className='col-md pe-0'>
              <span className="Subtitulo">Líder:</span>
            </div>
          </div>
          <div className='row pb-4'>
            <div className='col-md ps-0'>
              <span className="Texto text-wrap ps-3">{lead}</span>
            </div>
          </div>
          <div className="row pb-1">
            <div className='col-md pe-0'>
              <span className="Subtitulo">Profesor líder:</span>
            </div>
          </div>
          <div className="row pb-4">
            <div className='col-md ps-0'>
              <span className="Texto text-wrap ps-3">{profLead}</span>
            </div>
          </div>
          <div className="row pb">
            <div className='col-md pe-0'>
              <span className="Subtitulo">Miembros del proyecto:</span>
            </div>
          </div>
          <div className="row pb-1">
            <div className='col-md ps-0'>
              <p className="Texto text-wrap ps-3">{memeber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjResume({ type, area, descr, title }) {
  const truncateText = (text, limit) => {
    if (!text || typeof text !== 'string' || text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + '...';
  };

  return (
    <div className='col-md-6 ps-4 pe-4 '>
      <div className="container-fluid BGResume  w-100 ">
        <div className="row p-1 BGBar">
          <div className="col proj-sub-bold text-start"><span className='gemelo'>Nivel de Desarrollo: {type}</span></div>
          <div className="col proj-sub-bold text-end"><span className='gemelo'>{area}</span></div>
        </div>
        <div className='m-4 p-0'>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xxl-5 proj-sub text-start"><p className='text-break'>{truncateText(descr, 207)}</p></div>
              <div className="col-xxl-7 proj-tit text-end'wrap "><p className='text-break'>{title}</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function ProjVal({ commentStatus }) {
  const params = useParams();

  return (
    <div className='col-md-3'>
      <div className="Info2 m-2 p-4">
        <div className="row pb-3 mt-3">
          <div className='col-md-auto'>
            <span className="Subtitulo1">Estado:</span>
          </div>
          <div className='col-md-auto'>
            <span className="Subtitulo1">{commentStatus === "Calificado" ? "Calificado" : "No Calificado"}</span>
          </div>
          {commentStatus === "Calificado" ? (
            <Link className="btn6"disabled>Proyecto Calificado</Link>
          ) : (
            <Link to={`/Juez/${params.idpersona}/Calificar/${params.projectId}`} className="btn4" >CALIFICAR PROYECTO</Link>
          )}
          <Link to={`/Juez/${params.idpersona}`} className="btn5">Regresar a Mis Proyectos</Link>
        </div>
      </div>
    </div>
  );
}


function JuezContComment({ comment, id_judge }) {
  return (
    <div className='container-fluid p-3 mt-3 mb-3 ContCommentIndiJudge'>
      <div className="row align-items-center">
        <div className='col-md-auto'>
          <p className='text-wrap fw-bold'>Comentario del juez {id_judge}:</p>
        </div>
      </div>
      <div className="row pb-3 align-items-center">
        <div className='col-md-auto '>
          <p className='text-break ComentariosCOntenidoWrap'>{comment}</p>
        </div>
      </div>
    </div>
  );
}

function CommentCont({ role, comment }) {
  return (
    <>
      {role === 'Juez' && (
        <div className="col-xxl-3 SilderCont">
          <h1 className="Titulo ps-0">Comentarios de {role}</h1>
          <JuezContComment comment={comment} id_judge={1} />
          <JuezContComment comment={comment} id_judge={1} />
          <JuezContComment comment={comment} id_judge={1} />
          <JuezContComment comment={comment} id_judge={1} />
        </div>
      )}
    </>
  );
}

function Rubrica({ criterias }) {
  const [selectedCriterio, setSelectedCriterio] = useState(null);

  const handleCriterioChange = (index) => {
    setSelectedCriterio(index !== "" ? parseInt(index) : null);
  };

  return (
    <div className="col-xxl-3 h-75">
      <h1 className="Titulo ps-0">Desgloce de rubrica</h1>
      <div className='container-fluid p-1 mb-3'>
        <select className="form-select" onChange={(e) => handleCriterioChange(e.target.value)}>
          <option value="">Seleccione un criterio...</option>
          {criterias && criterias.map((criteria, index) => (
            <option key={index} value={index}>{criteria.description}</option>
          ))}
        </select>
        {selectedCriterio !== null ? (
          <div>
            <h1>Otogarste 0/5 en el criterio de {criterias[selectedCriterio].description}</h1>
            
            {/* Aquí puedes agregar la lógica para mostrar los demás detalles del criterio */}
          </div>
        ) : (
          <p>Seleccione un criterio que desee ver</p>
        )}
      </div>
    </div>
  );
}






function FinalCalf({ finalCalf }) {
  return (
    <div className='col-xxl-3 h-50'>
      <h1 className="Titulo text-break">Calificación Otorgada</h1>
      <div className='container-fluid p-1 centered-FinalRescontainer '>
        <div className="row pb-3 align-items-center">
          <div className='col-md-auto ContFinalRes text-center p-3'>
            <span className="FinalResul text-center">{finalCalf}/100</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente ProjResumeCont
export default function ProjResumeCont() {
  const { idpersona, projectId } = useParams();
  const [projectInfo, setProjectInfo] = useState(null);
  const [categories, setCategories] = useState({});
  const [areas, setAreas] = useState({});
  const [studentInfo, setStudentInfo] = useState(null);
  const [professorInfo, setProfessorInfo] = useState(null);
  const [commentStatus, setCommentStatus] = useState("No Calificado");
  const [criterias, setCriterias] = useState([]);

  useEffect(() => {
    // Obtener los criterios de la rúbrica desde la API
    fetch('http://localhost:8000/api/criterias')
      .then(response => response.json())
      .then(data => {
        // Obtener solo los primeros 5 criterios
        const firstFiveCriterias = data.slice(0, 5);
        setCriterias(firstFiveCriterias);
      })
      .catch(error => console.error('Error fetching criterias:', error));

    // Obtener la información del proyecto
    fetch(`http://localhost:8000/api/projects/${projectId}`)
      .then(response => response.json())
      .then(data => {
        setProjectInfo(data);
        if (data && data.id_responsable) {
          fetch(`http://localhost:8000/api/persons/${data.id_responsable}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Error al obtener la información del profesor.');
              }
              return response.json();
            })
            .then(data => setProfessorInfo(data))
            .catch(error => console.error('Error fetching professor info:', error));
        }
        if (data && data.id_lider) {
          fetch(`http://localhost:8000/api/students/${data.id_lider}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Error al obtener la información del estudiante.');
              }
              return response.json();
            })
            .then(data => setStudentInfo(data))
            .catch(error => console.error('Error fetching student info:', error));
        }
        // Verificar si hay comentarios para este proyecto
        fetch(`http://localhost:8000/api/comments/${idpersona}/${projectId}`)
          .then(response => {
            if (response.ok) {
              setCommentStatus("Calificado");
            } else {
              setCommentStatus("No Calificado");
            }
          })
          .catch(error => console.error('Error fetching comments:', error));
      })
      .catch(error => console.error('Error fetching project info:', error));

    // Obtener las categorías
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

    // Obtener las áreas
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
  }, [projectId, setStudentInfo, setProfessorInfo, idpersona]);

  return (
    <>
      <NavigationBar NameSection={"Proyecto"} />
      <div className='container-fluid centered-container mt-3 '>
        <div className='container-fluid'>
          <div className='row justify-content-between d-flex align-items-center'>
            {studentInfo && professorInfo && (
              <InfoProj lead={`${studentInfo.name} ${studentInfo.lastName}`} profLead={`${professorInfo.name} ${professorInfo.lastName}`}  memeber={"Marcela Dominguez"} />
            )}
            {projectInfo && (
              <ProjResume
                type={categories[projectInfo.id_category]}
                area={areas[projectInfo.id_area]}
                descr={projectInfo.description}
                title={projectInfo.title}
                profesor={projectInfo.id_responsable}
              />
            )}
            {projectInfo && (
              <ProjVal commentStatus={commentStatus} />
            )}
          </div>
          <div className='row m-2 justify-content-between d-flex align-items-center w-100 mb-4'>
            <div className='Info col-md-12'>
              <div className="m-auto p-4">
                <div className='container-fluid'>
                  <div className='row'>
                    <div className='row'>
                      <CommentCont role={"Profesor"} comment={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."} />
                      <CommentCont role={"Juez"} comment={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."} />
                      <Rubrica
                        criterias={criterias}
                      />
                      <FinalCalf finalCalf={"9"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
