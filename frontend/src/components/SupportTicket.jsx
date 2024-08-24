import { FaRegStar } from 'react-icons/fa';

const SupportTicket = () => {
  const tickets = [
    {
      id: 1,
      pic: '/stef.avif',
      name: 'Stephanie',
      comment:
        'I got your first assignment. It was quite good. 🥳 We can continue with the next assignment.',
      date: 'Dec, 12',
    },
    {
      id: 2,
      pic: '/mark.avif',
      name: 'Mark',
      comment:
        'Hey, can tell me about progress of project? I m waiting for your response.',
      date: 'Dec, 12',
    },
    {
      id: 3,
      pic: '/david.avif',
      name: 'David',
      comment:
        'Awesome! 🤩 I like it. We can schedule a meeting for the next one.',
      date: 'Dec, 12',
    },
    {
      id: 4,
      pic: '/jess.avif',
      name: 'Jessica',
      comment:
        'I am really impressed! Cant wait to see the final result.',
      date: 'Dec, 12',
    },
  ];

  return (
    <div>
      <p className='font-semibold text-[23px] mt-2 text-cta p-5'>
        Support Ticket
      </p>
      {tickets.map((ticket) => (
        <div key={ticket.id}>
          <span className='flex items-center'>
            <span className='h-[1px] mt-2 flex-1 bg-gray-200'></span>
            <span className='h-[1px] mt-2 flex-1 bg-gray-200'></span>
          </span>
          <div className='flex p-3 my-2'>
            <div>
              <img
                src={ticket.pic}
                alt={ticket.name}
                className='rounded-full w-12 h-12 object-cover'
              />
            </div>
            <div className='px-3 w-[80%]'>
              <p className='font-semibold text-[16px] text-cta'>
                {ticket.name}
              </p>
              <p className='text-[11px] text-cta'>{ticket.comment}</p>
            </div>
            <div>
              <FaRegStar size={20} className='text-cta cursor-pointer' />
            </div>
          </div>
          <p className='text-[13px] flex justify-end font-medium text-cta mb-2 mr-4'>
            {ticket.date}
          </p>
        </div>
      ))}
      <span className='flex items-center'>
        <span className='h-[1px] mt-2 flex-1 bg-gray-200'></span>
        <span className='h-[1px] mt-2 flex-1 bg-gray-200'></span>
      </span>
    </div>
  );
};

export default SupportTicket;
