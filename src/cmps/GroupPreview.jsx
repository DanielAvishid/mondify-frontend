import { IconButton } from "monday-ui-react-core"
import { Add } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { TaskPreview } from "./TaskPreview";

export function GroupPreview({ group, progress }) {
    // DELETE THIS LINES WHEN GIVEN CURRECT PROP
    const cmpsOrder = ['Members', 'Status', 'Priority', 'Date']
    const labels = ["Members", "Status", "Priority", "Timeline"];

    const { style, tasks, title } = group

    console.log(group);
    console.log(tasks);
    return (
        <section className="group-preview main-layout full">
            <h4 className="middle">{title}</h4>
            <section className="table">
                <section className="table-header table-grid">
                    <div className="title-col grid align-center justify-center"><span>Item</span></div>

                    {labels.map((label, idx) => (
                        <div key={idx} className={`${label.toLowerCase()}-col grid align-center justify-center`}><span>{label}</span></div>
                    ))}

                    <div className="col-end">
                        <IconButton icon={Add} kind={IconButton.kinds.TERTIARY} ariaLabel="Add Column" size={IconButton.sizes.SMALL} />
                    </div>
                </section>

                {/* Render tasks by cmp order */}
                {tasks.map((task) => (
                    <TaskPreview key={task.id} task={task} cmpsOrder={cmpsOrder} />
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