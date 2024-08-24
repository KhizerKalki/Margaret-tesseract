import { RiHome3Line } from 'react-icons/ri';
import { FiPieChart } from 'react-icons/fi';
import { HiChartBar } from 'react-icons/hi2';
import { MdSettings } from 'react-icons/md';
import { LuCalendarCheck2 } from 'react-icons/lu';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='h-full flex mx-4 flex-col gap-8 items-center w-20 '>
      <NavLink to='/'>
        <div className='bg-secondary rounded-full p-2 mt-20 link'>
          <RiHome3Line size={28}  className='icon' />
        </div>
      </NavLink>
      <NavLink to='/chart'>
        <div className='bg-secondary rounded-full p-2 link'>
          <FiPieChart size={26} className='icon' />
        </div>
      </NavLink>
      <NavLink to='/graph'>
        <div className='bg-secondary rounded-full p-2 link'>
          <HiChartBar size={26} className='icon' />
        </div>
      </NavLink>
      <NavLink to='/date'>
        <div className='bg-secondary rounded-full p-2 link'>
          <LuCalendarCheck2 size={24}  className='icon'/>
        </div>
      </NavLink>
      <NavLink to='/settings'>
        <div className='bg-secondary rounded-full p-2 link'>
          <MdSettings size={26} className='icon' />
        </div>
      </NavLink>
    </div>
  );
};
export default Sidebar;
