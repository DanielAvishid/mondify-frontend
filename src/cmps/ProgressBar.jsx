export function ProgressBar({ board, group }) {
    return (
        <div className="progress-bar table-grid table">
            <div className="side"></div>
            <div className="checkbox"></div>
            <div className="title-col"></div>
            {board.cmpsOrder.map((cmp, idx) => (
                <div key={idx} className={`${cmp.type}-col grid align-center justify-center`}>
                    <span>{cmp.title}</span>
                </div>
            ))}
            <div className="last-col"></div>
        </div>
    )
}