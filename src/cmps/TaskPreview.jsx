// import { useNavigate } from "react-router";
import { Priority } from "./dynamicCmps/Priority";
import { TaskTitle } from "./dynamicCmps/TaskTitle";
import { Status } from "./dynamicCmps/Status";
import { Members } from "./dynamicCmps/Members";
import { DueDate } from "./dynamicCmps/DueDate";

import { Duplicate, Delete } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { Menu, MenuButton, MenuItem } from "monday-ui-react-core";
import { utilService } from "../services/util.service";


export function TaskPreview({ board, group, task, onSaveBoard, onDuplicate, onRemove }) {

    return (
        <>
            <div className="start grid align-center justify-center">
                <MenuButton className="board-menu">
                    <Menu id="menu" size="large">
                        {/* <MenuItem icon={Duplicate} title="Duplicate Boarder" /> */}
                        <MenuItem icon={Duplicate} title="Duplicate Boarder" onClick={() => onDuplicate({ boardId: board._id, groupId: group.id, taskId: task.id })} />
                        <MenuItem icon={Delete} title="Delete" onClick={() => onRemove({ boardId: board._id, taskId: task.id })} />
                    </Menu>
                </MenuButton>
            </div>
            <div key={task.id} className="task-preview table-grid table">
                <div className="side" style={{ backgroundColor: group.style.backgroundColor }}></div>
                <div className="checkbox grid"><input type="checkbox" /></div>
                <TaskTitle boardId={board._id} task={task} onSaveBoard={onSaveBoard} />
                {board.cmpsOrder.map((cmp, idx) => (
                    <DynamicCmp
                        key={idx}
                        board={board}
                        cmpType={cmp.type}
                        info={task[cmp.type]}
                        onSaveBoard={onSaveBoard} />
                ))}
            </div>
        </>
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
            return <Members info={info} />;
        case "dueDate":
            return <DueDate info={info} />
        default:
            break;
    }
};