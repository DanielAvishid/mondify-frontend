import { TaskPreview } from "./TaskPreview";

export function GroupPreview({ group }) {
    const { style, tasks, title } = group

    console.log(group);
    console.log(tasks);
    return (
        <section className="group-preview">
            <div className="full-row header">
                <div className="check-row"><input type="checkbox" name="" id="" /></div>
                <div className="item-container"><span>Item</span></div>
                <div className="person-container"><span>Person</span></div>
                <div className="status-container"><span>Status</span></div>
                <div className="priority-container"><span>Priority</span></div>
                <div className="timeline-container"><span>Timeline</span></div>
                <div className="add-colomn-container"><span>+</span></div>
            </div>
            {tasks.map((task, index) => (
                <TaskPreview key={index} task={task} />
            ))}

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
