export function Members(memberIds) {
    return (
        <div>
            {memberIds.map((memberId) => (
                <span key={memberId}>{memberId.charAt(0)}</span>
            ))}
        </div>
    )
}    