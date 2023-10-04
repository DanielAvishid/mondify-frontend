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
    getEmptyBoard,
    duplicate,
    addBoard,
    addTaskFromHeader
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

async function getById({ boardId, taskId }) {
    if (taskId) {
        const board = await storageService.get(STORAGE_KEY, boardId)
        return board.groups.find((group) => group.tasks.find((task) => task.id === taskId))
    } else {
        return storageService.get(STORAGE_KEY, boardId)
    }
}

async function remove({ board, boardId, groupId, taskId }) {
    if (!board) {
        board = await storageService.get(STORAGE_KEY, boardId)
    }
    if (taskId) {
        const groupsToSave = board.groups.map(group => group.tasks.filter(task => task.id !== taskId))
        board.groups = groupsToSave
    } else if (groupId) {
        const groupIdx = board.groups.findIndex((group) => group.id === groupId)
        board.groups.splice(groupIdx, 1)
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
    return await storageService.post(STORAGE_KEY, board)
}

async function addTaskFromHeader(board, task) {
    board.groups[0].tasks.push(task)
    const savedBoard = await storageService.put(STORAGE_KEY, board)
    return savedBoard
}
// update({ board, boardId, groupId, value: task }) === addTask()
// update({ board, boardId, taskId, key: title, value: "new title" }) === updateTask()
async function update({ board, boardId, groupId, taskId, key, value }) {
    if (!board) {
        board = await storageService.get(STORAGE_KEY, boardId)
    }
    let savedBoard
    let groupsToSave
    if (taskId) {
        if (!groupId) {
            groupsToSave = board.groups.map(group => group.tasks.map(task => task.id === taskId ? task[key] = value : task))
            board.groups = groupsToSave
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

    savedBoard = await storageService.put(STORAGE_KEY, board)
    return savedBoard
}

async function duplicate({ boardId, groupId, taskId }) {
    const board = await storageService.get(STORAGE_KEY, boardId)
    console.log(boardId, 'SERVICE')
    if (taskId) {
        const groupIdx = board.groups.findIndex((group) => group.id === groupId)
        const task = board.groups[groupIdx].tasks.find((task) => task.id === taskId)
        task.id = utilService.makeId()
        task.title += '(copy)'
        board.groups[groupIdx].tasks.push(task)
    } else if (groupId) {
        const group = board.groups.find(group => group.id === groupId)
        group.id = utilService.makeId()
        group.title = 'Duplicate of ' + group.title
        board.groups.push(group)
    } else {
        board.title = 'Duplicate of ' + board.title
        return await addBoard(board)
    }

    return await storageService.put(STORAGE_KEY, board)
}

function getEmptyBoard() {
    return {

    }
}


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
                        "TaskTitle": "Replace logo",
                        "Status": "Done", // monday
                        "Priority": "Critical",
                        "Date": [1696107932000, 1696418275139],
                        "Members": ["UjCos"],
                    },
                    {
                        "id": "c102",
                        "TaskTitle": "Add Samples",
                        "Status": "Waiting for QA", // monday
                        "Priority": "Medium",
                        "Date": [1696418275139, 1696907932000],
                        "Members": ["DOGWC", "UjCos"],
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
                        "TaskTitle": "Do that",
                        "archivedAt": 1589983468418,
                        "status": "Done", // monday
                        "priority": "Critical",
                        "dueDate": [1696418275139, 1697407100000],
                        "memberIds": ["UjCos", "tZQiB", "DOGWC"],
                    },
                    {
                        "id": "c104",
                        "TaskTitle": "Help me",
                        "Status": "Working on it", // monday
                        "Priority": "High",
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
                        "Members": ["UjCos", "DOGWC", "tZQiB"],
                        "labelIds": ["l101", "l102"],
                        "Date": [1695418275139, 1698407932000],
                        "byMember": {
                            "_id": "DOGWC",
                            "username": "danielavishid",
                            "fullname": "Daniel Avishid",
                            "imgUrl": "https://hips.hearstapps.com/hmg-prod/images/happy-dog-outdoors-royalty-free-image-1652927740.jpg?crop=0.447xw:1.00xh;0.187xw,0&resize=980:*"
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

        cmpsOrder: ["TaskTitle", "Members", "Status", 'Priority', "Date"]
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