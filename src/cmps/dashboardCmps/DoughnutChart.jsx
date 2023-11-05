import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend,)

export function DoughnutChart() {

    const data = {
        labels: ['Yes', 'why', 'No'],
        datasets: [{
            label: 'Poll',
            data: [3, 5, 6],
            backgroundColor: ['black', 'blue', 'red'],
            borderColor: ['black', 'blue', 'red'],
            circumference: 180,
            rotation: 270
        }
            // , {
            //     label: 'Poll',
            //     data: [3, 2, 6],
            //     backgroundColor: ['green', 'blue', 'red'],
            //     borderColor: ['green', 'blue', 'red'],
            //     circumference: 180,
            //     rotation: 270
            // }
        ]
    }

    const options = {

    }


    return (
        <div className='doughnut-container'>
            <Doughnut
                data={data}
                options={options}
            ></Doughnut>
        </div>
    )
}