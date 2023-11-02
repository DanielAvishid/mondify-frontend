import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'boardDB'

console.log(STORAGE_KEY);
// _createBoard()

export const boardService = {
    query,
    getById,
    update,
    remove,
    duplicate,
    addBoard,
    addTaskFromHeader,
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask,
    getEmptyStatusLabel
}

async function query(filterBy = {}) {
    let boards = await storageService.query(STORAGE_KEY)
    if (filterBy.title) {
        const regax = new RegExp(filterBy.title, 'i')
        boards = boards.filter(board => regax.test(board.title))
    }
    return boards
}

async function getById({ board, boardId, taskId }) {
    if (!board) {
        board = await storageService.get(STORAGE_KEY, boardId)
    }
    if (taskId) {
        return board.groups.map(group => group.tasks.find(task => task.id === taskId))
            .filter(Boolean)[0];

    } else {
        return storageService.get(STORAGE_KEY, boardId)
    }
}

async function remove({ board, boardId, groupId, taskId }) {
    if (!board) {
        board = await storageService.get(STORAGE_KEY, boardId);
    }

    const createChange = (prevValue, title, key = "Deleted") => ({
        prevValue,
        newValue: [],
        timestamp: Date.now(),
        key,
        title,
    });

    let change = null;

    if (taskId) {
        const groupsToSave = board.groups.map(group => {
            const updatedTasks = group.tasks.filter(task => {
                if (task.id === taskId) {
                    change = createChange(task, task.title);
                }
                return task.id !== taskId;
            });
            return { ...group, tasks: updatedTasks };
        });
        board = { ...board, groups: groupsToSave };
    } else if (groupId) {
        const groupToRemove = board.groups.find(group => group.id === groupId);
        if (groupToRemove) {
            change = createChange(groupToRemove, groupToRemove.title, 'Group Deleted');
            board.groups = board.groups.filter(group => group.id !== groupId);
        }
    } else {
        return await storageService.remove(STORAGE_KEY, boardId);
    }

    if (change) {
        board.activities.unshift(change);
    }

    return await storageService.put(STORAGE_KEY, board);
}



// async function remove({ board, boardId, groupId, taskId }) {
//     if (!board) {
//         board = await storageService.get(STORAGE_KEY, boardId)
//     }
//     if (taskId) {
//         const groupsToSave = board.groups.map(group => {
//             const updatedTasks = group.tasks.filter(task => task.id !== taskId)
//             return { ...group, tasks: updatedTasks }
//         })
//         board = { ...board, groups: groupsToSave }
//     } else if (groupId) {
//         board.groups = board.groups.filter((group) => group.id !== groupId)
//     } else {
//         return await storageService.remove(STORAGE_KEY, boardId)
//     }
//     return await storageService.put(STORAGE_KEY, board)
// }

async function addBoard(board) {
    board.createdBy = userService.getLoggedinUser() || {
        "_id": "UjCos",
        "fullname": "Carmel Amarillio",
        "imgUrl": "https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/08/gettyimages-464163411.jpg?crop=1.0xw:1xh;center,top&resize=980:*"
    }
    // board.members = [userService.getLoggedinUser() || {
    //     "_id": "UjCos",
    //     "fullname": "Carmel Amarillio",
    //     "imgUrl": "https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/08/gettyimages-464163411.jpg?crop=1.0xw:1xh;center,top&resize=980:*"
    // }]
    console.log(board);
    return await storageService.post(STORAGE_KEY, board)
}

async function addTaskFromHeader(board, task = getEmptyTask()) {
    board.groups[0].tasks.unshift(task)
    const savedBoard = await storageService.put(STORAGE_KEY, board)
    return savedBoard
}
// update({ board, boardId, groupId, value: task }) === addTask()
// update({ board, boardId, taskId, key: title, value: "new title" }) === updateTask()

