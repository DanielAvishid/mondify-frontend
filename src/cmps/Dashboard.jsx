import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'

import { Doughnut } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

export function Dashboard() {

    const data = {
        labels: ['Yes', 'No'],
        datasets: [{
            label: 'Poll',
            data: [3, 6],
            backgrounfColor: ['black', 'red'],
            borderColor: ['black', 'red'],
            circumference: 180,
            rotation: 270
        }]
    }

    const options = {

    }



    return (
        <div className="dashboard full">
            <div className='overall-progress-container'>
                <div>mapping here through groups and showing id done or show a precentage</div>
            </div>
            <div className='members-chart-container'>members</div>
            <div className='date-counter-container'>date</div>
            <div className='doughnut-container'>
                <h1>Dashboard</h1>
                <div>
                    <Doughnut
                        data={data}
                        options={options}
                    ></Doughnut>
                </div>
            </div>
        </div>
    )
}