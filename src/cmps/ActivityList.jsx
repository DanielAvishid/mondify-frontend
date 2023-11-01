import { ActivityPreview } from "./ActivityPreview";

export function ActivityList({ board }) {
    return (
        <section className="activity-list">
            {board.activities.map((activity, idx) => (
                <ActivityPreview key={idx} board={board} activity={activity} />
            ))}
        </section>
    )
}