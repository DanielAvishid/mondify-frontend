import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend,)

export function GroupListChart({ board }) {


    const data = {
        labels: ['Yes', 'No'],
        datasets: [{
            label: 'Poll',
            data: [3, 6],
            backgroundColor: ['green', 'beige'],
            borderColor: ['black', 'black'],
        }]
    }

    const options = {
        plugins: {
            legend: {
                display: false
            }
        }
    }


    return (
        <div className='overall-progress-container'>
            {/* <div>mapping here through groups and showing id done or show a precentage</div> */}
            {board.groups.map((group, index) => (
                <div className='doughnut-container' key={group.id} style={{ width: `${100 / board.groups.length}%` }}>
                    <h4>programming</h4>
                    <div>
                        < Doughnut
                            data={data}
                            options={options}
                        ></Doughnut >
                    </div>
                    <div>
                        <span>In progress</span>
                    </div>
                </div>
            ))}
        </div>
    )
}