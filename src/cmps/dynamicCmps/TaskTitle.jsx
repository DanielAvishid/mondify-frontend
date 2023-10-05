import { IconButton } from "monday-ui-react-core"
import { AddUpdate } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useNavigate } from "react-router"

export function TaskTitle({ title, taskId }) {

    const navigate = useNavigate()
    return (
        <div className="title-cell title-col grid align-center">
            <div><span>{title}</span></div>
            <div className="grid align-center justify-center">
                <IconButton
                    icon={AddUpdate}
                    kind={IconButton.kinds.TERTIARY}
                    ariaLabel="Start conversation"
                    size={IconButton.sizes.SMALL}
                    onClick={() => navigate(`task/${taskId}`)} />
            </div>
        </div>
    )
}