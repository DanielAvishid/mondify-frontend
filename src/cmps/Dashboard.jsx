import { useOutletContext } from 'react-router-dom'
import { MembersChart } from './dashboardCmps/membersChart'
import { DoughnutChart } from './dashboardCmps/DoughnutChart'
import { LaunchDate } from './dashboardCmps/LaunchDate'

export function Dashboard() {
    const [board] = useOutletContext()

    return (
        <div className="dashboard full">
            <div className='overall-progress-container'>
                <div>mapping here through groups and showing id done or show a precentage</div>
            </div>
            <MembersChart board={board} />
            <LaunchDate board={board} />
            <DoughnutChart board={board} />
        </div>
    )
}