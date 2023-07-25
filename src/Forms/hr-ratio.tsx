import { useEffect, useState} from "react";
import {
 ratio_data,
 RatioData
} from "./variables";

import {
  TextField,
  Paper,
 
  Box,
  Typography,

  
} from "@mui/material";
import "../App.css";
import { ScatterPlot } from "./scatter-plot";


export const perc = (original:number):string=>{
  return (original*100).toFixed(2)+"%"
}

export const HrRatio = (): JSX.Element => {
  const [inputState, setInputState] = useState<RatioData>({
    n_employees:undefined,
    n_hr:undefined
  });
  const [sampleData,setSampleData] = useState<Array<RatioData>>([...ratio_data])
  
  const [reccommendationValues,setReccomendationValues] = useState<Reccomendation>({
    headcount_lowerbound:undefined,
    headcount_upperbound:undefined,
    text:undefined,
    dataPoints:undefined,
    average:undefined
  })
  
  
  function reccomendation(n_employees:number|undefined,n_hr:number|undefined,data:Array<RatioData>) {
    if (n_employees===undefined||n_hr===undefined||n_employees===0||n_hr===0)  {
      reccommendationValues.headcount_lowerbound=undefined;
      reccommendationValues.headcount_upperbound = undefined;
      reccommendationValues.text=undefined;
      reccommendationValues.dataPoints=undefined
      reccommendationValues.average=undefined
      setSampleData([...ratio_data])
      return undefined
    }
    const headcount_lowerbound = Math.max(n_employees-n_employees*0.2,0)
    const headcount_upperbount = Math.max(n_employees+n_employees*0.2,0);
    reccommendationValues.headcount_lowerbound=headcount_lowerbound
    reccommendationValues.headcount_upperbound = headcount_upperbount

      const filteredData = data.filter(el=>el.n_employees!>=headcount_lowerbound && el.n_employees!<=headcount_upperbount)
      
      reccommendationValues.dataPoints = filteredData.length
      if (filteredData.length===0) {
        reccommendationValues.headcount_lowerbound=undefined;
      reccommendationValues.headcount_upperbound = undefined;
      reccommendationValues.text=undefined;
      reccommendationValues.dataPoints=undefined
      reccommendationValues.average=undefined
      setSampleData([...ratio_data])
      return undefined
      }
      const all_hr = filteredData.reduce((a,b)=>a+b.n_hr!,0)
      const average = all_hr/filteredData.length
      reccommendationValues.average=Number(average.toFixed(2))
      if (n_hr>average) {       
        
          reccommendationValues.text="Your organization appears to have a higher Full-Time Equivalent (FTE) in the HR department compared to companies of similar size. To improve efficiency, consider exploring tools that can help optimize HR processes."
        
      } else if (n_hr<average) {
     
        reccommendationValues.text= "Your organization has a lower Full-Time Equivalent (FTE) in the HR department compared to companies of similar size. To address this, you may want to consider increasing your HR team or investing in automation if you believe your organisation is underinvesting in HR"
        
      } else {
        
        reccommendationValues.text = "You are aligned with companies of similar size."
        
      }
      setReccomendationValues({...reccommendationValues})
      
      setSampleData([...filteredData])
  
  }
  const dir = "row"
  
  return (
    <Paper
      className="myinput"
      style={{
        width: dir,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginLeft: "20px",
        marginTop: "20px",
        background: "#F2F2F7",
      }}
    >
      

    <Box style={{display:"flex",flexDirection:dir,justifyContent:"flex-start","width":"100%"}}>
      
      <TextField
        label="Headcount"
        size="small"
        type="number"
        
        style={{marginTop: "15px", background: "white","width":"100%",marginLeft:"10px"}}
        InputLabelProps={{
          shrink: true,
          style: {color: "black", fontWeight: "bold"},
        }}
       
        onChange={e => {    
         
          inputState.n_employees = parseInt(e.target.value);
          setInputState({...inputState});
          reccomendation(inputState.n_employees,inputState.n_hr,ratio_data)
        }}
        value={inputState?.n_employees}
      />
       <TextField
        label="Human Resources FTE"
        size="small"
        type="number"
        style={{marginTop: "15px", background: "white","width":"100%",marginLeft:"10px"}}
        InputLabelProps={{
          shrink: true,
          style: {color: "black", fontWeight: "bold"},
          
        }}
     
        onChange={e => {          
          inputState.n_hr = parseFloat(e.target.value);
          reccomendation(inputState.n_employees,inputState.n_hr,ratio_data)

          setInputState({...inputState});
        }}
        value={inputState.n_hr}
      />
      </Box>  
    <ScatterPlot  clientData={inputState} sampleData={sampleData}  />
    <Box>
    <Typography variant="h6">Comparison</Typography>
    <Typography style={{marginTop:"10px"}}>Companies headcount range: {reccommendationValues.headcount_lowerbound?reccommendationValues.headcount_lowerbound:"NA"}-{reccommendationValues.headcount_upperbound?reccommendationValues.headcount_upperbound:"NA"}</Typography>
    <Typography>Number of companies in sample: {reccommendationValues.dataPoints?reccommendationValues.dataPoints.toString():"NA"}</Typography>
    <Typography>Average HR FTE: {reccommendationValues.average?reccommendationValues.average?.toString():"NA"}</Typography>
    <Typography style={{marginTop:"20px"}}>{reccommendationValues.text?reccommendationValues.text:" "}</Typography>
    </Box>
    </Paper>
  );
};
interface Reccomendation {
  dataPoints:number|undefined;
  text:string|undefined;
  headcount_lowerbound:number|undefined;
  headcount_upperbound:number|undefined;
  average:number|undefined;
}

