import { useSelector } from "react-redux";
import { SET_SELECTED_TASKS } from "../store/reducers/board.reducer";
import { useDispatch } from "react-redux";


import { Icon } from "monday-ui-react-core"
import { Close, Delete } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"

export function CheckboxModal({ board, onSaveBoard }) {

    const selectedTasks = useSelector(state => state.boardModule.selectedTasks)
    const dispatch = useDispatch()

    const handleDeleteTasks = () => {
        // Create a copy of the board's groups to modify
        const updatedGroups = [...board.groups];

        // Iterate over the selectedTasks structure
        for (const groupId in selectedTasks) {
            if (selectedTasks.hasOwnProperty(groupId)) {
                const group = updatedGroups.find(group => group.id === groupId);
                if (group) {
                    // Get the task IDs to delete from the selectedTasks for this group
                    const taskIdsToRemove = Object.keys(selectedTasks[groupId]);

                    // Filter the group's tasks to remove the selected tasks
                    group.tasks = group.tasks.filter(task => !taskIdsToRemove.includes(task.id));
                }
            }
        }



        onSaveBoard({ boardId: board._id, key: 'groups', value: updatedGroups });
        dispatch({ type: SET_SELECTED_TASKS, selectedTasks: {} });
        // Update the board's groups with the modified tasks
    };



    const groupSpans = Object.keys(selectedTasks).map(groupId => {
        const group = board.groups.find(group => group.id === groupId);
        const taskIds = Object.keys(selectedTasks[groupId]);

        // Calculate the count of tasks
        const taskCount = taskIds.length;

        // Create an array of spans with inline background color style
        const spans = Array.from({ length: taskCount }, (_, index) => (
            <div
                key={index}
                style={{ backgroundColor: group.style.backgroundColor }}
                className="task-dot"
            ></div>
        ));

        return spans;
    });

    const tasksCount = Object.keys(selectedTasks).reduce((total, groupId) => {
        return total + Object.keys(selectedTasks[groupId]).length;
    }, 0);

    const title = (tasksCount > 1) ? 'Tasks selected' : 'Task selected'

    return (
        <div className="checkbox-modal">
            <div className="inner-checkbox-modal flex justify-between">
                <div className="flex">
                    <div className="tasks-count flex align-center justify-center">{tasksCount}</div>
                    <div className="items-selected flex column justify-center">
                        <div className="flex align-center">
                            <span className="checkbox-modal-title">{title}</span>
                        </div>
                        <div className="tasks-dots-container flex align-center">
                            {groupSpans.map((spans, index) => (
                                <div key={index} className="group-tasks flex">
                                    {spans}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="btns-container flex">
                    <div className="delete-tasks column flex align-center justify-center" onClick={handleDeleteTasks}>
                        <Icon icon={Delete} iconSize={28} className="delete-icon" />
                        <span>Delete</span>
                    </div>
                    <div className="close-checkbox-modal flex align-center justify-center" onClick={() => dispatch({ type: SET_SELECTED_TASKS, selectedTasks: {} })}>
                        <Icon icon={Close} iconSize={18} />
                    </div>
                </div>
            </div>
        </div>
    )
}