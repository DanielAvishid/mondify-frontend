import { Avatar, AvatarGroup } from "monday-ui-react-core"

export function AvatarGroupCmp({ members }) {
    return (
        <AvatarGroup max={1} size={Avatar.sizes.SMALL}>
            {members.length > 0 ? members.map((member) => {
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
    )
}