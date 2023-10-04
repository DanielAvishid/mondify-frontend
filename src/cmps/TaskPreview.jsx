import { Icon } from "monday-ui-react-core";
import { AddUpdate } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useNavigate } from "react-router";


export function TaskPreview({ task }) {
    const navigate = useNavigate()
    const { title = '', memberIds = [], priority = '', status = '', dueDate = [] } = task

    function getDate(dueDate) {
        if (!dueDate || dueDate.length === 0) {
            return '';
        }

        if (dueDate.length === 1) {
            // If there's only one timestamp, extract it from the array
            dueDate = dueDate[0];
        }

        const currentDate = new Date();
        const date1 = new Date(dueDate[0]);
        const date2 = new Date(dueDate[1]);

        // Function to format a date in 'Month Day' format
        const formatDateDay = (date) => {
            const day = date.getDate()
            return day
        };

        const formatDateMonth = (date) => {
            const month = date.toLocaleString('en-US', { month: 'short' })
            return month
        };

        // Check if both dates are from the same year and month
        if (date1.getFullYear() === currentDate.getFullYear() && date1.getMonth() === date2.getMonth()) {
            return `${formatDateMonth(date1)} ${formatDateDay(date1)} - ${formatDateDay(date2)}`;
        }

        // Check if both dates are from the same year
        if (date1.getFullYear() === date2.getFullYear()) {
            return `${formatDateMonth(date1)} ${formatDateDay(date1)} - ${formatDateMonth(date2), formatDateDay(date2)}`;
        }

        // If one of the dates is from a different year
        const year1 = date1.getFullYear();
        const year2 = date2.getFullYear();

        return `${formatDateMonth(date1)} ${formatDateDay(date1)}, '${year1} - ${formatDateMonth(date2)} ${formatDateDay(date2)}, '${year2}`;
    }

    return (
        <div className="task-preview full-row row">
            <div className="check-row"><input type="checkbox" name="" id="" /></div>
            <div className="item-container">
                <div><span>{title}</span></div>
                <div><Icon icon={AddUpdate} onClick={() => navigate(`task/${task.id}`)} /></div>
            </div>
            <div className="person-container">
                {memberIds.map((memberId) => (
                    <span key={memberId}>{memberId.charAt(0)}</span>
                ))}
            </div>
            <div className="status-container"><span>{status}</span></div>
            <div className="priority-container"><span>{priority}</span></div>
            <div className="timeline-container">
                <div>
                    <span>{getDate(dueDate)}</span>
                </div>
            </div>
        </div>
    )
}