import axios from 'axios'

const baseUrl = process.env.REACT_APP_BACKEND_URL

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteRecord = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll,
  create,
  update,
  deleteRecord,
}