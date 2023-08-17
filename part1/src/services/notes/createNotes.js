import axios from 'axios'

export const createNotes = ({title, body, userId}) => {
    axios
    .post('https://jsonplaceholder.typicode.com/posts', {title, body, userId})
    .then(response => {
      const {data} = response;
      return data;
    })
}