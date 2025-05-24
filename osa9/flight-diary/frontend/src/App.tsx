import { useState, useEffect } from 'react';

import { getAllEntries, createNewEntry } from './services/diaryService';

import type { 
  DiaryEntry,
  NewDiaryEntry,
  Weather,
  Visibility
} from './types';

const App = () => {
  const initFormData: NewDiaryEntry = {
    date: '',
    weather: 'sunny',
    visibility: 'great',
    comment: ''
  };
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [formData, setFormData] = useState<NewDiaryEntry>(initFormData);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data);
    })
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createNewEntry(formData).then(data => {
      setEntries(entries.concat(data));
      setFormData(initFormData);
      setErrorMessage('');
    }).catch(error => {
      console.error('Error adding entry:', error);
      setErrorMessage(error.response.data);
    });
  };

  return (
    <div>
      <h2>Add a new entry</h2>
      <div id="error-message" style={{ color: 'red' }}>
        <p>{errorMessage}</p>
      </div>
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
          {(['sunny', 'rainy', 'cloudy', 'stormy', 'windy'] as Weather[]).map(option => (
            <label key={option}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={formData.weather === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          <label>Visibility:</label>
          {(['great', 'good', 'ok', 'poor'] as Visibility[]).map(option => (
            <label key={option}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={formData.visibility === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
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
          {entry.comment && <p>Comment: {entry.comment}</p>}
        </div>
      )}
    </div>
  )
}

export default App;
