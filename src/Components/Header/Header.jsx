
import Login from '../auth/login';
import './Header.scss'


function Header(){
    return (
      <div className='all'>
      <nav>
        <div className='left-div'>
        <ul>
        <li>
          <a to="/">Home</a>
        </li>
        <li>
          <a to="/settings">Settings</a>
        </li>
      </ul>
        </div>
        </nav>
      <div className='right-div'>
      <Login />
      </div>

      </div>

      
      );
}

export default Header;