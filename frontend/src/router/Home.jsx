import Statistics from '../components/Statistics';
import SupportTicket from '../components/SupportTicket';

const Home = () => {
  return (
    <div className='flex gap-5 w-full'>
      <div className='bg-secondary h-full rounded-3xl w-[67%]'>
        <Statistics />
      </div>
      <div className='bg-secondary h-full rounded-3xl w-[30%]'>
        <SupportTicket />
      </div>
    </div>
  );
};
export default Home;
