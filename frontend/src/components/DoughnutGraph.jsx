import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

//1-0.8-loved the course
//0.8-0.6-enjoyed the course
//0.6-0.4-didnt mind the course
//0.4-0.2-didn't enjoy the course
//0.0-0.2- hated the course

export function DoughnutGraph(props) {
    const data = {
    labels: ['Skills', 'Experience', 'Education', 'Projects', 'Formatting'],
        datasets: [
            {
            label: 'Score',
            data: props.reviewRanges,
            backgroundColor: [
                '#54A08F',
                '#3D5B59',
                '#FCB5AC',
                '#B99095',
                '#AAD6A0',

            ],
            borderColor: [
                '#54A08F',
                '#3D5B59',
                '#FCB5AC',
                '#B99095',
                '#AAD6A0',
            ],
            borderWidth: 1,
            
            },
            
        ],
    };
    const options = {
        plugins: {
            legend: {
                display: false,
                position: "right"
            },
            title: {
                display: true,
                text: 'Reviews by positivity level',
                color: "black",
                font: {
                    size: 15
                }
            },
     
        },

    }
    // console.log(props.reviewRanges)
  return <Doughnut options={options} data={data} />;
}
