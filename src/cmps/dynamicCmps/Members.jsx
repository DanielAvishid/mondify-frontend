import { Icon } from "monday-ui-react-core"
import { AddSmall } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"


export function Members({ info }) {
    const membersIds = info
    return (
        <div className="members-cell members-col grid justify-center">
            <div className="add-member grid align-center">
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
            </div>
        </div >
    )
}    