import { Box, Button, Icon, Search, TextField } from "monday-ui-react-core"
import { Invite, Close } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useEffect, useState } from "react"
import { InviteMemberModal } from "../dynamicModalCmps/InviteMemberModal"
import { MembersModal } from "../dynamicModalCmps/MembersModal"


export function Members({ info, task, board, onSaveBoard }) {

    const membersIds = info
    const participateMembers = membersIds.map((memberId) => {
        return board.members.find(member => member._id === memberId)
    })

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredMembers, setFilteredMembers] = useState([])

    const suggestedMembers = board.members.filter(member => !membersIds.includes(member._id));

    useEffect(() => {
        setFilteredMembers(suggestedMembers)
    }, [membersIds])


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

    const onClickMembersCell = () => {
        setIsInviteModalOpen(false)
        setIsModalOpen(!isModalOpen)
    }

    return (
        <td className="task-item members-cell members-col grid align-center justify-center" onClick={onClickMembersCell}>
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
                    <div className="modal" onClick={(ev) => ev.stopPropagation()}>
                        {!isInviteModalOpen ?
                            <MembersModal
                                board={board}
                                task={task}
                                membersIds={membersIds}
                                handleSearch={handleSearch}
                                searchTerm={searchTerm}
                                participateMembers={participateMembers}
                                filteredMembers={filteredMembers}
                                setIsInviteModalOpen={setIsInviteModalOpen}
                                onRemoveMember={onRemoveMember}
                                onSaveBoard={onSaveBoard}
                            /> :

                            <InviteMemberModal
                                board={board}
                                task={task}
                                membersIds={membersIds}
                                setIsInviteModalOpen={setIsInviteModalOpen}
                                onSaveBoard={onSaveBoard}
                            />
                        }
                    </div>
                </>

            }
        </td >
    )
}    