import { ActivityPreview } from "./ActivityPreview";

export function ActivityList({ board }) {
    return (
        <section className="activity-list">
            {board.activities.map(activity => (
                <ActivityPreview activity={activity} />
            ))}
        </section>
    )
}