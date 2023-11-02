import { utilService } from "../services/util.service";
import { DateRange } from "./utilsCmps/DateRange";
import { LabelValue } from "./utilsCmps/LabelValue";
import { TextValue } from "./utilsCmps/TextValue";
import { Time, NavigationChevronRight } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { Avatar, Icon } from "monday-ui-react-core";

export function ActivityPreview({ board, activity }) {
    console.log(activity);
    const time = utilService.getTimePassed(activity.timestamp)
    const changeType = utilService.capitalizeFirstLetter(activity.location.key)

    let prevValue
    let newValue

    switch (activity.location.key) {
        case 'timeline':
            prevValue = <DateRange value={activity.prevValue} isNew={false} />
            newValue = <DateRange value={activity.newValue} isNew={true} />
            break;
        case 'date':
            prevValue = <TextValue value={utilService.formatDateFromTimestamp(activity.prevValue)} />
            newValue = <TextValue value={utilService.formatDateFromTimestamp(activity.newValue)} />
            break;
        case 'status':
            prevValue = <LabelValue value={activity.prevValue} board={board} cmpType='status' />
            newValue = <LabelValue value={activity.newValue} board={board} cmpType='status' />
            break;
        case 'priority':
            prevValue = <LabelValue value={activity.prevValue} board={board} cmpType='priority' />
            newValue = <LabelValue value={activity.newValue} board={board} cmpType='priority' />
            break;
        case 'title':
            prevValue = <TextValue value={activity.prevValue} />
            newValue = <TextValue value={activity.newValue} />
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
                break
            }
        }
    } else if (activity.location.group) {
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
                {prevValue}
                <Icon icon={NavigationChevronRight} className="change-icon" />
                {newValue}
            </div>
        </div>
    )
}