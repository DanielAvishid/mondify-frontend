// import { useNavigate } from "react-router";
import { Priority } from "./dynamicCmps/Priority";
import { TaskTitle } from "./dynamicCmps/TaskTitle";
import { Status } from "./dynamicCmps/Status";
import { Members } from "./dynamicCmps/Members";
import { DateCmp } from "./dynamicCmps/Date";

export function TaskPreview({ task, cmpsOrder }) {
    return (
        <div key={task.id} className="task-preview table-grid">
            <TaskTitle title={task.TaskTitle} taskId={task.id} />
            {cmpsOrder.map((cmp, idx) => (
                <DynamicCmp key={idx} cmpType={cmp} info={task[cmp]} />
            ))}
        </div>
    )
}

const DynamicCmp = ({ cmpType, info }) => {

    switch (cmpType) {
        case "Priority":
            return <Priority info={info} />;
        case "TaskTitle":
            return <TaskTitle info={info} />;
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