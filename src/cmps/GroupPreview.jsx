import { IconButton } from "monday-ui-react-core"
import { Add } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { DateCmp } from "./dynamicCmps/Date";
import { Members } from "./dynamicCmps/Members";
import { Status } from "./dynamicCmps/Status";
import { TaskTitle } from "./dynamicCmps/TaskTitle";
import { Priority } from "./dynamicCmps/Priority";
import { TaskPreview } from "./TaskPreview";

export function GroupPreview({ group, progress }) {
    // DELETE THIS LINES WHEN GIVEN CURRECT PROP
    const cmpsOrder = ['TaskTitle', 'Members', 'Status', 'Priority', 'Date']
    const labels = ["Item", "Members", "Status", "Priority", "Timeline"];

    const { style, tasks, title } = group

    return (
        <section className="group-preview">
            <section className="group-preview">
                {/* Render group labels by labels array */}
                <section className="full-row">
                    {labels.map((label, idx) => (
                        <div key={idx} className={`col-${idx + 1} grid align-center justify-center`}><span>{label}</span></div>
                    ))}
                    <div className="col-end">
                        <IconButton icon={Add} kind={IconButton.kinds.TERTIARY} ariaLabel="Add Column" size={IconButton.sizes.SMALL} />
                    </div>
                </section>

                {/* Render tasks by cmp order */}
                {tasks.map((task) => (
                    <section className="full-row" key={task.id}>
                        {cmpsOrder.map((cmp, idx) => (
                            <section key={idx} className={`col-${idx + 1}`}>
                                <DynamicCmp cmpType={cmp} info={task[cmp]} taskId={task.id} />
                            </section>
                        ))}
                    </section>
                ))}

                {/* Render progress by progress array */}
                {/* <section className="progress-grid">
                    {progress.map((item, idx) => (
                        <div key={idx}>{item}</div>
                    ))}
                </section> */}
            </section>

            {/* {cmpsOrder.map((Cmp, index) => (
                <Cmp key={index} tasks={tasks} />
            ))}

            {tasks.map((task, index) => (
                <TaskPreview key={index} task={task} />
            ))} */}

        </section>
    )
}

const DynamicCmp = ({ cmpType, info, taskId }) => {
    // console.log(cmpType, info, taskId);
    info = { info}
    taskId = { taskId}

    switch (cmpType) {
        case "Priority":
            return <Priority {...info} />;
        case "TaskTitle":
            return <TaskTitle {...{ ...info, ...taskId}} />;
        case "Status":
            return <Status {...info} />;
        case "Members":
            return <Members {...info} />;
        case "Date":
            return <DateCmp {...info} />;

        default:
            break;
    }
};