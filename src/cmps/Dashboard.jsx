import { useOutletContext } from 'react-router-dom'
import { MembersChart } from './dashboardCmps/membersChart'
import { DoughnutChart } from './dashboardCmps/DoughnutChart'
import { LaunchDate } from './dashboardCmps/LaunchDate'
import { GroupListChart } from './dashboardCmps/GroupListChart'

export function Dashboard() {
    const [board] = useOutletContext()

    return (
        <div className="dashboard full">
            <GroupListChart board={board} />
            <MembersChart board={board} />
            <LaunchDate board={board} />
            <DoughnutChart board={board} />
        </div>
    )
}