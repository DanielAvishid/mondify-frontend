import { Icon } from 'monday-ui-react-core'
import { Launch } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"


import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'

import { Doughnut } from 'react-chartjs-2'
import { useOutletContext } from 'react-router-dom'
import { utilService } from '../services/util.service'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

export function Dashboard() {
    const [board] = useOutletContext()

    const boardCreateAt = board.archivedAt
    const launchDate = utilService.formatDateFromTimestamp(boardCreateAt, true)
    const daysPass = utilService.calculateDaysDifference([boardCreateAt, Date.now()])
    const daysPassTxt = (daysPass > 1) ? `${daysPass} Days` : `${daysPass} Day`


    console.log(launchDate);
    console.log(daysPass);

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
        <div className="dashboard full">
            <div className='overall-progress-container'>
                <div>mapping here through groups and showing id done or show a precentage</div>
            </div>
            <div className='members-chart-container'>members</div>
            <div className='date-counter-container'>
                <h4>Project</h4>
                <h4>Launch Date</h4>
                <div className='flex align-center'>
                    <Icon icon={Launch} iconSize={70} />
                    <div className='flex column'>
                        <span>{daysPassTxt}</span>
                        <span>{launchDate}</span>
                    </div>
                </div>
            </div>
            <div className='doughnut-container'>
                {/* <h1>Dashboard</h1> */}
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