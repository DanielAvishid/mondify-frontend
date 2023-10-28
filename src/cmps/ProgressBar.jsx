import { utilService } from "../services/util.service";
import { Timeline } from "./dynamicCmps/Timeline";
import { Members } from "./dynamicCmps/Members";
import { TimelineSummary } from "./dynamicSummaryCmps/TimelineSummary";


export function ProgressBar({ board, group }) {

    const renderCmpSpan = (cmp) => {
        switch (cmp.type) {
            case 'timeline':
                return <TimelineSummary group={group} />
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
        <table className="progress-bar full main-layout" >
            <tfoot className="table-container table" style={{ borderColor: "transparent" }}>
                <tr className="table-row flex">
                    {board.cmpsOrder.map((cmp, idx) => (
                        <td key={idx} className={`${cmp.type}-col ${cmp.type}-cell task-item flex align-center justify-center`}>
                            {renderCmpSpan(cmp)}
                        </td>
                    ))}
                </tr>
            </tfoot>
        </table >
    )
}