export function TaskPreview({ task }) {
    const { title = '', memberIds = [], priority = '', status = '', dueDate = '' } = task

    console.log(memberIds);

    function getDate(dueDate) {
        if (!dueDate) return ''

        const date = new Date(dueDate);
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear() !== new Date().getFullYear() ? `,'${date.getFullYear().toString().slice(-2)}` : '';

        const formattedDate = `${month} ${day} ${year}`;
        return formattedDate

    }

    return (
        <div className="task-preview full-row row">
            <div className="check-row"><input type="checkbox" name="" id="" /></div>
            <div className="item-container">
                <div><span>{title}</span></div>
                <div><span>🔗</span></div>
            </div>
            <div className="person-container">
                {memberIds.map((memberId) => (
                    <span key={memberId}>{memberId.charAt(0)}</span>
                ))}
            </div>
            <div className="status-container"><span>{status}</span></div>
            <div className="priority-container"><span>{priority}</span></div>
            <div className="timeline-container"><span>{getDate(dueDate)}</span></div>
        </div>
    )
}