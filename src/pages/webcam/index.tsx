import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import styles from './WebcamCapture.module.css';

const WebcamCapture = () => {
  const webcamRef = useRef<Webcam>(null);
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [apiResponse, setApiResponse] = useState<string>(''); // API 응답을 보여줄 상태 추가

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const blob = dataURItoBlob(imageSrc);
        const file = new File([blob], 'captured_image.jpg', { type: 'image/jpeg' });
        setImageFile(file);
      }
    }
  }, [webcamRef]);

  const addFace = async () => {
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append('request', imageFile);

        const queryString = new URLSearchParams({ name }).toString();
        const url = `http://127.0.0.1:8000/face-ai/add_face?${queryString}`;

        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setApiResponse(data.message); // API 응답을 상태에 저장
      } catch (error) {
        console.error('Error sending image to API:', error);
      }
    }
  };

  const recognizeFace = async () => {
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append('request', imageFile);
        const url = `http://127.0.0.1:8000/face-ai/recognize_face`;

        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        const result = data.recognized_faces.map((face:any) => `${face.name}: ${face.similarity_percent}%`).join(", ");
        setApiResponse(result); // API 응답을 상태에 저장
      } catch (error) {
        console.error('Error sending image to API:', error);
      }
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const dataURItoBlob = (dataURI: string): Blob => {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: 'image/jpeg' });
  };

  return (
    <div className={styles.container}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
      />
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        className={styles.textInput}
      />
      <button onClick={capture} className={styles.captureButton}>Capture</button>
      {imageFile && (
        <div className={styles.imageContainer}>
          <img src={URL.createObjectURL(imageFile)} alt="Captured" className={styles.capturedImage} />
          <button onClick={addFace} className={styles.sendButton}>Send to API</button>
          <button onClick={recognizeFace} className={styles.sendButton}>얼굴 확인</button>
        </div>
      )}
      {apiResponse && (
        <div className={styles.apiResponse}>
          <p>API response: {apiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