async function update({ board, boardId, groupId, taskId, key, value }) {
    if (!board) {
        board = await storageService.get(STORAGE_KEY, boardId);
    }

    const createChange = (prevValue, newValue, title, key) => ({
        prevValue,
        newValue,
        timestamp: Date.now(),
        title,
        key,
    });

    let change = null;

    if (taskId) {
        const groupsToSave = board.groups.map((group) => {
            const updatedTasks = group.tasks.map((task) => {
                if (task.id === taskId) {
                    change = createChange(task[key], value, task.title, key);
                    return { ...task, [key]: value };
                }
                return task;
            });
            return { ...group, tasks: updatedTasks };
        });
        board = { ...board, groups: groupsToSave };
    } else if (groupId) {
        const groupIdx = board.groups.findIndex((group) => group.id === groupId);
        if (key === 'tasks') {
            change = createChange(board.groups[groupIdx][key], value, value[value.length - 1].title, 'created');
        } else if (key === 'title') {
            change = createChange(board.groups[groupIdx][key], value, board.groups[groupIdx].title, 'Group Title Change');
        } else {
            change = createChange(board.groups[groupIdx][key], value, board.groups[groupIdx].title, key);
        }
        board.groups[groupIdx][key] = value;
    } else {
        change = createChange(board[key], value, 'New Group', 'Group Created');
        board[key] = value;
    }

    if (change) {
        board.activities.unshift(change);
    }

    console.log('SERVICE', board);
    return await storageService.put(STORAGE_KEY, board);
}
// async function update({ board, boardId, groupId, taskId, key, value }) {
//     if (!board) {
//         board = await storageService.get(STORAGE_KEY, boardId);
//     }

//     const location = {
//         board: boardId,
//         group: groupId,
//         task: taskId,
//         key
//     };

//     let prevValue;

//     if (taskId) {
//         if (!groupId) {
//             const updatedGroups = board.groups.map((group) => {
//                 const updatedTasks = group.tasks.map((task) => {
//                     if (task.id === taskId) {
//                         prevValue = task[key]; // Store the previous value
//                         return { ...task, [key]: value };
//                     }
//                     return task;
//                 });
//                 return { ...group, tasks: updatedTasks };
//             });
//             board = { ...board, groups: updatedGroups };
//         } else {
//             const groupIdx = board.groups.findIndex((group) => group.id === groupId);
//             const taskIdx = board.groups[groupIdx].tasks.findIndex((task) => task.id === taskId);
//             prevValue = board.groups[groupIdx].tasks[taskIdx][key]; // Store the previous value
//             board.groups[groupIdx].tasks[taskIdx][key] = value;
//         }
//     } else if (groupId) {
//         const groupIdx = board.groups.findIndex((group) => group.id === groupId);
//         if (!key) {
//             board.groups[groupIdx].tasks.push(value);
//         } else {
//             prevValue = board.groups[groupIdx][key]; // Store the previous value
//             board.groups[groupIdx][key] = value;
//         }
//     } else {
//         if (!key) {
//             board.groups.push(value);
//         } else {
//             prevValue = board[key]; // Store the previous value
//             board[key] = value;
//         }
//     }

//     const change = {
//         prevValue,
//         newValue: value,
//         timestamp: Date.now(),
//         location
//     };

//     board.activities.unshift(change);

//     console.log('SERVICE', board);
//     return await storageService.put(STORAGE_KEY, board);
// }

async function duplicate({ boardId, groupId, taskId }) {
    const board = await storageService.get(STORAGE_KEY, boardId)
    console.log(boardId, 'SERVICE')
    if (taskId) {
        const groupIdx = board.groups.findIndex((group) => group.id === groupId)
        const task = { ...board.groups[groupIdx].tasks.find((task) => task.id === taskId) }
        task.id = utilService.makeId()
        task.title += '(copy)'
        console.log(task);
        board.groups[groupIdx].tasks.push(task)
    } else if (groupId) {
        const group = { ...board.groups.find(group => group.id === groupId) }
        console.log(group)
        group.tasks = group.tasks.map(task => ({ ...task, id: utilService.makeId() }))
        group.id = utilService.makeId()
        group.title = 'Duplicate of ' + group.title
        board.groups.push(group)
    } else {
        board.title = 'Duplicate of ' + board.title
        return await addBoard(board)
    }

    return await storageService.put(STORAGE_KEY, board)
}

