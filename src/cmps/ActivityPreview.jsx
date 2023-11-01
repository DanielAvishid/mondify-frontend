import { utilService } from "../services/util.service";
import { Time, NavigationChevronRight } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { Avatar, Icon } from "monday-ui-react-core";

export function ActivityPreview({ board, activity }) {
    console.log(activity);
    const time = utilService.getTimePassed(activity.timestamp)

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
            <div className="activity-change flex align-center">
                <div className="change-type flex">
                    <Icon icon={Time} className="type-icon" />
                    <span>type</span>
                </div>
                <div className="change-values flex align-center">
                    <span className="prev-val flex justify-center">{activity.prevValue}</span>
                    <Icon icon={NavigationChevronRight} className="change-icon" />
                    <span className="new-val flex justify-center">{activity.newValue}</span>
                </div>
            </div>
        </div>
    )
}