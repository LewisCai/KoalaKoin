import { Link, NavLink } from 'react-router-dom';
import './index.scss';
import LogoL from '../../assets/images/logo-l.png';

const Sidebar = () => (
    <div className='nav-bar'>
        <Link className='logo' to='/'>
            <img src={LogoL} alt="logo"/>
        </Link>
        <nav>
            <NavLink exact="true" activeclassname='active' to='/'>
                Home
            </NavLink>
            <NavLink exact="true" activeclassname='active' className="about-link" to='/about'>
                About
            </NavLink>
            <NavLink exact="true" activeclassname='active' className="contact-link" to='/contact'>
                Contact
            </NavLink>
        </nav>
    </div>
)

export default Sidebar;
