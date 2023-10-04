export function Date(dueDate) {

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
        <div>
            <div>
                <span>{getDate(dueDate)}</span>
            </div>
        </div>
    )
}