import { FaList } from 'react-icons/fa';
import { MdGridView } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Statistics = () => {
  return (
    <div className='py-8 px-8 '>
      <div>
        <div className='flex justify-between'>
          <p className='font-semibold text-2xl text-cta'>Statistics</p>
          <p className='font-semibold text-xl text-cta'>May, 22</p>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex gap-8'>
            <div className='mt-4'>
              <p className='font-semibold text-[24px] text-cta'>1</p>
              <p className='font-light text-[16px] text-cta'>
                Registered users
              </p>
            </div>
            <div className='mt-4'>
              <p className='font-semibold text-[24px] text-cta'>1</p>
              <p className='font-light text-[16px] text-cta'>
                Pending payments
              </p>
            </div>
            <div className='mt-4'>
              <p className='font-semibold text-[24px] text-cta'>0</p>
              <p className='font-light text-[16px] text-cta'>Processed users</p>
            </div>
          </div>
          <div className='flex gap-5 items-center'>
            <FaList size={20} className='text-cta cursor-pointer ' />
            <MdGridView
              size={30}
              className='text-secondary cursor-pointer bg-cta p-1 rounded-sm'
            />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-10 mt-10 gap-4'>
        <div className='bg-[#fee4cb] col-span-3 rounded-3xl p-3 '>
          <div className='flex justify-between mt-2 items-center'>
            <p className='text-sm font-medium text-gray-600'>May 21,2023</p>
            <div>
              <BsThreeDotsVertical
                size={15}
                className='cursor-pointer hover:text-gray-600'
              />
            </div>
          </div>
          <div className='w-full flex flex-col justify-center items-center my-5'>
            <p className='font-semibold'>FnTax</p>
            <p className='text-sm font-medium text-gray-600'>User - test</p>
          </div>
          <div>
            <div>
              <div>
                <p className='text-sm font-semibold mb-2'>Progress</p>
              </div>
              <div>
                <span id='ProgressLabel' className='sr-only'>
                  Loading
                </span>
                <span
                  role='progressbar'
                  aria-labelledby='ProgressLabel'
                  aria-valuenow='75'
                  className='block rounded-full bg-gray-200'
                >
                  <span className='block h-1 rounded-full bg-[#fe952e] w-[25%]'></span>
                </span>
              </div>
              <div>
                <p className='text-sm font-semibold mt-2 mb-1  w-full flex justify-end'>
                  25%
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-[#e9e6fc] col-span-3 rounded-3xl p-3 '>
          <div className='flex justify-between mt-2 items-center'>
            <p className='text-sm font-medium text-gray-600'>Dec 10,2023</p>
            <div>
              <BsThreeDotsVertical
                size={15}
                className='cursor-pointer hover:text-gray-600'
              />
            </div>
          </div>
          <div className='w-full flex flex-col justify-center items-center my-5'>
            <p className='font-semibold text-[#5252f3] underline'>Invoices</p>
            <p className='text-sm font-medium text-gray-600'>nil</p>
          </div>
          <div>
            <div>
              <div>
                <p className='text-sm font-semibold mb-2'>Progress</p>
              </div>
              <div>
                <span id='ProgressLabel' className='sr-only'>
                  Loading
                </span>
                <span
                  role='progressbar'
                  aria-labelledby='ProgressLabel'
                  aria-valuenow='75'
                  className='block rounded-full bg-gray-200'
                >
                  <span className='block h-1 rounded-full bg-[#fe952e] w-[0%]'></span>
                </span>
              </div>
              <div>
                <p className='text-sm font-semibold mt-2 mb-1  w-full flex justify-end'>
                  0%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Statistics;
