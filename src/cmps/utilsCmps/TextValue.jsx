export function TextValue({ value }) {
    return (
        <div className="relative flex align-center justify-center">
            <span className="ellipsis-text">{value}</span>
        </div>
    )
}