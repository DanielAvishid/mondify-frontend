import { Avatar, AvatarGroup, Box, Button, Icon, Search, TextField } from "monday-ui-react-core"
import { Invite, Close } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useEffect, useRef, useState } from "react"
import { InviteMemberModal } from "../dynamicModalCmps/InviteMemberModal"
import { MembersModal } from "../dynamicModalCmps/MembersModal"
import { useClickOutside } from "../../hooks/useClickOutside "


export function Members({ info, task, board, onSaveBoard }) {

    const membersIds = info
    const participateMembers = membersIds.map((memberId) => {
        return board.members.find(member => member._id === memberId)
    })

    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredMembers, setFilteredMembers] = useState([])

    const suggestedMembers = board.members.filter(member => !membersIds.includes(member._id));

    const tdRef = useRef();
    const { isFocus, setIsFocus } = useClickOutside(tdRef);

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
        setIsFocus(!isFocus)
    }

    return (
        <td className="task-item members members-col grid align-center justify-center" ref={tdRef}
            onClick={onClickMembersCell}>
            {/* <div className="add-member grid align-center"> */}
            <span className="plus-container flex align-center justify-center">+</span>


            <AvatarGroup max={1} size={Avatar.sizes.SMALL}>
                {participateMembers.length > 0 ? participateMembers.map((member) => {
                    return (
                        <Avatar
                            key={member._id}
                            size={Avatar.sizes.SMALL}
                            type={Avatar.types.IMG}
                            src={member.imgUrl}
                            ariaLabel={member.fullname}
                        />
                    )
                }) :
                    <Avatar
                        size={Avatar.sizes.SMALL}
                        type={Avatar.types.IMG}
                        src={"https://style.monday.com/static/media/person1.de30c8ee.png"}
                    />
                }
            </AvatarGroup>

            {
                isFocus ?
                    <div className="modal" onClick={(ev) => ev.stopPropagation()}>
                        <div className="pointer"></div>
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
                    : <></>}
        </td >
    )
}    