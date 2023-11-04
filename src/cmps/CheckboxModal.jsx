import { useSelector } from "react-redux";
import { SET_SELECTED_TASKS } from "../store/reducers/board.reducer";
import { useDispatch } from "react-redux";
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
            <span
                key={index}
                style={{ backgroundColor: group.style.backgroundColor }}
            >1</span>
        ));

        return spans;
    });
    return (
        <div className="checkbox-modal">
            <div className="flex">
                {groupSpans.map((spans, index) => (
                    <div key={index} className="group-tasks">
                        {spans}
                    </div>
                ))}
            </div>
            <button onClick={handleDeleteTasks}>Delete Tasks</button>
        </div>
    )
}