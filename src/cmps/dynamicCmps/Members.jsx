import { Icon } from "monday-ui-react-core"
import { AddSmall } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useState } from "react"


export function Members({ info, board }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const membersIds = info
    const modalMembers = board.members.filter(member => !membersIds.includes(member._id));


    return (
        <div className="members-cell members-col grid align-center justify-center" onClick={() => setIsModalOpen(!isModalOpen)}>
            {/* <div className="add-member grid align-center"> */}
            <span className="plus-container flex align-center justify-center">+</span>

            {membersIds.length > 0 ? membersIds.map((memberId) => (
                <span
                    key={memberId}
                    className="avatar grid align-center justify-center"
                    style={{ backgroundColor: "#E3425C" }}>
                    {memberId.slice(0, 2).toUpperCase()}
                </span>
            )) :
                <img src="https://cdn.monday.com/icons/dapulse-person-column.svg" className="avatar" />
            }

            {isModalOpen &&
                <div className="members-modal">
                    {modalMembers.map((member) => (
                        <span
                            key={member._id}
                            className="avatar grid align-center justify-center"
                            style={{ backgroundColor: "#E3425C" }}>
                            {member.fullname.split(' ').map(name => name[0]).join('').toUpperCase()}
                        </span>
                    ))}
                </div>
            }
        </div >
    )
}    