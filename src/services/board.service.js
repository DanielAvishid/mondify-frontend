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
}

async function query(filterBy = {}) {
    let boards = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     boards = boards.filter(car => regex.test(car.vendor) || regex.test(car.description))
    // }
    // if (filterBy.price) {
    //     boards = boards.filter(car => car.price <= filterBy.price)
    // }
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
        board = await storageService.get(STORAGE_KEY, boardId)
    }
    if (taskId) {
        const groupsToSave = board.groups.map(group => {
            const updatedTasks = group.tasks.filter(task => task.id !== taskId)
            return { ...group, tasks: updatedTasks }
        })
        board = { ...board, groups: groupsToSave }
    } else if (groupId) {
        board.groups = board.groups.filter((group) => group.id !== groupId)
    } else {
        return await storageService.remove(STORAGE_KEY, boardId)
    }
    return await storageService.put(STORAGE_KEY, board)
}

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

async function addTaskFromHeader(board, task) {
    board.groups[0].tasks.unshift(task)
    const savedBoard = await storageService.put(STORAGE_KEY, board)
    return savedBoard
}
// update({ board, boardId, groupId, value: task }) === addTask()
// update({ board, boardId, taskId, key: title, value: "new title" }) === updateTask()
async function update({ board, boardId, groupId, taskId, key, value }) {
    if (!board) {
        board = await storageService.get(STORAGE_KEY, boardId)
    }
    if (taskId) {
        if (!groupId) {
            const updatedGroups = board.groups.map(group => {
                const updatedTasks = group.tasks.map(task => {
                    if (task.id === taskId) {
                        return { ...task, [key]: value }
                    }
                    return task;
                })
                return { ...group, tasks: updatedTasks }
            })
            board = { ...board, groups: updatedGroups }
        } else {
            const groupIdx = board.groups.findIndex((group) => group.id === groupId)
            const taskIdx = board.groups[groupIdx].tasks.findIndex((task) => task.id === taskId)
            board.groups[groupIdx].tasks[taskIdx][key] = value
        }
    } else if (groupId) {
        const groupIdx = board.groups.findIndex((group) => group.id === groupId)
        if (!key) {
            board.groups[groupIdx].tasks.push(value)
        } else {
            board.groups[groupIdx][key] = value
        }
    } else {
        if (!key) {
            board.groups.push(value)
        } else {
            board[key] = value
        }
    }
    console.log('SERVICE', board);
    return await storageService.put(STORAGE_KEY, board)
}

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
        title: "Mondify tasks",
        description: "Manage any type of project. Assign owners, set timelines and keep track of where your project stands.",
        isStarred: false,
        archivedAt: Date.now(),
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
                        "priority": "Medium",
                        "timeline": [1677619200000, 1679952000000],
                        "members": ["WOWOWO"],
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Remove tasks",
                        "status": "ls103",
                        "priority": "Critical",
                        "timeline": [1678128000000, 1679872000000],
                        "members": ["UjCos"],
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Update response time",
                        "status": "ls103",
                        "priority": "Medium",
                        "timeline": [1677388800000, 1680048000000],
                        "members": ["KKLLSS", "UjCos"],
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Add rating stars",
                        "status": "ls101",
                        "priority": "Medium",
                        "timeline": [1677772800000, 1680288000000],
                        "members": ["WOWOWO"],
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Update react version",
                        "status": "ls103",
                        "priority": "Critical",
                        "timeline": [1677041200000, 1677041200000],
                        "members": ["UjCos"],
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Update response time",
                        "status": "ls103",
                        "priority": "Medium",
                        "timeline": [1677043200000, 1679971200000],
                        "members": ["KKLLSS", "UjCos"],
                    },
                ],
                "style": { "backgroundColor": "#579BFC" }
            },
            {
                "id": utilService.makeId(),
                "title": "UI/UX",
                "archivedAt": Date.now(),
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Make it look better",
                        "status": "Done",
                        "priority": "Medium",
                        "timeline": [1677619200000, 1680124800000],
                        "members": ["UjCos"],
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Fix main button",
                        "status": "Working on it",
                        "priority": "Critical",
                        "timeline": [1677532800000, 1679872000000],
                        "members": ["KKLLSS", "WOWOWO"],
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Check for new libraries",
                        "status": "Done",
                        "priority": "Medium",
                        "timeline": [1676880000000, 1680201600000],
                        "members": ["KKLLSS"],
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Update modal layout",
                        "status": "Working on it",
                        "priority": "Critical",
                        "timeline": [1676880000000, 1680201600000],
                        "members": ["KKLLSS", "WOWOWO", "UjCos"],
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
                        "status": "Done",
                        "priority": "Medium",
                        "timeline": [1677187200000, 1680110400000],
                        "members": ["UjCos"],
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Renew data",
                        "status": "Done",
                        "priority": "Critical",
                        "timeline": [1677484800000, 1680153600000],
                        "members": ["KKLLSS", "WOWOWO"],
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Check for duplicates",
                        "status": "Working on it",
                        "priority": "Medium",
                        "timeline": [1677619200000, 1680345600000],
                        "members": ["WOWOWO"],
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
        status: "Done",
        priority: "Critical",
        members: ["UjCos"],
        timeline: []
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
                        "priority": "Critical",
                        "timeline": [1696280400000, 1679040000000],
                        "members": ["UjCos"],
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples",
                        "status": "Waiting for QA", // monday
                        "priority": "Medium",
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
                        "priority": "Critical",
                        "timeline": [1679040000000, 1697407100000],
                        "members": ["UjCos", "tZQiB", "DOGWC"],
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "status": "Working on it", // monday
                        "priority": "High",
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