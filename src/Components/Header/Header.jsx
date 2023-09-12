
import './Header.scss'


function Header(){
    return (
      <nav>
      <ul>
        <li>
          <a to="/">Home</a>
        </li>
        <li>
          <a to="/settings">Settings</a>
        </li>
      </ul>
    </nav>
      );
}

export default Header;