import { utilService } from "../services/util.service";
import { DateRange } from "./dynamicCmps/DateRange";
import { GroupValue } from "./dynamicCmps/GroupValue";
import { LabelValue } from "./dynamicCmps/LabelValue";
import { MembersValue } from "./dynamicCmps/MembersValue";
import { TasksValue } from "./dynamicCmps/TasksValue";
import { TextValue } from "./dynamicCmps/TextValue";
import { Time } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { Avatar, Icon } from "monday-ui-react-core";

export function ActivityPreview({ board, activity }) {
    console.log('activity', activity);

    const time = utilService.getTimePassed(activity.timestamp)
    const changeType = utilService.capitalizeFirstLetter(activity.key)

    const title = activity.title

    let style = activity.key === 'Group Created' || activity.key === 'Group Title Change' ? {
        color: board.groups[board.groups.length - 1].style.backgroundColor
    } : {
        color: '#323338'
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
                <span className="ellipsis-text place-span" style={style}>{title}</span>
            </div>
            <div className="change-type flex align-center relative">
                <Icon icon={Time} className="type-icon" />
                <span className="ellipsis-text">{changeType}</span>
            </div>
            <DynamicCmp activity={activity} board={board} />
        </div>
    )
}

const DynamicCmp = ({ activity, board }) => {

    switch (activity.key) {
        case 'timeline':
            return <DateRange activity={activity} />
        case 'date':
        case 'Group Title Change':
        case 'title':
            return <TextValue activity={activity} />
        case 'status':
        case 'priority':
            return <LabelValue activity={activity} board={board} cmpType={activity.key} />
        case 'members':
            return <MembersValue activity={activity} board={board} />
        case 'tasks':
            return <TasksValue activity={activity} board={board} />
        case 'created':
            return <GroupValue activity={activity} board={board} />
        default:
            return null;
    }
};