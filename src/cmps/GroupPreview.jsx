import { TaskPreview } from "./TaskPreview";

export function GroupPreview({ group }) {
    const { style, tasks, title } = group

    const uniqueKeys = new Set();
    tasks.forEach((task) => {
        Object.keys(task).forEach((key) => {
            uniqueKeys.add(key);
        });
    });
    const uniqueKeysArray = Array.from(uniqueKeys);

    return (
        <section className="group-preview">
            <div className="full-row">
                <div className="left-border-container"><span></span></div>
                <div className="item-container"><span>Item</span></div>
                <div className="person-container"><span>Person</span></div>
                <div className="status-container"><span>Status</span></div>
                <div className="priority-container"><span>Priority</span></div>
                <div className="timeline-container"><span>Timeline</span></div>
                <div className="add-colomn-container"><span>+</span></div>
            </div>
            <div className="full-row">
                {tasks.map((task, index) => (
                    <TaskPreview key={index} task={task} />
                ))}
            </div>

        </section>
    )
}


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
