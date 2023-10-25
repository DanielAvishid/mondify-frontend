import { useNavigate } from "react-router-dom";
import { Button, Icon, Menu, MenuButton, MenuItem, MenuTitle, Search, SplitButton } from "monday-ui-react-core";
import { Home, MyWeek, Filter, Board, Duplicate, Gantt, Delete, Add, DropdownChevronDown, NavigationChevronLeft, NavigationChevronRight } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useState } from "react";
import { boardService } from "../services/board.service";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export function AppSidebar({ boards, onSaveBoard, onDuplicateBoard, onRemoveBoard, updateBoards }) {
    const navigate = useNavigate()
    const [showSidebar, setShowSidebar] = useState(true)

    function onAddBoard() {
        const board = boardService.getEmptyBoard()
        onSaveBoard({ board })
    }

    function toggleSidebar() {
        setShowSidebar(!showSidebar)
    }

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const newBoards = [...boards]
        const board = newBoards.splice(result.source.index, 1)[0];
        newBoards.splice(result.destination.index, 0, board)
        updateBoards(newBoards)
    }

    console.log(boards);
    return (
        <section className="app-sidebar flex column">
            <button className="close-btn" onClick={toggleSidebar}>
                <Icon className="icon" icon={showSidebar ? NavigationChevronLeft : NavigationChevronRight} />
            </button>
            <section className={`flex column main-sidebar ${showSidebar ? '' : 'close'}`}>
                <Button leftIcon={Home} kind="tertiary" className="home btn">Home</Button>
                <Button leftIcon={MyWeek} kind="tertiary" className="my-week btn">My Week</Button>

                <article className="flex align-center justify-between main-sec">
                    <Button kind="tertiary" rightIcon={DropdownChevronDown}>
                        <span></span>Main workspace
                    </Button>
                    <MenuButton>
                        <Menu id="menu" size="large">
                            <MenuItem icon={Add} title="Add new Workspace" />
                            <MenuItem icon={Home} title="Add new Workspace" />
                            <MenuItem icon={Home} title="Add new Workspace" />
                        </Menu>
                    </MenuButton>

                </article>
                <article className="flex align-center justify-between search-sec">
                    <Search placeholder="Search" iconName={Filter} className="search" />
                    <span><Button
                        size="md"
                        onClick={onAddBoard}>
                        <Add />
                    </Button></span>
                </article>
                <Button leftIcon={Gantt} kind="tertiary" className="test_board btn">Test_board</Button>

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="board" type="group">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {boards.length > 0 && boards.map((board, index) => (
                                    <Draggable draggableId={board._id} index={index} key={board._id}>
                                        {(provided) => (
                                            <article
                                                className="flex align-center justify-between board-label"
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                ref={provided.innerRef}
                                            >
                                                <Button
                                                    key={board._id}
                                                    onClick={() => navigate(`/board/${board._id}`)}
                                                    leftIcon={Board}
                                                    kind="tertiary"
                                                    className="board btn">
                                                    {board.title}
                                                </Button>
                                                <MenuButton className="board-menu">
                                                    <Menu id="menu" size="large">
                                                        <MenuItem icon={Duplicate} title="Duplicate Board" onClick={() => onDuplicateBoard({ boardId: board._id })} />
                                                        <MenuItem icon={Delete} title="Delete" onClick={() => onRemoveBoard({ boardId: board._id })} />
                                                    </Menu>
                                                </MenuButton>
                                            </article>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </section>
        </section >
    )
}





// {
//     boards.length > 0 && boards.map(board =>
//         <article key={board._id} className="flex align-center justify-between board-label">
//             <Button
//                 key={board._id}
//                 onClick={() => navigate(`/board/${board._id}`)}
//                 leftIcon={Board}
//                 kind="tertiary"
//                 className="board btn">
//                 {board.title}
//             </Button>
//             <MenuButton className="board-menu">
//                 <Menu id="menu" size="large">
//                     <MenuItem icon={Duplicate} title="Duplicate Boarder" onClick={() => onDuplicate({ boardId: board._id })} />
//                     <MenuItem icon={Delete} title="Delete" onClick={() => onRemove({ boardId: board._id })} />
//                 </Menu>
//             </MenuButton>
//         </article>
//     )
// }