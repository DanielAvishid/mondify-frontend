import { Tab, TabList, IconButton, MenuDivider } from "monday-ui-react-core"
import { Close } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"

export function ActivityHeader({ board, navigate }) {
    const location = `/board/${board._id}`
    return (
        <header className="activity-header">
            <div className="close-container">
                <IconButton icon={Close} kind={IconButton.kinds.TERTIARY} size={IconButton.sizes.SMALL} onClick={() => navigate(location)} />
            </div>
            <div className="title-container flex align-center">
                <span className="board-title">{board.title}</span>
                <span className="activity-type"> Log</span>
            </div>
            <div className="activity-view-container">
                <TabList className="tab-list" size="sm">
                    <Tab key='avtivity' tabInnerClassName='tab'>Avtivity</Tab>
                    <Tab key='last-viewed' tabInnerClassName='tab'>Last Viewed</Tab>
                    <Tab key='updates' tabInnerClassName='tab'>Updates</Tab>
                </TabList>
            </div>
            {/* <MenuDivider className='menu-divider' /> */}
        </header>
    )
}