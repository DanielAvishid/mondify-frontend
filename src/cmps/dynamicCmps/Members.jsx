export function Members({ info }) {
    const membersIds = info
    return (
        <div className="members-cell members-col grid align-center justify-center">
            {membersIds.length > 0 ? membersIds.map((memberId) => (
                <span
                    key={memberId}
                    className="grid align-center justify-center"
                    style={{ backgroundColor: "#E3425C" }}>
                    {memberId.charAt(0)}
                </span>
            )) :
                <img src="https://cdn.monday.com/icons/dapulse-person-column.svg" />}
        </div>
    )
}    