import { Outlet } from 'react-router-dom';
import Topbar from '../Topbar';
import './index.scss';


const Quiz = () => {
    return (
        <div className='App'>
            <Topbar />
            <div className='page'>
                <Outlet />
            </div>
        </div>
    )
}

export default Quiz