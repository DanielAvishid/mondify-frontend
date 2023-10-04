export function TaskPreview({ task }) {
    const { title = '', membersIds = '', priority = '', status = '', dueTime = '' } = task
    console.log(task);
    return (
        <div className="task-preview full-row row">
            <div className="check-row"><input type="checkbox" name="" id="" /></div>
            <div className="item-container"><span>{title}</span><span>CHAT</span></div>
            <div className="person-container"><span>{membersIds}</span></div>
            <div className="status-container"><span>{status}</span></div>
            <div className="priority-container"><span>{priority}</span></div>
            <div className="timeline-container"><span>{dueTime}</span></div>
            <div className="add-colomn-container"><span>+</span></div>
        </div>
    )
}