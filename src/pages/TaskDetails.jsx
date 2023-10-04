import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getById, saveBoard } from "../store/actions/board.action"
import { EditableHeading } from "monday-ui-react-core"

export function TaskDetails() {
    const { boardId, taskId } = useParams()
    const [task, setTask] = useState(null)

    useEffect(() => {
        loadTask()
    }, [boardId, taskId])

    async function loadTask() {
        try {
            const task = await getById({ boardId, taskId })
            setTask(task)
        } catch (err) {
            console.log('Had issues in board details', err)
            console.log('ShowErrorMsg')
            navigate('/board')
        }
    }

    function handleKeyPress(ev) {
        if (ev.key === 'Enter') {
            saveBoard({ key: 'title', value: ev.target.value, boardId, taskId })
            ev.target.blur()
        }
    }

    if (!task) return <span></span>
    console.log(task);
    const { id, title, memberIds } = task
    return (
        // <span></span>
        <section className="task-details">
            <EditableHeading
                type={EditableHeading.types.h2}
                value={title}
                tooltip='Click to Edit'
                tooltipPosition="bottom"
                customColor="#323338"
                onBlur={(ev) => saveBoard({ key: 'title', value: ev.target.value, boardId, taskId })}
                onKeyDown={handleKeyPress}
            />
        </section>
    )
}