////////////////////////////////////////////////////////////////////////////// get empty
function getEmptyBoard() {
    return {
        title: "New Board",
        description: "Manage any type of project. Assign owners, set timelines and keep track of where your project stands.",
        isStarred: false,
        archivedAt: Date.now(),
        createdBy: {
            "_id": "UjCos",
            "fullname": "Carmel Amarillio",
            "imgUrl": "https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/08/gettyimages-464163411.jpg?crop=1.0xw:1xh;center,top&resize=980:*"
        },
        style: {
            backgroundImage: ""
        },
        statusLabels: [
            {
                "id": "ls101",
                "title": "Working on it",
                "color": "#fdab3d"
            },
            {
                "id": "ls102",
                "title": "Stuck",
                "color": "#e2445c"
            },
            {
                "id": "ls103",
                "title": "Done",
                "color": "#00c875"
            },
            {
                "id": "ls104",
                "title": "",
                "color": "#c4c4c4",
                "isDefault": true
            }
        ],
        priorityLabels: [
            {
                "id": "lp101",
                "title": "Critical ⚠️️",
                "color": "#333333"
            },
            {
                "id": "lp102",
                "title": "High",
                "color": "#401694"
            },
            {
                "id": "lp103",
                "title": "Medium",
                "color": "#5559df"
            },
            {
                "id": "lp104",
                "title": "Low",
                "color": "#579bfc"
            },
            {
                "id": "lp105",
                "title": "",
                "color": "#c4c4c4",
                "isDefault": true
            }
        ],
        groups: [
            {
                "id": utilService.makeId(),
                "title": "Programming",
                "archivedAt": Date.now(),
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Fix handle change func",
                        "status": "ls101",
                        "priority": "lp103",
                        "timeline": [1698155558000, 1698955558000],
                        "members": ["WOWOWO"],
                        "date": 1699635558000
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Remove tasks",
                        "status": "ls103",
                        "priority": "lp101",
                        "timeline": [1697855558000, 1696755558000],
                        "members": ["UjCos"],
                        "date": 1699435558000
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Update response time",
                        "status": "ls102",
                        "priority": "lp102",
                        "timeline": [],
                        "members": ["KKLLSS", "UjCos"],
                        "date": 1699235558000
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Add rating stars",
                        "status": "ls101",
                        "priority": "lp101",
                        "timeline": [1698825558000, 1698925558000],
                        "members": ["WOWOWO"],
                        "date": 1698255558000
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Update react version",
                        "status": "ls102",
                        "priority": "lp101",
                        "timeline": [1698155558000, 1698955558000],
                        "members": ["UjCos"],
                        "date": 1699235558000
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Update response time",
                        "status": "ls101",
                        "priority": "lp103",
                        "timeline": [1697655558000, 1699955558000],
                        "members": ["KKLLSS", "UjCos"],
                        "date": 1698555558000
                    },
                ],
                "style": { "backgroundColor": "#579BFC" }
            }, {
                "id": utilService.makeId(),
                "title": "Managment",
                "archivedAt": Date.now(),
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Implement Data Structures",
                        "status": "ls102",
                        "priority": "lp103",
                        "timeline": [1698795558000, 1697153558000],
                        "members": ["KKLLSS", "WOWOWO", "UjCos"],
                        "date": 1698955558000
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Optimize Algorithms",
                        "status": "ls103",
                        "priority": "lp102",
                        "timeline": [1698835558000, 1698875558000],
                        "members": ["UjCos", "WOWOWO"],
                        "date": 1697235558000
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Database Design",
                        "status": "ls103",
                        "priority": "lp101",
                        "timeline": [],
                        "members": ["KKLLSS", "UjCos"],
                        "date": null
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "UI/UX Improvements",
                        "status": "ls101",
                        "priority": "lp102",
                        "timeline": [1698815558000, 1698335558000],
                        "members": ["WOWOWO"],
                        "date": 1692835558000
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Security Audit",
                        "status": "ls101",
                        "priority": "lp101",
                        "timeline": [1698155558000, 1698955558000],
                        "members": ["WOWOWO"],
                        "date": 1698155558000
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Machine Learning Module",
                        "status": "ls103",
                        "priority": "lp102",
                        "timeline": [],
                        "members": ["UjCos"],
                        "date": null
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Integration Setup",
                        "status": "ls102",
                        "priority": "lp101",
                        "timeline": [1697835558000, 1697835558000],
                        "members": ["WOWOWO", "KKLLSS"],
                        "date": 1699235558000
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Bug Fixes",
                        "status": "ls101",
                        "priority": "lp101",
                        "timeline": [1698835558000, 1698835558000],
                        "members": ["WOWOWO", "UjCos"],
                        "date": 1698835558000
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Documentation Update",
                        "status": "ls103",
                        "priority": "lp103",
                        "timeline": [],
                        "members": ["UjCos", "KKLLSS"],
                        "date": null
                    }
                ],
                "style": {
                    "backgroundColor": "#ff4d4d"
                }
            },

            {
                "id": utilService.makeId(),
                "title": "UI/UX",
                "archivedAt": Date.now(),
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Make it look better",
                        "status": "ls103",
                        "priority": "lp102",
                        "timeline": [1698235558000, 1696835558000],
                        "members": ["UjCos"],
                        "date": 1698335558000
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Fix main button",
                        "status": "ls102",
                        "priority": "lp101",
                        "timeline": [1697835558000, 1699235558000],
                        "members": ["KKLLSS", "WOWOWO"],
                        "date": 1679819200000
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Check New libraries",
                        "status": "ls102",
                        "priority": "lp103",
                        "timeline": [1698835558000, 1698835558000],
                        "members": ["KKLLSS"],
                        "date": 1698835558000
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Update modal layout",
                        "status": "ls103",
                        "priority": "lp101",
                        "timeline": [1698835558000, 1698835558000],
                        "members": ["KKLLSS", "WOWOWO", "UjCos"],
                        "date": 1698835558000
                    }
                ],
                "style": { "backgroundColor": "#A25DDC" }
            },
            {
                "id": utilService.makeId(),
                "title": "Analysis",
                "archivedAt": Date.now(),
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Data collection",
                        "status": "ls101",
                        "priority": "lp103",
                        "timeline": [1698835558000, 1698835558000],
                        "members": ["UjCos"],
                        "date": 1698835558000
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Renew data",
                        "status": "ls102",
                        "priority": "lp101",
                        "timeline": [1698835558000, 1698835558000],
                        "members": ["KKLLSS", "WOWOWO"],
                        "date": null
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Check for duplicates",
                        "status": "ls101",
                        "priority": "lp102",
                        "timeline": [1698835558000, 1698835558000],
                        "members": ["WOWOWO"],
                        "date": 1698835558000
                    },
                ],
                "style": { "backgroundColor": "#00c875" }
            }
        ],

        activities: [],

        members: [
            {
                "_id": "UjCos",
                "fullname": "Carmel Amarillio",
                "imgUrl": "https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/08/gettyimages-464163411.jpg?crop=1.0xw:1xh;center,top&resize=980:*"
            },
            {
                "_id": "KKLLSS",
                "fullname": "Daniel Avishid",
                "imgUrl": "https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            },
            {
                "_id": "WOWOWO",
                "fullname": "Ofir Kaspi",
                "imgUrl": "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg?w=136&h=136"
            }
        ],

        cmpsOrder: [
            {
                "id": "co101",
                "title": "Members",
                "type": "members"
            },
            {
                "id": "co102",
                "title": "Status",
                "type": "status"
            },
            {
                "id": "co103",
                "title": "Priority",
                "type": "priority"
            },
            {
                "id": "co104",
                "title": "Due Date",
                "type": "date"
            },
            {
                "id": "co105",
                "title": "Timeline",
                "type": "timeline"
            }
        ]
    }
}

