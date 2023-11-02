export function LabelValue({ value, board, cmpType }) {

    const currLabel = board[cmpType + 'Labels'].find((label) => label.id === value)

    return (
        <div className="label-value relative flex align-center justify-center">
            <span className="ellipsis-text">{value}</span>
        </div>
    )
}