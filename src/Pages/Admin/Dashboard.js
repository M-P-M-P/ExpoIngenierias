import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Widget from '../../Components/Widget/Widget';
import NavigationBar from '../../Components/NavigationBar/Admin/NavigationBar';
import DoughnutChart from '../../Components/DoughnutChart/DoughnutChart';
import Checklist from '../../Components/Checklist/Checklist';
import Timer from '../../Components/Timer/Timer';
import { mockData } from '../../MockData/MockData';
import { checklistItems } from '../../MockData/MockData';

function Dashboard() {
  const [userData, setUserData] = useState({ labels: [], data: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/users/getUsersDoughnut/ChartData')
      .then(response => {
        const data = response.data;
        setUserData({
          labels: data.labels,
          data: data.data
        });
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user doughnut chart data:", error);
        setError('Error fetching user data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <NavigationBar NameSection={"Tablero"} />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-lg-4">
            <Widget title={"Usuarios"} content={<DoughnutChart labels={userData.labels} data={userData.data} />} />
          </div>
          <div className="col-lg-4">
            <Widget title={"Categorías"} content={<DoughnutChart labels={mockData.project.labels} data={mockData.project.data} />} />
          </div>
          <div className="col-lg-4">
            <Widget title={"Revisión de Proyectos"} content={<DoughnutChart labels={mockData.projectStatus.labels} data={mockData.projectStatus.data} />} />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <Widget title={"Material Solicitado"} content={<Checklist initialItems={checklistItems} />} />
          </div>
          <div className="col-lg-4">
            <Widget title={"Tiempo para Expo-Ingeniería"} content={<Timer />} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
