import { utilService } from "../../services/util.service"
import { useRef, useState } from "react"
import { LabelModal } from "./LabelModal"
import { useClickOutside } from "../../hooks/useClickOutside ";

export function Status({ info, board, onSaveBoard, cmpType }) {


    const statusCell = useRef();
    const { isFocus, setIsFocus } = useClickOutside(statusCell);
    const { isFocus: isModalOpen, setIsFocus: setIsModalOpen } = useClickOutside(statusCell);

    const status = info
    const statusClass = utilService.formatString(status)

    const onClickMembersCell = () => {
        setIsFocus(true)
        setIsModalOpen(!isModalOpen)
    }

    return (
        <td
            className={`task-item status status status-col grid align-center justify-center ${statusClass} ${isFocus ? 'focus' : ''}`}
            ref={statusCell}
            onClick={onClickMembersCell}
        >
            <span>{status}</span>
            {isModalOpen && <LabelModal keyName={cmpType + 'Labels'} board={board} labels={board[cmpType + 'Labels']} onSaveBoard={onSaveBoard} />}
        </td>
    )
}