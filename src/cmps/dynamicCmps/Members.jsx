export function Members({ info }) {
    const membersIds = info
    return (
        <div>
            {membersIds.map((memberId) => (
                <span key={memberId}>{memberId.charAt(0)}</span>
            ))}
        </div>
    )
}    