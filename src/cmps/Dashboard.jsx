import { useOutletContext } from 'react-router-dom'
import { MembersChart } from './dashboardCmps/membersChart'
import { DoughnutChart } from './dashboardCmps/DoughnutChart'
import { LaunchDate } from './dashboardCmps/LaunchDate'
import { GroupListChart } from './dashboardCmps/GroupListChart'
import { UpcomingFeatures } from './dashboardCmps/UpcomingFeatures'

export function Dashboard() {
    const [board] = useOutletContext()

    return (
        <div className="dashboard full">
            <GroupListChart board={board} />
            <MembersChart board={board} />
            <div className='right-container'>
                <LaunchDate board={board} />
                <UpcomingFeatures board={board} />
            </div>
        </div>
    )
}