import { Date } from "./dynamicCmps/Date";
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
            <h2>{title}</h2>

            <section className="group-list">
                {/* Render group labels by labels array */}
                <section className="labels-grid">
                    {labels.map((label, index) => (
                        <div key={index}>{label}</div>
                    ))}
                </section>

                {/* Render tasks by cmp order */}
                {tasks.map((task) => (
                    <section className="group grid" key={task.id}>
                        {cmpsOrder.map((cmp, idx) => (
                            <section className="grid-item" key={idx}>
                                <DynamicCmp cmpType={cmp} info={task[cmp]} />
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

const DynamicCmp = ({ cmpType, info }) => {
    console.log(cmpType, info);

    switch (cmpType) {
        case "Priority":
            return <Priority {...info} />;
        // case "TaskTitle":
        //     return <TaskTitle {...info} />;
        // case "Status":
        //     return <Status {...info} />;
        // case "Members":
        //     return <Member {...info} />;
        // case "Date":
        //     return <Date {...info} />;

        default:
            break;
    }
};


// FUNC THAT GET EVERY UNIQUE KEY OF A TASK

// const uniqueKeys = new Set();
// tasks.forEach((task) => {
//     Object.keys(task).forEach((key) => {
//         uniqueKeys.add(key);
//     });
// });
// const uniqueKeysArray = Array.from(uniqueKeys);

// EXECUTE THE FUNC

{/* {uniqueKeysArray.map((task, index) => (
    <div key={index}>{task}</div>
))} */}
