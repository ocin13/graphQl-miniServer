const URL = "http://localhost:5000/graphql"
const QUERY = {
    query: "{books{name author{ name }}}"
}

const params = {
    headers:{
        "content-type": "application/json; charset=UTF-8"
    },
    body:QUERY,
    method: "POST"
}

fetch(URL, params)
.then(data=> {return data.json()})
.then(res => console.log(res))
.catch(error => console.log(error))