function getEmptyGroup() {
    console.log('get here');
    return {
        id: utilService.makeId(),
        title: 'New Group',
        archivedAt: Date.now(),
        tasks: [],
        style: {
            backgroundColor: utilService.getRandomColor()
        }
    }
}

function getEmptyTask(title = 'New Item') {
    return {
        id: utilService.makeId(),
        title,
        status: "ls104",
        priority: "lp105",
        members: [],
        timeline: [],
        Date: null
    }
}

function getEmptyStatusLabel() {
    return {
        id: utilService.makeId(),
        title: '',
        color: utilService.getRandomLabelColor()
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
function _createBoard() {
    const board = {
        title: "Robot dev proj",
        isStarred: false,
        archivedAt: 1589983468418,
        createdBy: {
            "_id": "UjCos",
            "fullname": "Carmel Amarillio",
            "imgUrl": "https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/08/gettyimages-464163411.jpg?crop=1.0xw:1xh;center,top&resize=980:*"
        },
        style: {
            backgroundImage: ""
        },
        labels: {
            status: [
                {
                    "id": "ls101",
                    "title": "Done",
                    "color": "#00c875"
                },
                {
                    "id": "ls102",
                    "title": "Working on it",
                    "color": "#fdab3d"
                },
                {
                    "id": "ls103",
                    "title": "Stuck",
                    "color": "#e2445c"
                },
                {
                    "id": "ls104",
                    "title": "",
                    "color": "#c4c4c4",
                    "isDefault": true
                }
            ],
            priority: [
                {
                    "id": "lp101",
                    "title": "Critical ⚠️️",
                    "color": "#333333"
                },
                {
                    "id": "lp102",
                    "title": "High",
                    "color": "#401694"
                },
                {
                    "id": "lp103",
                    "title": "Medium",
                    "color": "#5559df"
                },
                {
                    "id": "lp104",
                    "title": "Low",
                    "color": "#579bfc"
                },
                {
                    "id": "lp105",
                    "title": "",
                    "color": "#c4c4c4",
                    "isDefault": true
                }
            ]
        },
        members: [
            {
                "_id": "DOGWC",
                "fullname": "Daniel Avishid",
                "imgUrl": "https://hips.hearstapps.com/hmg-prod/images/happy-dog-outdoors-royalty-free-image-1652927740.jpg?crop=0.447xw:1.00xh;0.187xw,0&resize=980:*"
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
                        "title": "Replace logo",
                        "status": "Done", // monday
                        "priority": "lp101",
                        "timeline": [1696280400000, 1679040000000],
                        "members": ["UjCos"],
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples",
                        "status": "Waiting for QA", // monday
                        "priority": "lp103",
                        "timeline": [1679040000000, 1696907932000],
                        "members": ["DOGWC", "UjCos"],
                    }
                ],
                "style": { "backgroundColor": "#0073ea" }
            },
            {
                "id": "g102",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that",
                        "archivedAt": 1589983468418,
                        "status": "Done", // monday
                        "priority": "lp101",
                        "timeline": [1679040000000, 1697407100000],
                        "members": ["UjCos", "tZQiB", "DOGWC"],
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "status": "Working on it", // monday
                        "priority": "lp102",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436,
                                "byMember": {
                                    "_id": "UjCos",
                                    "fullname": "Carmel Amarillio",
                                    "imgUrl": "ttps://hips.hearstapps.com/ghk.h-cdn.co/assets/16/08/gettyimages-464163411.jpg?crop=1.0xw:1xh;center,top&resize=980:*"
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
                        "members": ["UjCos", "DOGWC", "tZQiB"],
                        "labelIds": ["l101", "l102"],
                        "timeline": [1695418275139, 1698407932000],
                        "byMember": {
                            "_id": "DOGWC",
                            "username": "danielavishid",
                            "fullname": "Daniel Avishid",
                            "imgUrl": "https://hips.hearstapps.com/hmg-prod/images/happy-dog-outdoors-royalty-free-image-1652927740.jpg?crop=0.447xw:1.00xh;0.187xw,0&resize=980:*"
                        },
                        "style": {
                            "backgroundColor": "#a25ddc"
                        }
                    }
                ],
                "style": { "backgroundColor": "#a25ddc" }
            }
        ],
        activities: [
            {
                "id": "a101",
                "txt": "Changed Color",
                "createdAt": 154514,
                "byMember": {
                    "_id": "tZQiB",
                    "fullname": "Ofir Kaspi",
                    "imgUrl": "https://hips.hearstapps.com/hmg-prod/images/lonely-pug-royalty-free-image-1652974264.jpg?crop=0.447xw:1.00xh;0.355xw,0&resize=980:*"
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

        cmpsOrder: [
            {
                "id": "co101",
                "title": "Members",
                "type": "members"
            },
            {
                "id": "co102",
                "title": "Status",
                "type": "status"
            },
            {
                "id": "co103",
                "title": "Priority",
                "type": "priority"
            },
            {
                "id": "co104",
                "title": "Date",
                "type": "timeline"
            }
        ]
    }
    addBoard(board)
}

// CHECK WITH ME BEFORE USING !!!! (OFIR)

async function saveUser(user) {
    const savedUsers = await storageService.post('userDB', user)
    return savedUsers
}

// _createUser()

function _createUser() {
    const user =
        // {
        //     "fullname": "Daniel Avishid",
        //     "username": "danielavishid",
        //     "email": "danielavishid@mondify.com",
        //     "password": "danielavishid",
        //     "imgUrl": "https://hips.hearstapps.com/hmg-prod/images/happy-dog-outdoors-royalty-free-image-1652927740.jpg?crop=0.447xw:1.00xh;0.187xw,0&resize=980:*",
        //     // "mentions": [{ //optional
        //     //     "id": "m101",
        //     //     "boardId": "m101",
        //     //     "taskId": "t101"
        //     // }]
        // }

        // {
        //     "fullname": "Ofir Kaspi",
        //     "username": "ofirkaspi",
        //     "email": "ofirkaspi@mondify.com",
        //     "password": "ofirkaspi",
        //     "imgUrl": "https://hips.hearstapps.com/hmg-prod/images/lonely-pug-royalty-free-image-1652974264.jpg?crop=0.447xw:1.00xh;0.355xw,0&resize=980:*",
        //     // "mentions": [{ //optional
        //     //     "id": "m101",
        //     //     "boardId": "m101",
        //     //     "taskId": "t101"
        //     // }]
        // }

        // {
        //     "fullname": "Carmel Amarillio",
        //     "username": "carmelamarillio",
        //     "email": "carmelamarillio@mondify.com",
        //     "password": "carmelamarillio",
        //     "imgUrl": "https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/08/gettyimages-464163411.jpg?crop=1.0xw:1xh;center,top&resize=980:*",
        //     // "mentions": [{ //optional
        //     //     "id": "m101",
        //     //     "boardId": "m101",
        //     //     "taskId": "t101"
        //     // }]
        // }
        saveUser(user)
}