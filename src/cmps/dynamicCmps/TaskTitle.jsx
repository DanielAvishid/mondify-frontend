export function TaskTitle(tasks) {
    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id}><span>{task.title}</span></div>
            ))}
        </div>
    )
}