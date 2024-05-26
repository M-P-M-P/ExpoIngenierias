import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Widget from '../../Components/Widget/Widget';
import VideoCard from '../../Components/VideoCard/VideoCard';
import AssignJudge from '../../Components/AsignJudge/AsignJudge';
import ProjectScore from '../../Components/ProjectScore/ProjectScore';
import ProjectMembers from '../../Components/ProjectMembers/ProjectMembers';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar';

function ProjectPage({ setPageTitle }) {
  const { projectId } = useParams(); // Get the project ID from URL parameter
  const [project, setProject] = useState(null); // State to store the project data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  useEffect(() => {
    // Fetch the project data from the backend
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/projects/resume/${projectId}`);
        setProject(response.data);
        setPageTitle(response.data.title); // Update the title when data is fetched
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, setPageTitle]);

  // Function to handle descalification
  const handleDescalify = () => {
    const confirmed = window.confirm("Estas seguro de que quieres descalificar el proyecto?");
    if (confirmed) {
      // Add your logic to descalify the project here
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  // If project is not found, display the project ID
  if (!project) {
    return <h1>Project with ID "{projectId}" not found!</h1>;
  }

  const { poster, video, description } = project;

  return (
    <>
    <NavigationBar NameSection={project.title}/>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-lg-6">
            <Widget title={"Póster"} centered={true} content={<img style={{height:"625px"}} src={`${process.env.PUBLIC_URL}/${poster}`} alt="Project Image" />} />
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-12">
                <Widget title={"Video"} centered={true} content={<VideoCard url={video} />} />
              </div>
              <div className="col-lg-12">
                <Widget title={"Descripción del proyecto"} centered={true} content={<p style={{marginLeft:"10px", marginRight:"10px"}}>{description}</p>} />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* <div className="col-lg-3">
            <Widget title={"Juez Encargado"} centered={true} content={<AssignJudge categories={project.categories} />} />
          </div> */}
          <div className="col-lg-6">
            <Widget title={"Equipo"} centered={true} content={<ProjectMembers project={project} />} />
          </div>
          {/* <div className="col-lg-3">
            <Widget title={"Calificación"} centered={true} content={<ProjectScore score={project.score} isDisqualified={project.isDisqualified} allProjects={mockProjects} />} />
          </div> */}
        </div>

        <div className="row mb-3">
          <div className="col-lg-12 d-flex justify-content-center mt-3">
            <button className="btn btn-lg btn-primary mx-2 custom-primaty-btn">Calificar</button>
            <button className="btn btn-lg btn-danger mx-2" onClick={handleDescalify}>Descalificar</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectPage;
