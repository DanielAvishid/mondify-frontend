import { DoughnutChart } from "./DoughnutChart";

export function GroupListChart({ board }) {
    return (
        <div className="overall-progress-container">
            {board.groups.map((group, index) => (
                <div
                    className="doughnut-container"
                    key={group.id}
                >
                    <h4 >{group.title}</h4>
                    <div>
                        <DoughnutChart group={group} />
                    </div>
                </div>
            ))}
        </div>
    );
}
