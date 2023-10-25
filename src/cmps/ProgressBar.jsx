import { utilService } from "../services/util.service";
import { DueDate } from "./dynamicCmps/DueDate";
import { Members } from "./dynamicCmps/Members";

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
                return <span></span>
            case 'priority':
                return <span></span>
            case 'members':
                const members = group.tasks.map(task => task.members)
                const flattenedMembers = [].concat(...members)
                const uniqueMembers = [...new Set(flattenedMembers)]

                return <Members info={uniqueMembers} board={board} />

            default:
                return
        }
    }

    return (
        <table className="progress-bar table-container table" style={{ borderColor: "transparent" }}>
            <tr className="table-row flex">
                <td className="task-item title-col"></td>

                {board.cmpsOrder.map((cmp, idx) => (
                    <td key={idx} className={`${cmp.type}-col ${cmp.type}-cell task-item flex align-center justify-center`}>
                        <div className="inner-progress-ber flex align-center justify-center">
                            {renderCmpSpan(cmp)}
                        </div>
                    </td>
                ))}

            </tr>
        </table >
    )
}