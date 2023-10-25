import { utilService } from "../../services/util.service"
import { useState } from "react"
import { LabelModal } from "./LabelModal"

export function Status({ info, board, onSaveBoard, key }) {

    const status = info
    const statusClass = utilService.formatString(status)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className={`task-item status status-cell status-col grid align-center justify-center ${statusClass}`} onClick={() => setIsModalOpen(!isModalOpen)}>
            <span>{status}</span>
            {/* {isModalOpen && <LabelModal labels={['Done', 'Waiting for QA', 'Waiting for dev', 'Waiting for QA and Waiting for dev', 'Working on it', 'Almost', 'Need help', 'Cheers']} />} */}
            {isModalOpen && <LabelModal key={'status'} board={board} labels={board.labels.status} onSaveBoard={onSaveBoard} />}
        </div>
    )
}