import { Avatar, Button, Icon } from "monday-ui-react-core"
import { DropdownChevronDown, PersonRound, Time, TextCopy, DropdownChevronRight } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"

export function TaskDetailsActivity() {
    return (
        <section className="task-details-activity">
            <div className="container">
                <div className="automation">
                    <span>Other activities</span>
                    <div className="flex align-center">
                        <button className="btn">Integrations Activity</button>
                        <button className="btn">Automations Activity</button>
                    </div>
                </div>
                <div className="filter">
                    <div className="filter-log">
                        <Button className="filter-log-btn" noSidePadding={true}>
                            <span>Filter Log</span>
                            <Icon className="arrow-icon" icon={DropdownChevronDown} />
                        </Button>
                    </div>
                    <div className="filter-person">
                        <Button className="filter-person-btn" noSidePadding={true} kind={Button.kinds.TERTIARY}>
                            <Icon className="person-icon" icon={PersonRound} />
                            <span>Person</span>
                        </Button>
                    </div>
                </div>
                <div className="activity-log">
                    <div className="activity-container">
                        <div className="time">
                            <Icon icon={Time} className="time-icon" />
                            <span>6h</span>
                        </div>
                        <div className="activity-and-user">
                            <Avatar
                                className="avatar"
                                size="large"
                                src="https://style.monday.com/static/media/person1.de30c8ee.png"
                                type="img"
                            />
                            <div className="text">
                                <span>Newsss</span>
                            </div>
                        </div>
                        <div className="additional-info">
                            <div className="separator"></div>
                            <div className="column-type">
                                <Icon className="dynamic-icon" icon={TextCopy} />
                                <div className="text">
                                    <span>Name</span>
                                </div>
                            </div>
                            <div className="separator"></div>
                            <div className="values-log">
                                <div className="values-container">
                                    <div className="old-value">
                                        <span>Research</span>
                                    </div>
                                    <Icon className="arrow-icon" icon={DropdownChevronRight} />
                                    <div className="new-value">
                                        <span>Task 1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="activity-container">
                        <div className="time">
                            <Icon icon={Time} className="time-icon" />
                            <span>6h</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}