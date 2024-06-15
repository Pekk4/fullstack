import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateVotes(state, action) {
      const changedAnecdote = action.payload

      return state.map(anecdote => 
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()

    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)

    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.updateAnecdote({
      ...anecdote,
      votes: anecdote.votes + 1
    })

    dispatch(updateVotes(newAnecdote))
  }
}

export const {
  updateVotes,
  appendAnecdote,
  setAnecdotes,
} = anecdoteSlice.actions;

export default anecdoteSlice.reducer
