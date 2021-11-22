import React from 'react';
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Header from '../template/Header';

class Home extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
          // To avoid unnecessary update keep all options in the state.
          chartOptions: {
            xAxis: {
              categories: ['A', 'B', 'C'],
            },
            series: [
              { data: [1, 2, 3] }
            ],
            plotOptions: {
              series: {
                point: {
                  events: {
                    mouseOver: this.setHoverData.bind(this)
                  }
                }
              }
            }
          },
          hoverData: null
        };
      }
    
      setHoverData = (e) => {
        // The chart is not updated because `chartOptions` has not changed.
        this.setState({ hoverData: e.target.category })
      }
    
      updateSeries = () => {
        // The chart is updated only with new options.
        this.setState({
          chartOptions: {
            series: [
              { data: [Math.random() * 5, 2, 1]}
            ]
          }
        });
      }
    

    render(){
        const { chartOptions, hoverData } = this.state;
        return(

            <React.Fragment>
                <Header></Header>
                <div>
                    <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                    />
                    <h3>Hovering over {hoverData}</h3>
                    <button onClick={this.updateSeries.bind(this)}>Update Series</button>
                </div>

            </React.Fragment>



        );
    }
}

export default Home