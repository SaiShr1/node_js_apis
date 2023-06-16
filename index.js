const http = require('http')

const Users = [
    {
        name: "John",
        age: 30
    },
    {
        name: "Judicator",
        age: 35
    },
    {
        name: "Table",
        age: 300
    }
]

const server = http.createServer(function (request, response) {

    const paths = request.url.split('/')

    console.log("---methods---", request.method)

    if(request.method === "GET" && paths[1] === "users" && paths.length === 2) {
        response.write(JSON.stringify(Users))
    } 
    else if(request.method === "GET" && paths[1] === "users" && paths[2]) {
        const idx = paths[2]
        const user = Users[idx]
        if(user){
            response.write(JSON.stringify(user))
        } else {
            response.write("User Not Found")
        }
    }

    else if (request.method === "POST" && paths[1] === "users") {
        let data = ""

        request.on("data", function (chunks) {
            data += chunks
        })

        request.on("end", function () {
            const obj = JSON.parse(data.toString())
            Users.push(obj)
        
        })

        response.statusCode = 201
        response.write("User Created")
    }

    

    

    else {
        response.write("Not Found")
    }

    response.end()
})

server.listen(3000, function(){
    console.log('Server is running on port 3000')
})