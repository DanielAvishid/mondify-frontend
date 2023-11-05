import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export function MembersChart() {

    const data = {
        labels: ['Yes', 'No'],
        datasets: [{
            label: 'member done',
            data: [3, 6],
            backgroundColor: ['red'],
        }, {
            label: 'member not done',
            data: [2, 2],
            backgroundColor: ['blue'],
        }]
    }

    const options = {
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
    }

    return (
        <div className='members-chart-container'>
            <Bar
                data={data}
                options={options}
            ></Bar>
        </div>
    )
}