import { useNavigate } from "react-router-dom";
import { Button, Icon, Menu, MenuButton, MenuItem, MenuTitle, Search, SplitButton } from "monday-ui-react-core";
import { Home, MyWeek, Filter, Board, Duplicate, Gantt, Delete, Add, DropdownChevronDown, DropdownChevronLeft, DropdownChevronRight } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useState } from "react";
import { boardService } from "../services/board.service";

export function AppSidebar({ boards, onSaveBoard, onDuplicate, onRemove }) {
    const navigate = useNavigate()
    const [showSidebar, setShowSidebar] = useState(true)

    function onAddBoard() {
        const board = boardService.getEmptyBoard()
        onSaveBoard({ board })
    }

    function toggleSidebar() {
        setShowSidebar(!showSidebar)
    }

    console.log(boards);
    // if (!boards.length) return <div>loading..</div>
    return (
        <section className="app-sidebar flex column">
            <button className="close-btn" onClick={toggleSidebar}>
                <Icon icon={showSidebar ? DropdownChevronLeft : DropdownChevronRight} />
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
                {boards.length > 0 && boards.map(board =>
                    <article key={board._id} className="flex align-center justify-between board-label">
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
                                <MenuItem icon={Duplicate} title="Duplicate Boarder" onClick={() => onDuplicate({ boardId: board._id })} />
                                <MenuItem icon={Delete} title="Delete" onClick={() => onRemove({ boardId: board._id })} />
                            </Menu>
                        </MenuButton>
                    </article>
                )}

            </section>
        </section >
    )
}
