import { Divider } from "monday-ui-react-core";

export function LabelModal({ key, board, labels, onSaveBoard }) {

    const num = (labels.length >= 6) ? 6 : labels.length

    const styleDiv = {
        gridTemplateRows: `repeat(${num}, 1fr)`
    }

    // function onRemove(lablelId) {
    //     const value = { ...board.labels, [key]: labels.filter(lable => lable.id !== lableId) }
    //     onSaveBoard({ board, key: 'labels', value })
    // }

    return (
        <div className="modal">
            <div className="label-container" style={styleDiv}>
                {labels.map(label =>
                    <div key={label.id} className="label-btn" style={{ backgroundColor: label.color }}>
                        <button className="label">{label}</button>
                    </div >
                )}
            </div>
            <div>
                <Divider className="divider" />
            </div>
            <div className="add-label-container">

            </div>
        </div>
    )
}