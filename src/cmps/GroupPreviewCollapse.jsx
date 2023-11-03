import { EditableHeading, Icon, Menu, MenuButton, MenuItem } from "monday-ui-react-core";
import { Add, Duplicate, Delete, DropdownChevronDown } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { ProgressBar } from "./ProgressBar";
import { MembersSummary } from "./dynamicSummaryCmps/MembersSummary";
import { LabelsSummary } from "./dynamicSummaryCmps/LabelsSummary";
import { TimelineSummary } from "./dynamicSummaryCmps/TimelineSummary";

export function GroupPreviewCollapse({ handleKeyPress, board, group, onDuplicateGroup, onSaveBoard, onRemoveGroup, setIsCollapse }) {

    const renderCmpSpan = (cmp) => {
        switch (cmp.type) {
            case 'timeline':
            case 'date':
                return <TimelineSummary group={group} type={cmp.type} />
            case 'status':
            case 'priority':
                return <LabelsSummary group={group} board={board} type={cmp.type} />
            case 'members':
                return <MembersSummary group={group} board={board} />
            default:
                return
        }
    }

    return (
        <div className="group-preview main-layout full">
            <div className="start">
                3
            </div>
            <div className="table table-container">
                <div className="table-row flex group-preview-collapse">
                    <div className="title-col">
                        hello
                    </div>
                    {board.cmpsOrder.map((cmp, idx) => (
                        <div className="flex column align-center justify-center">
                            <span className={`${cmp.type}-col flex align-center justify-center`}>{cmp.title}</span>
                            <div key={idx} className={`col ${cmp.type}-col ${cmp.type} flex align-center justify-center`}>
                                {renderCmpSpan(cmp)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

// return (
//     <div className="group-preview main-layout full">
//         <div className="start">
//             <MenuButton className="group-menu">
//                 <Menu id="menu" size="large">
//                     <MenuItem icon={Duplicate} title="Duplicate this group" onClick={() => onDuplicateGroup({ boardId: board._id, groupId: group.id })} />
//                     <MenuItem icon={Delete} title="Delete" onClick={() => onRemoveGroup({ boardId: board._id, groupId: group.id })} />
//                 </Menu>
//             </MenuButton>
//         </div>
//         <table className="full main-layout">
//             <tbody className="table-container table">
//                 <tr className="table-row flex">
//                     <td className="title-col flex align-center">
//                         <span className="flex" style={{ color: group.style.backgroundColor }}>
//                             {/* cant get the label . why ? */}

//                             <Icon
//                                 customColor={group.style.backgroundColor}
//                                 icon={DropdownChevronDown}
//                                 iconSize={22}
//                                 ariaLabel="Collapse group"
//                                 onClick={() => setIsCollapse(true)}
//                             />
//                         </span>
//                         <span>
//                             <EditableHeading
//                                 type={EditableHeading.types.h4}
//                                 value={group.title}
//                                 tooltip='Click to Edit'
//                                 tooltipPosition="bottom"
//                                 customColor={group.style.backgroundColor}
//                                 onBlur={(ev) => onSaveBoard({ key: 'title', value: ev.target.value, boardId: board._id, groupId: group.id })}
//                                 onKeyDown={handleKeyPress}
//                             />
//                         </span>
//                         <span className="items-count">
//                             {group.tasks.length === 0 && "No items"}
//                             {group.tasks.length === 1 && "1 project"}
//                             {group.tasks.length > 1 && `${group.tasks.length} Items`}
//                         </span>
//                     </td>
//                 </tr>
//             </tbody>
//         </table>
//         <ProgressBar board={board} group={group} />
//     </div >
// )