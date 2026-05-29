import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS_BY_GENRE, FAVORITE_GENRE } from '../queries'

const Favorites = (props) => {
  const favorite = useQuery(FAVORITE_GENRE, {
    fetchPolicy: 'cache-and-network',
  }).data?.me.favoriteGenre

  const books = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: favorite },
    fetchPolicy: 'cache-and-network',
    skip: !favorite,
  }).data?.allBooks

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favorite}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books?.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Favorites
