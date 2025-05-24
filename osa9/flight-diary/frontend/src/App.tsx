import { useState, useEffect } from 'react';
import axios from 'axios';

interface DiaryEntry {
  id: string;
  date: string;
  weather: string;
  visibility: string;
}

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then(response => {
      setEntries(response.data)
    })
  }, [])

  return (
    <div>
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
