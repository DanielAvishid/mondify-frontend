import { Tooltip } from "monday-ui-react-core";

export function SummaryItem({ labelCount, totalLabelsCount, color, title }) {

    const percentage = ((labelCount / totalLabelsCount) * 100).toFixed(1);

    const style = {
        width: `${percentage}%`,
        backgroundColor: color,
    };

    return (
        <Tooltip content={`${title} ${labelCount}/${totalLabelsCount} ${percentage}%`}>
            <div className="summary-item" style={style}></div>
        </Tooltip>
    );
}