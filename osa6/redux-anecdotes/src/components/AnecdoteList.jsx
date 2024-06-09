import { useDispatch, useSelector } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const anecdotes = state.anecdotes
    const filter = state.filter

    if ( filter === 'ALL' ) {
      return anecdotes
    }

    return anecdotes.filter(a => a
      .content
      .toLowerCase()
      .includes(filter.toLowerCase()))
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes > a.votes ? 1 : -1)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList
