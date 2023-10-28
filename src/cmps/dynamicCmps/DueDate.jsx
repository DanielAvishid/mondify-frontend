import { useState } from "react";
import { utilService } from "../../services/util.service";
import { Checkbox, DatePicker, DialogContentContainer } from "monday-ui-react-core";
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';

// const pickerCss = `
// .my-today {
//     color: red
// }
// `

export function DueDate({ info, task, board, group, onSaveBoard }) {
    const { text, percentage } = utilService.getDateToShow(info)
    const [hovered, setHovered] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newDate, setNewDate] = useState(new Date())

    const groupBgc = group.style.backgroundColor
    const backgroundStyle = {
        background: `linear-gradient(90deg, ${groupBgc} ${+percentage}%, var(--inverted-color-background) 0%)`
    };

    const handleDatePick = (date) => {
        console.log('date', date);
        setNewDate(date)
        const startDate = (date.startDate) ? date.startDate._d.getTime() : null
        const endDate = (date.endDate) ? date.endDate._d.getTime() : null
        if (startDate && endDate) {
            onSaveBoard({ board, taskId: task.id, key: "dueDate", value: [startDate, endDate] })
        }
    }

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <td className="task-item dueDate-cell dueDate-col grid align-center justify-center">

            <div
                style={backgroundStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="inner-container"
                onClick={() => setIsModalOpen(!isModalOpen)}
            >
                {info.length ? (
                    <span>{hovered ? `${utilService.calculateDaysDifference(info)}d` : text}</span>
                ) : (
                    <span>{hovered ? `Set Dates` : '-'}</span>
                )}
            </div>

            {isModalOpen &&
                <div className="modal">
                    <div className="pointer"></div>
                    <div className="date-picker-container">
                        <div className="date-picker-header flex align-center"><span>Set Dates</span></div>
                        <DatePicker
                            className="date-picker"
                            numberOfMonths={2}
                            date={newDate.startDate}
                            endDate={newDate.endDate}
                            range
                            data-testid="date-picker"
                            onPickDate={handleDatePick}
                        />
                        <div className="date-picker-footer flex align-center">
                            <Checkbox label="Set as timeline" />
                        </div>
                    </div>
                </div>
            }


            {/* {info.length ? (
                <div
                    style={{ background: `linear-gradient(90deg, rgb(87,155,252) ${+percentage}%, rgb(51,51,51) ${0}%)` }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="inner-container"
                >
                    <span>{hovered ? `${utilService.calculateDaysDifference(info)}d` : text}</span>
                </div>
            ) : (
                <div
                    className="inner-container"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <span>{hovered ? `Set Dates` : '-'}</span>
                </div>
            )} */}
        </td>
    )
}