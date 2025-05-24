import { useState, useEffect } from 'react';
import axios from 'axios';

interface DiaryEntry {
  id: string;
  date: string;
  weather: string;
  visibility: string;
}

const App = () => {
  const initFormData = {
    date: '',
    weather: '',
    visibility: '',
    comment: ''
  };
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [formData, setFormData] = useState(initFormData);

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then(response => {
      setEntries(response.data)
    })
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entryToAdd = {
      id: String(entries.length + 1),
      ...formData
    };

    axios.post<DiaryEntry>('http://localhost:3000/api/diaries', entryToAdd)
      .then(response => {
        setEntries(entries.concat(response.data));
        setFormData(initFormData);
      })
      .catch(error => {
        console.error('Error adding entry:', error);
      });
  };

  return (
    <div>
      <h2>Add a new entry</h2>
      <form onSubmit={entryCreation}>
        <div>
          <label>Date:</label>
          <input 
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Weather:</label>
          <input 
            type="text"
            name="weather"
            value={formData.weather}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Visibility:</label>
          <input 
            type="text"
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Comment:</label>
          <input 
            type="text"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>add</button>
      </form>
      <h2>Diary entries</h2>
      {entries.map(entry =>
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>Weather: {entry.weather}</p>
          <p>Visibility: {entry.visibility}</p>
        </div>
      )}
    </div>
  )
}

export default App;
