import React, { useState } from 'react';
import { data } from '../../Components/data.js';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import {Cardlist} from '../../Components/CardJuez/CardJuez.js';
import '../../Components/CardJuez/Juez.css';

function PageJuez() {
  const [filterText, setFilterText] = useState("");

  function handleChange(e) {
    setFilterText(e.target.value);
  };

  const filteredData = data.filter(post =>
    post.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <>
      <div className="container-fluid">
        <div className="centered-content">
        <NavigationBar NameSection={"Proyectos"}/>

          <input placeholder="Buscar proyecto por nombre" type="text" name="text" class="input" value={filterText} onChange={handleChange}></input>
        </div>
        <div className="proyectos">
          <Cardlist posts={filteredData} />
        </div>
      </div>
    </>
  );
}

export default PageJuez;
