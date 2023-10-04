import { useNavigate } from "react-router-dom";
import { Button, Icon, Menu, MenuButton, MenuItem, MenuTitle, Search, SplitButton } from "monday-ui-react-core";
import { Home, MyWeek, Filter, Board, Gantt, Add, DropdownChevronDown, DropdownChevronLeft, DropdownChevronRight } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { useState } from "react";

export function AppSidebar({ boards, onDuplicate, onRemove }) {
    const navigate = useNavigate()
    const [showSidebar, setShowSidebar] = useState(true)

    function toggleSidebar() {
        setShowSidebar(!showSidebar)
    }

    if (!boards.length) return <div>loading..</div>
    return (
        <section className="app-sidebar flex column">
            <button onClick={() => onRemove({ boardId: 'dKXjZ' })}>TEST</button>
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
                    <span><Button size="md" >
                        <Add />
                    </Button></span>
                </article>
                <Button leftIcon={Gantt} kind="tertiary" className="test_board btn">Test_board</Button>
                {boards.map(board =>
                    <Button
                        key={board._id}
                        onClick={() => navigate(`/board/${board._id}`)}
                        leftIcon={Board}
                        kind="tertiary"
                        className="board btn">
                        {board.title}
                    </Button>
                )}

            </section>
        </section >
    )
}
