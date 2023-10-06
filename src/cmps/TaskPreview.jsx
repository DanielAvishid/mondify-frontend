// import { useNavigate } from "react-router";
import { Priority } from "./dynamicCmps/Priority";
import { TaskTitle } from "./dynamicCmps/TaskTitle";
import { Status } from "./dynamicCmps/Status";
import { Members } from "./dynamicCmps/Members";
import { DateCmp } from "./dynamicCmps/Date";

import { Duplicate, Delete } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { Menu, MenuButton, MenuItem } from "monday-ui-react-core";

export function TaskPreview({ boardId, groupId, task, cmpsOrder, onSaveBoard, onDuplicate, onRemove }) {


    return (
        <>
            <div className="start grid align-center justify-center">
                <MenuButton className="board-menu">
                    <Menu id="menu" size="large">
                        {/* <MenuItem icon={Duplicate} title="Duplicate Boarder" /> */}
                        <MenuItem icon={Duplicate} title="Duplicate Boarder" onClick={() => onDuplicate({ boardId,groupId, taskId: task.id })} />
                        <MenuItem icon={Delete} title="Delete" onClick={() => onRemove({ boardId, taskId: task.id })} />
                    </Menu>
                </MenuButton>
            </div>
            <div key={task.id} className="task-preview table-grid middle">
                <TaskTitle boardId={boardId} task ={task} onSaveBoard={onSaveBoard} />
                {cmpsOrder.map((cmp, idx) => (
                    <DynamicCmp key={idx} boardId={boardId} cmpType={cmp} info={task[cmp]} onSaveBoard={onSaveBoard} />
                ))}
            </div>
        </>
    )
}

const DynamicCmp = ({ boardId, cmpType, info, onSaveBoard }) => {

    // NEED TO ADD BOARD ID AND ON SAVE BOARD TO THE CMPS PROPS

    switch (cmpType) {
        case "Priority":
            return <Priority info={info} />;
        case "Status":
            return <Status info={info} />;
        case "Members":
            return <Members info={info} />;
        case "Date":
            return <DateCmp info={info} />
        default:
            break;
    }
};