function SummaryItem({ percentage, color, title }) {
    const style = {
        width: `${percentage}%`,
        backgroundColor: color,
    };

    return (
        <div className="summary-item" style={style}></div>
    );
}


export function StatusSummary({ group, board }) {

    const labels = board.statusLabels
    const groupStatuses = group.tasks.map((task) => task.status)
    const tasksCount = group.tasks.length

    const statusCountMap = groupStatuses.reduce((acc, statusId) => {
        acc[statusId] = (acc[statusId] || 0) + 1;
        return acc;
    }, {});

    for (const statusId in statusCountMap) {
        statusCountMap[statusId] = (statusCountMap[statusId] / tasksCount) * 100;
    }


    return (
        <div className="defualt-summary status-summary flex align-center justify-center">
            {Object.keys(statusCountMap).map((statusId) => (
                <SummaryItem
                    key={statusId}
                    percentage={statusCountMap[statusId]}
                    color={labels.find((label) => label.id === statusId).color}
                    title={labels.find((label) => label.id === statusId).title}
                />
            ))}
        </div>
    )
}