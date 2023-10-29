import { utilService } from "../../services/util.service"
import { useState } from "react"
import { LabelModal } from "./LabelModal"

export function Status({ info, board, onSaveBoard, cmpType }) {

    const status = info
    const statusClass = utilService.formatString(status)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <td className={`task-item status status-cell status-col grid align-center justify-center ${statusClass}`} onClick={() => setIsModalOpen(!isModalOpen)}>
            <span>{status}</span>
            {isModalOpen && <LabelModal keyName={cmpType + 'Labels'} board={board} labels={board[cmpType + 'Labels']} onSaveBoard={onSaveBoard} />}
        </td>
    )
}