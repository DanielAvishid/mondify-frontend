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

export async function removeBoardOptimistic(boardId) {
    try {
        store.dispatch({ type: REMOVE_BOARD, boardId })
        await boardService.remove(boardId)
    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.log('board action -> Cannot remove board', err)
        throw err
    }
}

export async function saveBoard(key, val, board) {
    try {
        const type = board._id ? UPDATE_BOARD : ADD_BOARD
        const boardToSave = await boardService.save(key, val, board)
        store.dispatch({ type, board: boardToSave })
        return boardToSave
    } catch (error) {
        console.log('board action -> Cannot save board', err)
        throw err
    }
}




