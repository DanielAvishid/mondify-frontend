import { Outlet, useOutletContext } from "react-router";
import { GroupPreview } from "./GroupPreview"
import { Add } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { Button } from "monday-ui-react-core";
import { boardService } from "../services/board.service";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";

export function GroupList() {
    const [board, onSaveBoard, onRemoveGroup, onRemoveTask, onDuplicateGroup, onDuplicateTask] = useOutletContext()
    const [groups, setGroups] = useState(board.groups)

    useEffect(() => {
        setGroups(board.groups)
    }, [board])

    // const demoBoard = _createBoardDemo()
    // console.log(demoBoard);
    function onAddGroup() {
        const newGroup = boardService.getEmptyGroup()
        const value = [...board.groups, newGroup]
        onSaveBoard({ boardId: board._id, key: 'groups', value })
    }

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const value = [...groups]
        const group = value.splice(result.source.index, 1)[0];
        value.splice(result.destination.index, 0, group)
        onSaveBoard({ boardId: board._id, key: 'groups', value })
        setGroups(value)
    }

    return (
        <>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="group" type="group">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="group-list main-layout full">
                            {groups.map((group, index) => (
                                <Draggable draggableId={group.id} index={index} key={group.id}>
                                    {(provided) => (
                                        <article
                                            className="full"
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                        >
                                            <GroupPreview
                                                // key={group.id}
                                                board={board}
                                                group={group}
                                                onSaveBoard={onSaveBoard}
                                                onDuplicateGroup={onDuplicateGroup}
                                                onDuplicateTask={onDuplicateTask}
                                                onRemoveGroup={onRemoveGroup}
                                                onRemoveTask={onRemoveTask}
                                            />
                                        </article>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            <div className="middle">
                                <Button
                                    kind={Button.kinds.SECONDARY}
                                    leftIcon={Add}
                                    onClick={onAddGroup}>
                                    Add new group
                                </Button>
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <Outlet />
        </>
    )
}
