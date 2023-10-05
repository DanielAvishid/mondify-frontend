import { boardService } from "../../services/board.service";
import { ADD_BOARD, BOARD_UNDO, REMOVE_BOARD, SET_BOARDS, UPDATE_BOARD } from "../reducers/board.reducer";
import { store } from "../store"

export function getActionAddBoard(board) {
    return { type: ADD_BOARD, board }
}

export function getActionRemoveBoard(boardId) {
    return { type: REMOVE_BOARD, boardId: boardId }
}

export function getActionUpdateBoard(board) {
    return { type: UPDATE_BOARD, board }
}

export async function loadBoards() {
    try {
        // const { filterBy } = store.getState().toyModule
        // store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const boards = await boardService.query()
        store.dispatch({ type: SET_BOARDS, boards })
    } catch (err) {
        console.log('board action -> Cannot load boards', err)
        throw err
    } finally {
        // store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function getById({ boardId, taskId }) {
    try {
        return await boardService.getById({ boardId, taskId })
    } catch (err) {
        console.log('board action -> Cannot load board/task', err)
    }

}

export async function remove({ board, boardId, groupId, taskId }) {
    try {
        // store.dispatch({ type: REMOVE_BOARD, boardId }) // Optimistic
        const savedBoard = await boardService.remove({ board, boardId, groupId, taskId })
        if (groupId || taskId) {
            store.dispatch({ type: UPDATE_BOARD, board: savedBoard })
        } else {
            store.dispatch({ type: REMOVE_BOARD, boardId })
        }
    } catch (err) {
        // store.dispatch({ type: BOARD_UNDO }) // Optimistic
        console.log('board action -> Cannot remove board', err)
        throw err
    }
}

export async function saveBoard({ board, boardId, groupId, taskId, key, value }) {
    try {
        let boardToSave
        const type = (boardId || board._id) ? UPDATE_BOARD : ADD_BOARD
        if (boardId || board._id) {
            boardToSave = await boardService.update({ board, boardId, groupId, taskId, key, value })
        } else {
            boardToSave = await boardService.addBoard(board)
        }
        store.dispatch({ type, board: boardToSave })
        return boardToSave
    } catch (err) {
        console.log('board action -> Cannot save board', err)
        throw err
    }
}

export async function duplicate({ boardId, groupId, taskId }) {
    try {
        const savedBoard = await boardService.duplicate({ boardId, groupId, taskId })
        console.log(savedBoard, 'ACTION')
        if (groupId || taskId) {
            store.dispatch({ type: UPDATE_BOARD, board: savedBoard })
        } else {
            store.dispatch({ type: ADD_BOARD, board: savedBoard })
        }
    } catch (err) {
        console.log('board action -> Cannot duplicate board', err)
        throw err
    }
}




