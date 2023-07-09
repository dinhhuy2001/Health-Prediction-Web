import { Link } from 'react-router-dom';

const SideBarItem = ({ item, active }) => {
    return (
        <Link to={item.path} className={active ? 'sidebar-item-active' : 'sidebar-item'}>
            <span className="sidebar-item-label">{item.title}</span>
        </Link>
    );
};
export default SideBarItem;
