import { utilService } from "../services/util.service";

import { TimelineSummary } from "./dynamicSummaryCmps/TimelineSummary";
import { StatusSummary } from "./dynamicSummaryCmps/StatusSummary";
import { MembersSummary } from "./dynamicSummaryCmps/MembersSummary";


export function ProgressBar({ board, group }) {

    const renderCmpSpan = (cmp) => {
        switch (cmp.type) {
            case 'timeline':
                return <TimelineSummary group={group} />
            case 'status':
                return <StatusSummary group={group} board={board} />
            case 'priority':
                return <span></span>
            case 'members':


                return <MembersSummary group={group} board={board} />

            default:
                return
        }
    }

    return (
        <table className="progress-bar full main-layout" >
            <tfoot className="table-container table" style={{ borderColor: "transparent" }}>
                <tr className="table-row flex">
                    {board.cmpsOrder.map((cmp, idx) => (
                        <td key={idx} className={`${cmp.type}-col ${cmp.type} task-item flex align-center justify-center`}>
                            {renderCmpSpan(cmp)}
                        </td>
                    ))}
                </tr>
            </tfoot>
        </table >
    )
}