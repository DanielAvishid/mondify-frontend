import { Divider } from "monday-ui-react-core";

export function LabelModal({ key, board, labels, onSaveBoard }) {
    console.log(labels)


    const num = (labels.length >= 6) ? 6 : labels.length

    const styleDiv = {
        gridTemplateRows: `repeat(${num}, 1fr)`
    }

    return (
        <section className="label-modal relative">
            <div className="label-picker-content">
                <div className="label-picker-view">
                    {labels.map(label =>
                        <div key={label.id} className="label-picker">

                        </div>
                    )}
                </div>

            </div>
            <div className="status-picker-footer">

            </div>
        </section>
    )

    // return (
    //     <div className="label-modal">
    //         <div className="label-container" style={styleDiv}>
    //             {labels.map(label =>
    //                 <div key={label.id} className="label-btn" style={{ backgroundColor: label.color }}>
    //                     <button className="label">{label}</button>
    //                 </div >
    //             )}
    //         </div>
    //         <div>
    //             <Divider className="divider" />
    //         </div>
    //         <div className="add-label-container">

    //         </div>
    //     </div>
    // )
}