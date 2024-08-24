import { useEffect, useState } from 'react';
import FileUploadModal from './FileUploadModal';
import Loader from './Loader';

const ChatBot = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [loadingInitiated, setLoadingInitiated] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    script.async = true;

    script.onload = () => {
      setIsLoading(true);
      window.botpressWebChat.init({
        composerPlaceholder: 'Chat with bot',
        botConversationDescription:
          'A virtual assistant developed for Fnmoney company.',
        botName: 'Margaret',
        botId: 'a85f84eb-3b71-4a4e-8c53-b5a304e38c2b',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v0',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: 'a85f84eb-3b71-4a4e-8c53-b5a304e38c2b',
        enableConversationDeletion: true,
        containerWidth: '55%25',
        layoutWidth: '100%25',
        avatarUrl: 'https://i.postimg.cc/W42mz39B/36.png',
        hideWidget: true,
        showCloseButton: true,
        disableAnimations: true,
        closeOnEscape: false,
        showConversationsButton: false,
        enableTranscriptDownload: true,
        stylesheet:
          'https://webchat-styler-css.botpress.app/prod/code/798f0e31-8ddb-4e32-835b-ef1d0f55594b/v54197/style.css',
      });

      window.botpressWebChat.onEvent(
        (event) => {
          if (event.type === 'LIFECYCLE.READY') {
            console.log('Botpress loaded');
            setIsLoading(false);
          } else if (
            event.type === 'TRIGGER' &&
            event.value &&
            event.value.action === 'FileUpload'
          ) {
            setShowModal(true);
            console.log('Triggered file upload');
          }
        },
        ['LIFECYCLE.READY', 'TRIGGER']
      );
    };

    setIsLoading(true);
    document.body.appendChild(script);
  }, []);

  const handleClick = () => {
    if (!loadingInitiated) {
      setIsLoading(true);
      setLoadingInitiated(true);
    }
    setButtonClicked(true);
    window.botpressWebChat.sendEvent({ type: 'toggle' });
    console.log('Clicked');
  };

  const handleUploadFailure = () => {
    setIsLoading(false); // Close the loading modal
    setButtonClicked(false); // Reset buttonClicked state
  };

  return (
    <>
      <div id='webchat' />
      {buttonClicked && isLoading && <Loader />}
      <div>
        <button
          onClick={handleClick}
          className='bg-black w-[170px] h-10 rounded text-white flex justify-center items-center '
        >
          Upload Document
        </button>
      </div>
      {showModal && <FileUploadModal onClose={() => setShowModal(false) } onUploadFailure={handleUploadFailure} />}
    </>
  );
};

export default ChatBot;
