import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SidebarVertical() {
  const location = useLocation();

  const menuItems = [
    {
      path: '/dashboard',
      icon: 'bi-clipboard-data-fill',
      label: 'DASHBOARD'
    },
    {
      path: '/usuarios',
      icon: 'bi-people-fill',
      label: 'USUÁRIOS'
    },
    {
      path: '/dispositivos',
      icon: 'bi-pc-display-horizontal',
      label: 'DISPOSITIVOS'
    },
    {
      path: '/configuracoes',
      icon: 'bi-gear-fill',
      label: 'CONFIGURAÇÕES'
    }
  ];

  return (
    <div className="sidebar">
      <div className='logo-salcomp-redd'></div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link 
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              <i className={`bi ${item.icon}`} style={{ fontSize: '30px', marginRight: '10px' }}></i>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarVertical;
