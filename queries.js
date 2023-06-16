const arrObjs = 
[{
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

const predicatehandler = function(element){
    return element.age === 30;
}

const result = arrObjs.filter(predicatehandler);
// console.log(result);  <--- gives the result from the filter function

const strarr = arrObjs.map(function(element){
    return current.age
})
.reduce(function(acc, element){
    return acc + element;
}, 0); //<--- gives the sum of the ages from map-npnpmreduce function

// const sum = arrObjs.reduce(function(acc, element){
//     return acc + element.age;
// }+0);  <--- gives the sum of the ages direcectly from the reduce function
