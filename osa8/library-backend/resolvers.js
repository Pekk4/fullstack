const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql/error')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')


const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = {}

      if (args.author) {
        const author = await Author.findOne({ name: args.author })

        if (author) {
          query.author = author._id
        }
      }
      if (args.genre) {
        query.genres = args.genre
      }

      return Book.find(query).populate('author')
    },
    allAuthors: async (root, args) => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      return Book.collection.countDocuments({ author: root._id })
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })

        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError(`Adding author failed: ${error.message}`, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            }
          })
        }
      }

      const book = new Book({ ...args, author: author._id })

      try {
        await book.save()

        return book.populate('author')
      } catch (error) {
        throw new GraphQLError(`Adding book failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error,
          }
        })
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      author.born = args.setBornTo

      try {
        await author.save()

        return author
      } catch (error) {
        throw new GraphQLError(`Editing author failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error,
          }
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new GraphQLError(`Creating the user failed: ${error.message}`, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error,
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Invalid credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    _resetDatabase: async () => {
      if (process.env.NODE_ENV !== 'test') {
        throw new GraphQLError('_resetDatabase is only available in test mode')
      }
      await Author.deleteMany({})
      await Book.deleteMany({})
      await User.deleteMany({})
      return true
    },
  }
}

module.exports = resolvers
