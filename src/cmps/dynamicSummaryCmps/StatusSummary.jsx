import { SummaryItem } from "../utilsCmps/SummaryItem";

export function StatusSummary({ group, board }) {

    const groupStatuses = group.tasks.map((task) => task.status)

    const statusCountMap = groupStatuses.reduce((acc, statusId) => {
        acc[statusId] = (acc[statusId] || 0) + 1;
        return acc;
    }, {});

    const labels = board.statusLabels
    const filterdLabels = labels.filter((label) => statusCountMap[label.id] !== undefined)

    return (
        <div className="status-summary flex align-center justify-center">
            {filterdLabels.map((label) => {
                return (
                    <SummaryItem
                        key={label.id}
                        labelCount={statusCountMap[label.id]}
                        totalLabelsCount={group.tasks.length}
                        color={label.color}
                        title={label.title}
                    />
                );
            })}
        </div>
    );
}