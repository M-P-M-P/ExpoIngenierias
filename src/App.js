import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Admin
import Dashboard from './Pages/Admin/Dashboard';
import Historical from './Pages/Admin/Historical';
import Users from './Pages/Admin/Users';
import EditUserPage from './Pages/Admin/EditUserPage';
import Projects from './Pages/Admin/Projects';
import ProjectPage from './Pages/Admin/ProjectPage';

// Judge
import Juez from './Pages/Juez/Juez';
import Proyectos from './Pages/Juez/Proyectos';
import ProjResumeCont from './Pages/Juez/ProjectResumenContent';
import Rubrica from './Pages/Juez/Rubrica';
import Anuncios from './Pages/Juez/Announ';
import DetailedAnnoun from './Pages/Juez/DetailedAnnoun';

function App() {
  return (
    <Router>
      <div>
        <MainContent />
      </div>
    </Router>
  );
}

function MainContent() {
  const defaultIdPersona = 5;  // Define un valor por defecto para idpersona por ahora antes de poner el auth0

  const location = useLocation(); // Get current location
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    // Update the page title whenever the location changes
    setPageTitle(getTitle(location.pathname));
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={`/Juez/${defaultIdPersona}`} />} />
        <Route path="/historico" element={<Historical />} />
        <Route path="/usuarios" element={<Users />} />
        <Route path="/usuarios/:userId" element={<EditUserPage />} />
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/proyecto/:id" element={<ProjectPage setPageTitle={setPageTitle} />} />

        <Route path="/Juez/:idpersona" element={<Juez />} />
        <Route path="/Juez/general" element={<Proyectos />} />
        <Route path="/Juez/Anuncios" element={<Anuncios />} />
        <Route path="/Juez/Anuncios/:anuncioId" element={<DetailedAnnoun />} />
        <Route path="/Juez/:idpersona/Calificar/:projectId" element={<Rubrica />} />
        <Route path="/Juez/:idpersona/ProyectoJuez/:projectId" element={<ProjResumeCont />} />

{/*
        <Route path='/ProyectosJuez' element={<Juez />}/>
        <Route path="/ProyectoJuez/:projectId" element={<ProjResumeCont />} />
        <Route path="/Calificar/:projectId" element={<Rubrica />} />
        */}
      </Routes>
    </>
  );
}

// Function to get title based on the current route
const getTitle = (pathname) => {
  switch (pathname) {
    case '/':
      return 'Tablero';
    case '/historico':
      return 'Historico';
    case '/usuarios':
      return 'Usuarios';
    case '/proyectos':
      return 'Proyectos';
    default:
      return 'Your Default Title';
  }
};

export default App;