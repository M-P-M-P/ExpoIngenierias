import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Admin
import Dashboard from './Pages/Admin/Dashboard';
import Historical from './Pages/Admin/Historical';
import Users from './Pages/Admin/Users';
import EditUserPage from './Pages/Admin/EditUserPage';
import Projects from './Pages/Admin/Projects';
import ProjectPage from './Pages/Admin/ProjectPage';

// Judge
import Juez from './Pages/Juez/Juez';
import ProjResumeCont from './Pages/Juez/ProjectResumenContent';
import Rubrica from './Pages/Juez/Rubrica';
import Announces from './Pages/Admin/Announces';
import Areas from './Pages/Admin/Areas';

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
  const location = useLocation(); // Get current location
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    // Update the page title whenever the location changes
    setPageTitle(getTitle(location.pathname));
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/historico" element={<Historical />} />
        <Route path="/usuarios" element={<Users />} />
        <Route path="/usuarios/:userId" element={<EditUserPage />} />
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/proyectos/:projectId" element={<ProjectPage setPageTitle={setPageTitle} />} />
        <Route path="/proyecto/:id" element={<ProjectPage setPageTitle={setPageTitle} />} />
        <Route path="/anuncios" element={<Announces/>}/>
        <Route path="/areas" element={<Areas/>}/>


        <Route path='/ProyectosJuez' element={<Juez />}/>
        <Route path="/ProyectoJuez/:projectId" element={<ProjResumeCont />} />
        <Route path="/Calificar/:projectId" element={<Rubrica />} />
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
