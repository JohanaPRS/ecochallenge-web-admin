
import React from 'react';
//css
import '../assetss/css/App.css';
import Header from '../template/Header';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function Home() {
  //aca vamos a poner nuestros parametros a comparar
  const data = {
    labels: ['12', '13', '14', '15', '16', '17', '18'],
    datasets: [{
      label: 'Usuarios por edad',
      backgroundColor: '#62964B',
      borderColor: 'black',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(0,255,0,0.2)',
      hoverBorderColor: '#FF0000',
      data: [300, 785, 368, 984, 1255, 245, 745]
    }]
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true
  }
  return (

    <React.Fragment>
      <Header />
      <div className="App" style={{ width: '75%', height: '600px', marginLeft: 100 }}>
        <br />
        <h4>Grafica cantidad de plastico reciclado por rango de edad</h4>
        <br />
        <Bar data={data} options={options} />
      </div>


    </React.Fragment>
  );

}

export default Home;