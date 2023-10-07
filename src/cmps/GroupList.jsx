import { Outlet, useOutletContext } from "react-router";
import { GroupPreview } from "./GroupPreview"
import { Add } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { Button } from "monday-ui-react-core";
import { boardService } from "../services/board.service";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";

export function GroupList() {
    const [board, onSaveBoard, onDuplicate, onRemove] = useOutletContext()
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
        console.log(result);
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
                                                onDuplicate={onDuplicate}
                                                onRemove={onRemove}
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
        </ >
    );
}

function _createBoardDemo() {
    return {
        title: "Robot dev proj",
        isStarred: false,
        archivedAt: 1589983468418,
        createdBy: {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        style: {
            backgroundImage: ""
        },
        labels: [
            {
                "id": "l101",
                "title": "Done",
                "color": "#61bd4f"
            },
            {
                "id": "l102",
                "title": "Progress",
                "color": "#61bd33"
            }
        ],
        members: [
            {
                "_id": "u101",
                "fullname": "Tal Tarablus",
                "imgUrl": "https://www.google.com"
            }
        ],
        groups: [
            {
                "id": "g101",
                "title": "Group 1",
                "archivedAt": 1589983468418,
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo"

                    },
                    {
                        "id": "c102",
                        "title": "Add Samples"
                    }
                ],
                "style": {}
            },
            {
                "id": "g102",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that",
                        "archivedAt": 1589983468418,
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "status": "in-progress", // monday
                        "priority": "high",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
                                        "title": "To Do 1",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "memberIds": ["u101"],
                        "labelIds": ["l101", "l102"],
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "backgroundColor": "#26de81"
                        }
                    }
                ],
                "style": {}
            }
        ],
        activities: [
            {
                "id": "a101",
                "txt": "Changed Color",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "group": {
                    "id": "g101",
                    "title": "Urgent Stuff"
                },
                "task": {
                    "id": "c101",
                    "title": "Replace Logo"
                }
            }
        ],

        cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
    }
}
