import { utilService } from "../services/util.service";
import { Time, NavigationChevronRight } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { Avatar, Icon } from "monday-ui-react-core";

export function ActivityPreview({ activity }) {
    console.log(activity);
    const time = utilService.getTimePassed(activity.timestamp)

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
                <span>Place</span>
            </div>
            <div className="activity-change flex align-center">
                <div className="change-type flex">
                    <Icon icon={Time} className="type-icon" />
                    <span>type</span>
                </div>
                <div className="change-values flex align-center">
                    <span className="prev-val flex justify-center">before</span>
                    <Icon icon={NavigationChevronRight} className="change-icon" />
                    <span className="new-val flex justify-center">after</span>
                </div>
            </div>
        </div>
    )
}