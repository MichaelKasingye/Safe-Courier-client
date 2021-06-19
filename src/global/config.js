export const config = {
    headers:{
      Authorization: localStorage.getItem('token')
      // Authorization: localStorage.getItem('token')

    }
}

export const baseUrl = "http://localhost:4000";
