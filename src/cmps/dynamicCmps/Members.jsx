export function Members({ info }) {
    const membersIds = info

    return (
        <div className="members-cell members-col grid align-center justify-center">
            {membersIds.map((memberId) => (
                <span key={memberId} className="grid align-center justify-center">{memberId.charAt(0)}</span>
            ))}
        </div>
    )
}    