// import { useNavigate } from "react-router";
import { Priority } from "./dynamicCmps/Priority";
import { TaskTitle } from "./dynamicCmps/TaskTitle";
import { Status } from "./dynamicCmps/Status";
import { Members } from "./dynamicCmps/Members";
import { DueDate } from "./dynamicCmps/DueDate";

import { Duplicate, Delete } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { Checkbox, Menu, MenuButton, MenuItem } from "monday-ui-react-core";
import { utilService } from "../services/util.service";
import { useState } from "react";


export function TaskPreview({ board, group, task, onSaveBoard, onDuplicate, onRemove, isChecked, handleCheckboxChange }) {

    return (

        <div className="task-preview full main-layout">
            <div className="start flex align-center justify-center">
                <MenuButton className="task-menu">
                    <Menu id="menu" size="large">
                        {/* <MenuItem icon={Duplicate} title="Duplicate Boarder" /> */}
                        <MenuItem icon={Duplicate} title="Duplicate Boarder" onClick={() => onDuplicate({ boardId: board._id, groupId: group.id, taskId: task.id })} />
                        <MenuItem icon={Delete} title="Delete" onClick={() => onRemove({ boardId: board._id, taskId: task.id })} />
                    </Menu>
                </MenuButton>
            </div>
            <table className="table-container table" style={{ borderColor: group.style.backgroundColor }}>
                <tr className={`table-row flex ${isChecked ? 'checked' : ''}`}>
                    <td className="task-item title-col flex align-center justify-center">
                        <div className="checkbox flex align-center justify-center"><Checkbox checked={isChecked} onChange={() => handleCheckboxChange(task.id)} /></div>
                        <div className="title-name flex align-center justify-center">
                            <TaskTitle boardId={board._id} task={task} onSaveBoard={onSaveBoard} />
                        </div>
                    </td>
                    {board.cmpsOrder.map((cmp, idx) => (
                        <DynamicCmp
                            key={idx}
                            board={board}
                            cmpType={cmp.type}
                            info={task[cmp.type]}
                            onSaveBoard={onSaveBoard} />
                    ))}
                </tr>
            </table>
        </div >
    )
}

const DynamicCmp = ({ board, cmpType, info, onSaveBoard }) => {
    // NEED TO ADD BOARD ID AND ON SAVE BOARD TO THE CMPS PROPS

    switch (cmpType) {
        case "priority":
            return <Priority info={info} board={board} onSaveBoard={onSaveBoard} />;
        case "status":
            return <Status info={info} board={board} onSaveBoard={onSaveBoard} />;
        case "members":
            return <Members info={info} board={board} />;
        case "dueDate":
            return <DueDate info={info} />
        default:
            break;
    }
};