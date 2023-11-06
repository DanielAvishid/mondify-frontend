import { Icon } from 'monday-ui-react-core'
import { Launch } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { utilService } from '../../services/util.service'

export function LaunchDate({ board }) {

    const boardCreateAt = board.archivedAt
    const launchDate = utilService.formatDateFromTimestamp(boardCreateAt, true)
    const daysPass = utilService.calculateDaysDifference([boardCreateAt, Date.now()])
    const daysPassTxt = (daysPass > 1) ? `${daysPass} Days` : `${daysPass} Day`

    return (
        <div className='date-counter-container flex justify-between'>
            <div className='flex column'>
                <h4>{board.title}</h4>
                <h4>Launch Date</h4>
            </div>
            <Icon icon={Launch} />
            <div className='date flex column'>
                <span>{daysPassTxt}</span>
                <span>{launchDate}</span>
            </div>
        </div >
    )
}