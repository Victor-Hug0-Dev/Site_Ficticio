import '../styles/DashboardPage.css';
import ResponsiveAppBar from '../components/dashboard/ResponsiveAppBar';
import SidebarVertical from '../components/dashboard/SidebarVertical';

function DashboardPage() {
  return (
    <>
      <ResponsiveAppBar />
      <div className="dashboard-layout">
        <SidebarVertical/>

        <div className="coluna-cinza">
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
