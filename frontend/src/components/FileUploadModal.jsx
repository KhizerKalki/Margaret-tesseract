/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';


const FileUploadModal = ({ onClose,onUploadFailure  }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [result, setResult] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');

  const handleFailure = () => {
    document.getElementById('popup').innerHTML = '<h2>Upload Failed!</h2>'
    setTimeout(() => {
      onUploadFailure(); 
      onClose(); 
    }, 3000);
  };

  const handleFileChange = event => {
    setSelectedFile(event.target.files[0]);
    setResult(null);
    setError('');
  };

  const uploadFile = async () => {
    const formData = new FormData();
    const fieldName = selectedFile.type === 'application/pdf' ? 'pdfFile' : 'image';
    const endpoint = selectedFile.type === 'application/pdf' ? 'uploadPDF' : 'uploadImage';


    formData.append(fieldName, selectedFile);

    try {
      const response = await axios.post(`http://localhost:5000/${endpoint}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
      console.log(response.data);
      setError(''); 
      window.botpressWebChat.sendPayload({
        type: 'trigger',
        payload: {
          action: 'file_successfully_loaded',
          text: response.data
        }
      });
      onClose();
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to upload and process the file. Please try again.');
      setResult(null); 
      handleFailure();
      window.botpressWebChat.sendPayload({
        type: 'trigger',
        payload: {
          action: 'file_upload_failed',
        }
      });
    }
  };

  const handleSubmit = () => {
    document.getElementById('popup').innerHTML = '<h2>Analyzing your document...</h2>'
    if (!selectedFile) {
      window.botpressWebChat.sendPayload({
        type: 'text',
        text: 'Please select a file!'
      });
      return;
    }
    uploadFile();
  };

  const handleClose = () => {
    
    window.botpressWebChat.sendPayload({
      type: 'trigger',
      payload: {
        action: 'file_upload_closed',
      }
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      width: '400px', zIndex: 1000,
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <div className="popup" id='popup'>
        <h2 className='upload-heading'>UPLOAD FILE</h2>
        <hr />
        <br />
        <input type="file" onChange={handleFileChange} />
        <div className="btn-container">
          <div className='btn' onClick={handleSubmit} style={{ marginTop: '10px' }}>Upload</div>
          <div className='btn' onClick={handleClose} style={{ marginTop: '10px' }}>Close</div>
        </div>
        

      </div>
     
    </div>
  );
};

export default FileUploadModal;
