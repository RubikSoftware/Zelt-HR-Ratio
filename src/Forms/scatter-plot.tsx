import {Box} from "@mui/material"
import { Scatter } from 'react-chartjs-2';
import { Chart, ScatterController, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js'; // Import specific components from 'chart.js'
import { RatioData } from "./variables";
interface Props {
  clientData:RatioData;
  sampleData:Array<RatioData>
}

export const ScatterPlot = ({clientData,sampleData}:Props): JSX.Element => {
  Chart.register(ScatterController, CategoryScale, LinearScale, PointElement, Tooltip);
    const n_emp = clientData.n_employees;
    const n_hr = clientData.n_hr;
    const data:any = {
      datasets:[]
    }
    if (n_emp!==undefined && n_hr!==undefined) {
      data.datasets.push({
        data: [{ x: n_emp, y: n_hr }],
        label: "Scatter Plot",
        backgroundColor: "red",
        pointRadius:7,
        pointStyle: 'diffuse-image'
      })
    }
    data.datasets.push(       
        {
          label: 'Scatter Plot',
          data: sampleData.map((dataPoint) => ({ x: dataPoint.n_employees, y: dataPoint.n_hr })),
          backgroundColor: 'rgba(75,192,192,0.4)', // Optional, sets the point color
        }
    )
    
    
    
    const options = {
    scales: {
      x: {
         // Set the correct type here, either 'linear' or 'timeseries' depending on your data
        
        title: {
          display: true,
          text: 'Headcount',
          style:{fontWeight:"bold"}
        },
      },
      y: {
        // Set the correct type here, either 'linear' or 'timeseries' depending on your data
        
        title: {
          display: true,
          text: 'Human Resource FTE',
          style:{fontWeight:"bold"}
        },
      },
      
    },
  };
  
    return (
<Box style={{marginTop:"40px"}}>
<Scatter id="2" data={data} options={options} />

  </Box>
    )
}
