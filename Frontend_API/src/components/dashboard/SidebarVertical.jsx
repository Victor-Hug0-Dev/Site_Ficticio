
function SidebarVertical() {
  return (
    <div className="sidebar">
          <div className='logo-salcomp-redd'></div>
    <ul className="sidebar-menu">
  <li>
    <a href="#">
      <i className="bi bi-clipboard-data-fill" style={{ fontSize: '30px', marginRight: '10px' }}></i>
      DASHBOARD
    </a>
  </li>
  <li>
    <a href="#">
      <i className="bi bi-people-fill" style={{ fontSize: '30px', marginRight: '10px' }}></i>
      USUÁRIOS
    </a>
  </li>
  <li>
    <a href="#">
      <i className="bi bi-pc-display-horizontal" style={{ fontSize: '30px', marginRight: '10px' }}></i>
      DISPOSITIVOS
    </a>
  </li>
  <li>
    <a href="#">
      <i className="bi bi-gear-fill" style={{ fontSize: '30px', marginRight: '10px' }}></i>
      CONFIGURAÇÕES
    </a>
  </li>
</ul>

    </div>
  );
}

export default SidebarVertical;
