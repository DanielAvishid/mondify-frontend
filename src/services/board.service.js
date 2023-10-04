import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'boardDB'

console.log(STORAGE_KEY);

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard
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

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(key, val, board) {
    let savedBoard
    console.log(board, 'SERVICE1')
    if (board._id) {
        board[key] = val
        console.log(board[key], 'SERVICE2')
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
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
                        "title": "Replace logo",
                        "status": "Done", // monday
                        "priority": "Critical",
                        "dueDate": [1696107932000, 1696418275139],
                        "memberIds": ["UjCos"],
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples",
                        "status": "Waiting for QA", // monday
                        "priority": "Medium",
                        "dueDate": [1696418275139, 1696907932000],
                        "memberIds": ["DOGWC", "UjCos"],
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
                        "status": "Done", // monday
                        "priority": "Critical",
                        "dueDate": [1696418275139, 1697407100000],
                        "memberIds": ["UjCos", "tZQiB", "DOGWC"],
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
                        "memberIds": ["UjCos", "DOGWC", "tZQiB"],
                        "labelIds": ["l101", "l102"],
                        "dueDate": [1695418275139, 1698407932000],
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

        cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
    }
    save(board)
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