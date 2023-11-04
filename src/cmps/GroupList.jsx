import { Outlet, useOutletContext } from "react-router";
import { GroupPreview } from "./GroupPreview"
import { Add } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { Button, Icon } from "monday-ui-react-core";
import { boardService } from "../services/board.service";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";

export function GroupList() {
    const [board, onSaveBoard, onRemoveGroup, onRemoveTask, onDuplicateGroup, onDuplicateTask] = useOutletContext()
    const [groups, setGroups] = useState(board.groups)

    useEffect(() => {
        setGroups(board.groups)
    }, [board])

    const result = {};

    if (board) {
        board.groups.forEach(group => {
            if (group.id) {
                result[group.id] = false;
            }
        })
    }

    const [isCollapse, setIsCollapse] = useState(result)


    function updateIsCollapse(value, currentIsCollapse) {
        const updatedIsCollapse = {};
        for (const key in currentIsCollapse) {
            updatedIsCollapse[key] = value;
        }
        setIsCollapse(updatedIsCollapse);
    }


    // const demoBoard = _createBoardDemo()
    // console.log(demoBoard);
    function onAddGroup() {
        const newGroup = boardService.getEmptyGroup()
        const value = [...board.groups, newGroup]

        setIsCollapse((prevIsCollapse) => ({
            ...prevIsCollapse,
            [newGroup.id]: false
        }));

        onSaveBoard({ boardId: board._id, key: 'groups', value })
    }

    // function handleOnDragEnd(result) {
    //     if (!result.destination) return;
    //     const value = [...groups]
    //     const group = value.splice(result.source.index, 1)[0];
    //     value.splice(result.destination.index, 0, group)
    //     onSaveBoard({ boardId: board._id, key: 'groups', value })
    //     setGroups(value)
    // }


    return (
        <div className="group-list main-layout full">
            <Droppable droppableId="groups" type="groups">
                {(provided, snapshot) => (
                    <section
                        className="main-layout full"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {groups.map((group, index) => (

                            <article
                                key={group.id}
                                className="main-layout full"
                                data-group-id={group.id}
                            >
                                <GroupPreview
                                    index={index}
                                    board={board}
                                    group={group}
                                    onSaveBoard={onSaveBoard}
                                    onRemoveGroup={onRemoveGroup}
                                    onRemoveTask={onRemoveTask}
                                    onDuplicateGroup={onDuplicateGroup}
                                    onDuplicateTask={onDuplicateTask}
                                    isCollapse={isCollapse}
                                    setIsCollapse={setIsCollapse}
                                    updateIsCollapse={updateIsCollapse}
                                />
                            </article>
                        ))}
                        {provided.placeholder}
                    </section>
                )}
            </Droppable>
            {groups.length !== 0 && <div className="add-group-container middle">
                <Button
                    className="new-group-btn"
                    noSidePadding={true}
                    kind={Button.kinds.SECONDARY}
                    onClick={onAddGroup}>
                    <Icon className="add-icon" icon={Add} />
                    <span>Add new group</span>
                </Button>
            </div>}

            <Outlet />
        </div>
    )
}
