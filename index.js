const http = require("http");

// Here we are creating an array of users
const users = [
  {
    name: "John",
    age: 30,
  },
  {
    name: "Judicator",
    age: 35,
  },
  {
    name: "Table",
    age: 300,
  },
];

// Here we are creating a server using createServer method
const server = http.createServer(function (request, response) {
  // Here we are parsing the url and getting the paths using split method ("/")
  const paths = request.url.split("/");

  console.log("---methods---", request.method);

  // This block of code is for the request(GET) method for all users and the second element of the paths is users and the length of the paths is 3
  if (request.method === "GET" && paths[1] === "users" && paths.length === 2) {
    response.write(JSON.stringify(users));

    // This block of code is for the request(GET) method for one user and the second element of the paths is users and the length of the paths is 3
  } else if (request.method === "GET" && paths[1] === "users" && paths[2]) {
    // Here we are getting the index of the user from the paths
    const idx = paths[2];

    // Here we are checking the user is present or not
    const user = users[idx];

    // Here we are sending the response if user is present
    if (user) {
      response.write(JSON.stringify(user));

      // Here we are sending the response if user is not present
    } else {
      response.write("User Not Found");
    }
  }

  // This block is executed when the HTTP request method is "POST" and the second element in the paths array is "users".
  else if (request.method === "POST" && paths[1] === "users") {

    // Here we are creating a variable data and assigning it to an empty string
    let data = "";

    // Here we are listening to the 'request' event (event listener) whenever we get the data from the request, this data is in the form of chunks
    request.on("data", function (chunks) {

      // Here we are appending/concatenate/stitching the chunks of data to the data variable
      data += chunks;
    });

    // Here we are listening to the 'end' event (event listener), when all the data is received from the request, this event is triggered and the function inside the event is executed
    request.on("end", function () {

      // In this function we are parsing the data to JSON format and then pushing it to the users array
      const obj = JSON.parse(data.toString());
      users.push(obj);
    });

    // A successful response is sent back to the client with the setcode
    response.statusCode = 201;
    response.write("User Created");
  } 

  
  // This block is executed when the HTTP request method is "PUT" and the second element in the paths array is "users".
  else if (request.method === "PUT" && paths[1] === "users" && paths[2]) {

    // console.log("in put"); <-- To check

    // 2nd on path is user idx
    const idx = paths[2];

    // empty string
    let data = "";
    // console.log(users[idx]);

    // checking if use ris at the specified index anf if he exists then the function inside will listen for data chunks and stitch them togather ad append in empty string created above
    if (users[idx]) {
      request.on("data", function (chunks) {
        data += chunks;
      });

      request.on("end", function () {
        const obj = JSON.parse(data.toString());

        // Updating the object properties using spread opreator(...users[idx], ...obj)
        users[idx].name = {
          ...users[idx],
          ...obj,
        };
      });
      // A succes response
      response.statusCode = 200;
      response.write("User data updated.");
      response.end();
    }
    
    // If the user is not found
    else {
      response.write("User Not Found to update");
    }
  } 
  
  // 
  else if (request.method === "DELETE" && paths[1] === "users" && paths[2])
  {

    // Paths and user
    const idx = paths[2];
    const user = users[idx];

    // Removes one element in specified index
    if (user) {
      users.splice(idx, 1);
    }

    // Succes response
    response.statusCode = 200;
    response.write("User data Deleted");
  } else {
    response.write("Not Found");
  }

  response.end();
});

server.listen(3000, function () {
  console.log("Server is running on port 3000");
});
