import { useState } from 'react'
import { useQuery } from '@apollo/client/react'

import { ALL_BOOKS_BY_GENRE, ALL_GENRES } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const booksResult = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre },
  })
  const genresResult = useQuery(ALL_GENRES)

  if (!props.show) {
    return null
  }

  const filteredBooks = booksResult.data?.allBooks
  const allBooks = genresResult.data?.allBooks
  const allGenres = [...new Set(allBooks?.flatMap((b) => b.genres))]
  const genres = ['', ...allGenres]

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre <strong>{genre}</strong></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks?.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g || 'all genres'}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
