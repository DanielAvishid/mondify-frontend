import { utilService } from "../services/util.service";
import { DateRange } from "./utilsCmps/DateRange";
import { LabelValue } from "./utilsCmps/LabelValue";
import { MembersValue } from "./utilsCmps/MembersValue";
import { TasksValue } from "./utilsCmps/TasksValue";
import { TextValue } from "./utilsCmps/TextValue";
import { Time, NavigationChevronRight } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { Avatar, Icon } from "monday-ui-react-core";

export function ActivityPreview({ board, activity }) {
    console.log('activity', activity);

    const time = utilService.getTimePassed(activity.timestamp)
    const changeType = utilService.capitalizeFirstLetter(activity.key)

    const title = activity.title

    // if (activity.location.task) {
    //     for (const group of board.groups) {
    //         const task = group.tasks.find((task) => task.id === activity.location.task);
    //         if (task) {
    //             place = task.title;
    //             break
    //         }
    //     }
    // } else if (activity.location.group) {
    //     const group = board.groups.find((group) => group.id === activity.location.group);
    //     if (group) {
    //         place = group.title;
    //     }
    // } else {
    //     changeType = 'Group Created'
    //     place = board.groups[board.groups.length - 1].title;
    // }

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
                <span className="ellipsis-text place-span">{title}</span>
            </div>
            <div className="change-type flex align-center relative">
                <Icon icon={Time} className="type-icon" />
                <span className="ellipsis-text">{changeType}</span>
            </div>
            {/* <DynamicCmp activity={activity} board={board} /> */}
        </div>
    )
}

const DynamicCmp = ({ activity, board }) => {
    // NEED TO ADD BOARD ID AND ON SAVE BOARD TO THE CMPS PROPS
    let prevValue
    let newValue
    switch (activity.location.key) {
        case 'timeline':
            return <DateRange activity={activity} />
            break;
        case 'date':
            return <TextValue activity={activity} />
        case 'status':
            return <LabelValue activity={activity} board={board} cmpType='status' />
        case 'priority':
            return <LabelValue activity={activity} board={board} cmpType='priority' />
        case 'title':
            return <TextValue activity={activity} />
        case 'members':
            return <MembersValue activity={activity} board={board} />
        case 'groups':
            prevValue
            newValue
            break
        case 'tasks':
            return <TasksValue activity={activity} board={board} />
        default:
            prevValue
            newValue
            break;
    }
};