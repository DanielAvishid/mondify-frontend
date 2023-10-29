import { Button, ColorPicker, Divider, EditableHeading, Icon, IconButton } from "monday-ui-react-core";
import { Edit, Drag, Close, AddSmall, HighlightColorBucket } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useState } from "react";

export function LabelModal({ key, board, labels, onSaveBoard }) {
    const [isEditMode, setIsEditMode] = useState(false)
    const [palleteOpenState, setPalleteOpenState] = useState({})
    const [hoverState, setHoverState] = useState({})

    const viewNum = (labels.length >= 6) ? 6 : labels.length
    const editNum = (labels.length >= 6) ? 6 : labels.length + 1

    const styleViewMode = {
        gridTemplateRows: `repeat(${viewNum}, 1fr)`
    }

    const styleEditMode = {
        gridTemplateRows: `repeat(${editNum}, 1fr)`
    }

    function onEditClick(ev) {
        ev.stopPropagation()
        setIsEditMode(!isEditMode)
    }

    function getPlaceHolder(isDefault) {
        if (!isDefault) return 'Add Label'
        else return 'Default Label'
    }

    function toggleRemove(labelId) {
        setHoverState((prevState) => ({
            ...prevState,
            [labelId]: !prevState[labelId]
        }))
    }

    function togglePallete(ev, labelId) {
        ev.stopPropagation()
        setPalleteOpenState((prevState) => ({
            ...prevState,
            [labelId]: !prevState[labelId]
        }))
    }

    return (
        <section className="label-modal relative">
            <div className="label-content">
                {!isEditMode && <div className="label-view-container" style={styleViewMode}>
                    {labels.map(label =>
                        <button key={label.id} className="label-picker" style={{ backgroundColor: label.color }}>
                            {label.title}
                        </button>
                    )}
                </div>}
                {isEditMode && <div className="label-edit-container" style={styleEditMode}>
                    {labels.map(label =>
                        <div key={label.id} className="label-edit label-edit-layout" onMouseEnter={() => toggleRemove(label.id)} onMouseLeave={() => toggleRemove(label.id)}>
                            {palleteOpenState[label.id] && <ColorPicker
                                className="color-picker"
                                colorSize="small"
                            />}
                            {hoverState[label.id] && <Icon className='icon-drag' icon={Drag} />}
                            <div key={label.id} className="label-editable middle" >
                                <button className="color-btn" style={{ backgroundColor: label.color }} onClick={(ev) => togglePallete(ev, label.id)}>
                                    <Icon iconType={Icon.type.SVG} icon={HighlightColorBucket} iconLabel="my bolt svg icon" iconSize={16} style={{ color: '#fff' }} />
                                </button>
                                <input className="label-input" placeholder={getPlaceHolder(label.isDefault)} value={label.title} type="text" />
                            </div>
                            {hoverState[label.id] && <Button size={Button.sizes.XXS} kind={Button.kinds.TERTIARY}><Icon iconSize={16} icon={Close} /></Button>}
                        </div>
                    )}
                    <div className="add-btn-container label-edit-layout">
                        <Button className="add-btn middle" leftIcon={AddSmall} kind={Button.kinds.SECONDARY} >New label</Button>
                    </div>
                </div>}
            </div>
            <div className="label-picker-footer">
                <Divider className="divider" />
                {!isEditMode && <Button className="edit-btn" onClick={(ev) => onEditClick(ev)} leftIcon={Edit} kind={Button.kinds.TERTIARY}>Edit Labels</Button>}
                {isEditMode && <Button className="edit-btn" onClick={(ev) => onEditClick(ev)} kind={Button.kinds.TERTIARY}>Apply</Button>}
            </div>
        </section>
    )

    //     import { Button, ColorPicker, Divider, EditableHeading, Icon, IconButton, Tooltip } from "monday-ui-react-core";
    // import { Edit, Close, AddSmall, HighlightColorBucket } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
    // import { useState } from "react";

    // export function LabelModal({ labelsKey, board, labels, onSaveBoard }) {

    //     const [isEditMode, setIsEditMode] = useState(false)
    //     const [palleteOpenState, setPalleteOpenState] = useState({})
    //     const [removeState, setRemoveState] = useState({})
    //     const num = (labels.length >= 6) ? 6 : labels.length
    //     const num2 = (labels.length >= 6) ? 6 : labels.length + 1

    //     const styleDiv1 = {
    //         gridTemplateRows: `repeat(${num}, 1fr)`
    //     }

    //     const styleDiv2 = {
    //         gridTemplateRows: `repeat(${num2}, 1fr)`
    //     }

    //     const editableAttrs = {
    //         suppressContentEditableWarning: true,
    //         contentEditable: true,
    //         onBlur: onUpdate
    //     }

    //     const whiteIcon = {
    //         color: '#fff'
    //     }

    //     function onEditClick(ev) {
    //         ev.stopPropagation()
    //         setIsEditMode(!isEditMode)
    //     }

    //     function stopPapa(ev) {
    //         ev.stopPropagation()
    //     }

    //     function onUpdate(color, labelId) {
    //         const toSave = labels.find(label => label.id === labelId)
    //         toSave.color = color[0]
    //         console.log(toSave)
    //         onSaveBoard(board, 'labels', toSave)
    //     }

    //     function togglePallete(labelId) {
    //         setPalleteOpenState((prevState) => ({
    //             ...prevState,
    //             [labelId]: !prevState[labelId]
    //         }))
    //     }

    //     function toggleRemove(labelId) {
    //         setRemoveState((prevState) => ({
    //             ...prevState,
    //             [labelId]: !prevState[labelId]
    //         }))
    //     }

    //     function onAddLabel(ev) {
    //         ev.stopPropagation()
    //         const newLabel = {
    //             "id": "ls107",
    //             "title": "",
    //             "color": "#a25ddc"
    //         }
    //         const value = { ...board.labels, [labelsKey]: [...labels.push(newLabel)] }
    //         onSaveBoard({ board, key: 'labels', value })
    //     }

    //     function onRemoveLabel(labelId) {
    //         const value = { ...board.labels, [labelsKey]: labels.filter(label => label.id !== labelId) }
    //         onSaveBoard({ board, key: 'labels', value })
    //     }

    //     function getPlaceHolder(isDefault) {
    //         if (!isDefault) return 'Add Label'
    //         else return 'Default Label'
    //     }

    //     return (
    //         <div className="label-modal-container modal-layout">
    //             {!isEditMode && <div className="label-container middle" style={styleDiv1} >
    //                 {labels.map(label =>
    //                     <button key={label.id} className="label-btn" style={{ backgroundColor: label.color }}>
    //                         {label.title}
    //                     </button>
    //                 )}
    //             </div>}
    //             {isEditMode && <div className="label-edit-container full" style={styleDiv2}>
    //                 {labels.map(label =>
    //                     <div key={label.id} className="modal-layout" onClick={(ev) => stopPapa(ev)} onMouseEnter={() => toggleRemove(label.id)} onMouseLeave={() => toggleRemove(label.id)}>
    //                         <div key={label.id} className="label-edit middle" >
    //                             <button className="color-btn" style={{ backgroundColor: label.color }} onClick={() => togglePallete(label.id)}>
    //                                 <span className="icon-container">
    //                                     <Icon iconType={Icon.type.SVG} icon={HighlightColorBucket} iconLabel="my bolt svg icon" iconSize={16} style={{ color: '#fff' }} />
    //                                 </span>
    //                             </button>
    //                             <input {...editableAttrs} placeholder={getPlaceHolder(label.isDefault)} value={label.title} className="label-input" type="text" onClick={onUpdate} />
    //                             {palleteOpenState[label.id] && <ColorPicker
    //                                 className="color-picker"
    //                                 colorSize="small"
    //                                 onSave={(color) => onUpdate(color, label.id)}
    //                             />}
    //                         </div>
    //                         {removeState[label.id] && <div className="label-delete-container end">
    //                             <button className="delete-btn" onClick={() => onRemoveLabel(label.id)}>
    //                                 <span className="icon-container">
    //                                     <Icon iconType={Icon.type.SVG} icon={Close} iconLabel="my bolt svg icon" iconSize={9} />
    //                                 </span>
    //                             </button>
    //                         </div>}
    //                     </div>)}
    //                 <div className="modal-layout" >
    //                     <Button className="add-btn middle" leftIcon={AddSmall} kind={Button.kinds.SECONDARY} onClick={onAddLabel}>New label</Button>
    //                 </div>
    //             </div>}
    //             <div className="divider-container full">
    //                 <Divider className="divider" />
    //             </div>
    //             <div className="add-label-container full">
    //                 {!isEditMode && <Button className="edit-btn" onClick={(ev) => onEditClick(ev)} leftIcon={Edit} kind={Button.kinds.TERTIARY}>Edit Labels</Button>}
    //                 {isEditMode && <Button className="edit-btn" onClick={(ev) => onEditClick(ev)} kind={Button.kinds.TERTIARY}>Apply</Button>}
    //             </div>
    //         </div >
    //     )
    // }
}