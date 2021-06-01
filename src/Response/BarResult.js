import React, {useEffect} from 'react';
import { Bar } from 'react-chartjs-2';

const BarResult = (props) => {

    let resp1 = 0;
    let resp2 = 0;
    let resp3 = 0;
    let resp4 = 0;

    if(props.data !== []) {
    
        console.log("data: ", props.data);

        props.data.forEach(element => {
            if(element.pollselection === "response1") {resp1++}
            else if(element.pollselection === "response2") {resp2++}
            else if(element.pollselection === "response3") {resp3++}
            else if(element.pollselection === "response4") {resp4++}
            else;
        });

        // console.log(`resp1 = ${resp1}, resp2 = ${resp2}, resp3 = ${resp3}, resp4 = ${resp4}`)
    }
   

   
    const data = {
        labels: [props.responses[0], props.responses[1], props.responses[2], props.responses[3]],
        datasets: [
          {
            label: '# of Votes',
            data: [resp1, resp2, resp3, resp4],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1,
          },
        ],
      };
      
      const options = {
        scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: 1
                },
              },
            ],
          },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: props.question,
          },
        },
      };

      
    return ( 
        <div  style={{position: "relative",height:"40vh", width:"80vw"}}>
            <Bar data={data} options={options} width={"20%"} />          
        </div>

     );
}
 
export default BarResult;