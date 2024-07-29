import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/Thitiwut5023/SE331-LAB02-DB',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getEvents(perPage: Number, page: Number) {
        return apiClient.get('/events?_iimit=' + perPage + '&_page' + page)
    },
    getEvent(id: number) {
      return apiClient.get('/events/' + id)
    }
}