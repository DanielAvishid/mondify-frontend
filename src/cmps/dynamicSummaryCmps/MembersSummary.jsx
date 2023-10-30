import { Avatar, AvatarGroup } from "monday-ui-react-core"

export function MembersSummary({ board, group }) {

    const groupMembers = group.tasks.map(task => task.members)
    const flattenedGroupMembers = [].concat(...groupMembers)
    const uniqueGroupMemberIds = [...new Set(flattenedGroupMembers)]
    const boardMembers = board.members

    const memberInfo = uniqueGroupMemberIds.map(memberId => {
        const member = boardMembers.find(boardMember => boardMember._id === memberId);
        return member || {}; // Ensure a member object, even if not found
    });

    return (
        <div className="members-summary flex align-center justify-center">
            <AvatarGroup max={1} size={Avatar.sizes.SMALL}>
                {memberInfo.length > 0 ? memberInfo.map((member) => {
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
        </div >
    )
}