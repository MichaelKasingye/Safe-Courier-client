export const config = {
    headers:{
      Authorization: localStorage.getItem('token')

    }
}

export const baseUrl = "https://safecourier.herokuapp.com";
