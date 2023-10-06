import { Divider } from "monday-ui-react-core";

export function LabelModal({ labels }) {

    const num = (labels.length >= 6) ? 6 : labels.length

    const styleDiv = {
        gridTemplateRows: `repeat(${num}, 1fr)`
    }

    return (
        <div className="modal">
            <div className="label-container" style={styleDiv}>
                {labels.map(label =>
                    <div className="label-btn" style={{ backgroundColor: label.color }}>
                        <span className="label">{label}</span>
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