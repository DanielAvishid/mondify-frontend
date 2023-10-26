import { Icon, Search } from "monday-ui-react-core"
import { Invite, Close } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useState } from "react"


export function Members({ info, board }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const membersIds = info
    const modalMembers = board.members.filter(member => !membersIds.includes(member._id));


    return (
        <td className="task-item members-cell members-col grid align-center justify-center" onClick={() => setIsModalOpen(!isModalOpen)}>
            {/* <div className="add-member grid align-center"> */}
            <span className="plus-container flex align-center justify-center">+</span>

            {membersIds.length > 0 ? membersIds.map((memberId) => {
                const matchingMember = board.members.find(member => member._id === memberId);
                return (
                    <img
                        key={memberId}
                        className="avatar grid align-center justify-center"
                        src={matchingMember.imgUrl} />
                )
            }) : (
                <img src="https://cdn.monday.com/icons/dapulse-person-column.svg" className="avatar" />
            )}

            {isModalOpen &&
                <div className="members-modal">
                    {membersIds.length > 0 && (
                        <section className="participate-members flex">
                            {membersIds.map((memberId) => {
                                const matchingMember = board.members.find(member => member._id === memberId);
                                return (
                                    <div className="member-container flex align-center" key={memberId}>
                                        <div className="member-details flex align-center">
                                            <img
                                                key={matchingMember._id}
                                                className="avatar"
                                                src={matchingMember.imgUrl}
                                            />
                                            <span className="member-name">{matchingMember.fullname}</span>
                                        </div>
                                        <div className="remove-member flex align-center justify-center">
                                            <Icon
                                                icon={Close}
                                                iconSize={8}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </section>
                    )}
                    <section className="member-picker-container">
                        <div className="member-list">
                            <Search
                                size={Search.sizes.SMALL}
                                placeholder="Search names, roles to teams"
                                wrapperClassName="monday-storybook-search_size"
                            />
                            <div className="suggest-container"><span className="suggest-title">Suggested people</span></div>
                            {modalMembers.map((member) => (
                                <div className="member-row flex align-center" key={member._id}>
                                    <img
                                        key={member._id}
                                        className="avatar grid align-center justify-center"
                                        src={member.imgUrl}
                                    />
                                    <span className="member-name">{member.fullname}</span>
                                </div>
                            ))}
                            <div className="member-row flex align-center">
                                <div className="invite-icon-container grid align-center justify-center">
                                    <Icon
                                        // customColor={group.style.backgroundColor}
                                        // className="invite-icon"
                                        icon={Invite}
                                        iconSize={16}
                                    />

                                </div>
                                <span className="member-name">Invite a new member by email</span>
                            </div>
                        </div>
                    </section>
                </div>
            }
        </td >
    )
}    