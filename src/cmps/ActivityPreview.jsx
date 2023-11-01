import { utilService } from "../services/util.service";
import { Time, NavigationChevronRight } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { Avatar, Icon } from "monday-ui-react-core";

export function ActivityPreview({ board, activity }) {
    console.log(activity);
    const time = utilService.getTimePassed(activity.timestamp)
    const changeType = utilService.capitalizeFirstLetter(activity.location.key)

    let prevValue;
    let newValue;

    switch (activity.location.key) {
        case 'timeline':
            prevValue
            newValue
            break;
        case 'date':
            prevValue = utilService.formatDateFromTimestamp(activity.prevValue)
            newValue = utilService.formatDateFromTimestamp(activity.newValue)
            break;
        case 'status':
            prevValue
            newValue
            break;
        case 'priority':
            prevValue
            newValue
            break;
        case 'title':
            prevValue = activity.prevValue
            newValue = activity.newValue
            break;
        case 'members':
            prevValue
            newValue
            break;
        default:
            prevValue
            newValue
            break;
    }


    let place;

    if (activity.location.task) {
        for (const group of board.groups) {
            const task = group.tasks.find((task) => task.title);
            if (task) {
                place = task.title;
                break; // Stop searching after finding the first task with a title
            }
        }
    } else if (activity.location.group) {
        // Find the group by groupId
        const group = board.groups.find((group) => group.id === activity.location.group);
        if (group) {
            place = group.title;
        }
    } else {
        place = board.title;
    }

    return (
        <div className="activity-preview flex align-center">
            <div className="activity-time flex">
                <Icon icon={Time} className="flex align-center" />
                <span>{time}</span>
            </div>
            <div className="activity-place flex align-center">
                <Avatar
                    type={Avatar.types.IMG}
                    src={"https://style.monday.com/static/media/person1.de30c8ee.png"}
                    className="avatar"
                />
                <span className="ellipsis-text place-span">{place}</span>
            </div>
            <div className="change-type flex align-center relative">
                <Icon icon={Time} className="type-icon" />
                <span className="ellipsis-text">{changeType}</span>
            </div>
            <div className="change-values flex align-center">
                <div className="flex align-center justify-center relative">
                    <span className="prev-val ellipsis-text">{prevValue}</span>
                </div>
                <Icon icon={NavigationChevronRight} className="change-icon" />
                <div className="flex align-center justify-center relative">
                    <span className="new-val ellipsis-text">{newValue}</span>
                </div>
            </div>
        </div>
    )
}