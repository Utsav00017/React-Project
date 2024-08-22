import React, { useState } from 'react';
import axios from 'axios';

const Image = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (event) => {
    debugger
    event.preventDefault();
    const formData = new FormData();
    formData.append('fname', fname);
    formData.append('lname', lname);
    formData.append('photo', photo);

    try {
      const res = await axios.post('http://localhost:1000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response:', res.data);
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input 
          type="text" 
          value={fname} 
          onChange={(e) => setFname(e.target.value)} 
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input 
          type="text" 
          value={lname} 
          onChange={(e) => setLname(e.target.value)} 
        />
      </div>
      <div>
        <label>Photo:</label>
        <input 
          type="file" 
          onChange={(e) => setPhoto(e.target.files[0])} 
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Image;
