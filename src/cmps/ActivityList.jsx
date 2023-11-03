import { ActivityPreview } from "./ActivityPreview";

export function ActivityList({ board, filteredActivities }) {
    return (
        <section className="activity-list">
            {filteredActivities.map((activity, idx) => (
                <ActivityPreview key={idx} board={board} activity={activity} />
            ))}
        </section>
    )
}