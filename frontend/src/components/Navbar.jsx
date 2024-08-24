/* eslint-disable react/prop-types */
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaUserTie } from 'react-icons/fa';
import { RxDividerVertical } from 'react-icons/rx';
import { IoMdAddCircle } from 'react-icons/io';
import { BiMoon } from 'react-icons/bi';
import { HiSun } from 'react-icons/hi';

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <div className='h-[45px] w-full flex justify-between p-10'>
      <div className='flex gap-6 items-center'>
        <div>
          <RxHamburgerMenu size={30} className='text-cta' />
        </div>
        <div>
          <p className='font-bold text-xl text-cta'>FnMoney</p>
        </div>
      </div>
      <div className='flex items-center'>
        <div className='flex gap-2 items-center'>
          <div className='cursor-pointer' onClick={toggleTheme}>
            {theme === 'dark' ? (
              <HiSun size={30} className='text-cta hover:text-cta-hover' />
            ) : (
              <BiMoon size={30} className='text-cta hover:text-cta-hover' />
            )}
          </div>
          <div className='cursor-pointer'>
            <IoMdAddCircle
              size={35}
              className='text-cta hover:text-cta-hover'
            />
          </div>
        </div>
        <div>
          <RxDividerVertical size={40} className='text-gray-300 text-cta ' />
        </div>
        <div className='flex gap-2 items-center'>
          <div className='cursor-pointer'>
            <FaUserTie size={30} className='text-cta hover:text-cta-hover' />
          </div>
          <div>
            <p className='font-semibold text-md cursor-pointer text-cta'>
              Admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
