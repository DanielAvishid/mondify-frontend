import { IconButton } from "monday-ui-react-core"
import { AddUpdate } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"

export function TaskTitle({ info }) {
    const title = info
    return (
        <div className="task-title-col grid align-center">
            <div><span>{title}</span></div>
            <div className="grid align-center justify-center">
                <IconButton icon={AddUpdate} kind={IconButton.kinds.TERTIARY} ariaLabel="Start conversation" size={IconButton.sizes.SMALL} />
            </div>
        </div>
    )
}