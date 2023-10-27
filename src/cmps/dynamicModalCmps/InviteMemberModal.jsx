import { Button } from "monday-ui-react-core";

export function InviteMemberModal({ setIsInviteModalOpen }) {
    return (
        <div className="invite-member-modal" >
            <div className="header-container">
                <span>Type in email address to invite</span>
            </div>

            <input type="text" placeholder="Enter email" autofocus />

            <div className="buttons-container flex">
                {/* <button onClick={(ev) => console.log(ev)}>Cancel</button>
                                    <button onClick={(ev) => console.log(ev)}>Invite new member</button> */}
                <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} onClick={() => setIsInviteModalOpen(false)}>Cancel</Button>
                <Button size={Button.sizes.SMALL} disabled>Invite new member</Button>
            </div>
        </div>
    )
}