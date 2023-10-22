import { utilService } from "../services/util.service";
import { DueDate } from "./dynamicCmps/DueDate";

export function ProgressBar({ board, group }) {

    const renderCmpSpan = (cmp) => {
        switch (cmp.type) {
            case 'dueDate':
                const dueDates = group.tasks.map(task => task.dueDate).filter(date => date && date.length >= 2)
                if (dueDates.length === 0) return

                const flattenedDueDates = [].concat(...dueDates)
                const minDueDate = Math.min(...flattenedDueDates)
                const maxDueDate = Math.max(...flattenedDueDates)
                const info = [minDueDate, maxDueDate]

                return (
                    <DueDate info={info} />
                )
            case 'status':
                return <span>status</span>
            case 'priority':
                return <span>priority</span>
            // Add more cases as needed for other cmp types
            default:
                return
        }
    }

    return (
        <div className="progress-bar table-grid table">
            <div className="side"></div>
            <div className="checkbox"></div>
            <div className="title-col"></div>
            {board.cmpsOrder.map((cmp, idx) => (
                <div key={idx} className={`${cmp.type}-col ${cmp.type}-cell grid align-center justify-center`}>
                    {renderCmpSpan(cmp)}
                </div>
            ))}
            <div className="last-col"></div>
        </div>
    )
}