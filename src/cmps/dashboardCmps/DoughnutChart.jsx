import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend,)

export function DoughnutChart() {

    const data = {
        labels: ['Yes', 'No'],
        datasets: [{
            label: 'Poll',
            data: [3, 6],
            backgroundColor: ['black', 'red'],
            borderColor: ['black', 'red'],
            circumference: 180,
            rotation: 270
        }]
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