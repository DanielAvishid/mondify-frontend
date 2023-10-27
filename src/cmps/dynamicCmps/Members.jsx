import { Box, Button, Icon, Search, TextField } from "monday-ui-react-core"
import { Invite, Close } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useState } from "react"


export function Members({ info, task, board, onSaveBoard }) {

    const membersIds = info
    const participateMembers = membersIds.map((memberId) => {
        return board.members.find(member => member._id === memberId)
    })

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const suggestedMembers = board.members.filter(member => !membersIds.includes(member._id));
    const [filteredMembers, setFilteredMembers] = useState(suggestedMembers)


    const handleSearch = (searchValue) => {
        const filtered = suggestedMembers.filter((member) =>
            member.fullname.toLowerCase().includes(searchValue.toLowerCase())
        )

        setSearchTerm(searchValue)
        setFilteredMembers(filtered)
    }

    const onRemoveMember = (memberId) => {
        const updatedMembersIds = membersIds.filter((id) => id !== memberId)
        onSaveBoard({ board, taskId: task.id, key: "members", value: updatedMembersIds })
    }

    const onOpenInviteModal = (ev) => {
        setIsInviteModalOpen(!isInviteModalOpen)
    }


    return (
        <td className="task-item members-cell members-col grid align-center justify-center" onClick={() => setIsModalOpen(!isModalOpen)}>
            {/* <div className="add-member grid align-center"> */}
            <span className="plus-container flex align-center justify-center">+</span>

            {participateMembers.length > 0 ? participateMembers.map((member) => {
                return (
                    <img
                        className="avatar grid align-center justify-center"
                        key={member._id}
                        src={member.imgUrl} />
                )
            }) :
                <img src="https://cdn.monday.com/icons/dapulse-person-column.svg" className="avatar" />
            }

            {isModalOpen &&
                <>
                    <div className="pointer"></div>
                    <div className="modal" onBlur={() => setIsModalOpen(!isModalOpen)} onClick={(ev) => ev.stopPropagation()}>
                        {!isInviteModalOpen ?
                            <div className="members-modal">
                                <section className="participate-members flex">
                                    {participateMembers.length > 0 &&

                                        participateMembers.map((member) => {
                                            return (
                                                <div className="member-container flex align-center" key={member._id}>
                                                    <div className="member-details flex align-center">
                                                        <img
                                                            key={member._id}
                                                            className="avatar"
                                                            src={member.imgUrl}
                                                        />
                                                        <span className="member-name">{member.fullname}</span>
                                                    </div>
                                                    <div className="remove-member flex align-center justify-center" onClick={() => onRemoveMember(member._id)}>
                                                        <Icon
                                                            icon={Close}
                                                            iconSize={8}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </section>
                                <section className="member-list-container">
                                    <Search
                                        size={Search.sizes.SMALL}
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        placeholder="Search names, roles or teams"
                                        wrapperClassName="monday-storybook-search_size"
                                    />
                                    <div className="suggest-container">
                                        <div className="suggest-header"><span>Suggested people</span></div>
                                        {filteredMembers.map((member) => (
                                            <div className="member-row flex align-center" key={member._id} onClick={() => onSaveBoard({ board, taskId: task.id, key: "members", value: [...membersIds, member._id] })}>
                                                <div className="avatar-container flex align-center justify-center">
                                                    <img
                                                        key={member._id}
                                                        className="avatar"
                                                        src={member.imgUrl}
                                                    />
                                                </div>
                                                <span className="member-name">{member.fullname}</span>
                                            </div>
                                        ))}
                                        <div className="invite-row flex align-center">
                                            <div className="icon-container flex align-center justify-center">
                                                <Icon
                                                    // customColor={group.style.backgroundColor}
                                                    className="invite-icon flex align-center justify-center"
                                                    icon={Invite}
                                                    iconSize={16}
                                                />
                                            </div>
                                            <span className="invite-member" onClick={() => setIsInviteModalOpen(true)}>Invite a new member by email</span>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            :

                            <div className="invite-member-modal" onClick={(ev) => ev.stopPropagation()} >
                                <div className="header-container">
                                    <span>Type in email address to invite</span>
                                </div>

                                <input type="text" placeholder="Enter email" />

                                <div className="buttons-container flex">
                                    {/* <button onClick={(ev) => console.log(ev)}>Cancel</button>
                                    <button onClick={(ev) => console.log(ev)}>Invite new member</button> */}
                                    <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} >Cancel</Button>
                                    <Button size={Button.sizes.SMALL} >Invite new member</Button>
                                </div>
                            </div>
                        }
                    </div>
                </>

            }
        </td >
    )
}    