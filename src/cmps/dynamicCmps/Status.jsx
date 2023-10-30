import { useEffect, useRef, useState } from "react"
import { LabelModal } from "./LabelModal"
import { useClickOutside } from "../../hooks/useClickOutside"

export function Status({ labelId, board, onSaveBoard, cmpType, setIsTaskFocus, task, group }) {
    const [currLabel, setCurrLabel] = useState(getCurrLabel())
    const statusCell = useRef()
    const { isFocus, setIsFocus } = useClickOutside(statusCell)
    const { isFocus: isModalOpen, setIsFocus: setIsModalOpen } = useClickOutside(statusCell)

    useEffect(() => {
        setCurrLabel(getCurrLabel())
    }, [board.statusLabels, task.status])

    function getCurrLabel() {
        return board[cmpType + 'Labels'].find((label) => label.id === labelId)
    }

    const customStyle = {
        backgroundColor: currLabel.color
    }

    //change to normal function (non-arrow-function)
    const onClickStatusCell = () => {
        setIsTaskFocus(true)
        setIsFocus(true)
        setIsModalOpen(!isModalOpen)
    }

    return (
        <td
            style={customStyle}
            className={`task-item status status status-col grid align-center justify-center ${isFocus ? 'focus' : ''}`}
            ref={statusCell}
            onClick={onClickStatusCell}>
            <span>{currLabel.title}</span>
            {isModalOpen && <LabelModal
                keyName={cmpType + 'Labels'}
                board={board}
                labels={board[cmpType + 'Labels']}
                onSaveBoard={onSaveBoard} task={task}
                group={group}
                cmpType={cmpType} />}
        </td>
    )
}