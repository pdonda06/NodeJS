const fs = require('fs');

// fs.writeFileSync("./test.txt", "Hello there");

// fs.writeFile("test.txt", "Hello with asyns" , (err) =>{})

// sync return with any object while async not returning object


// Blocking
const result = fs.readFileSync("./test.txt", "utf8");
console.log(result);

// Non-Blocking
fs.readFile("./test.txt", "utf8", (err, result) => {
    if(err) {
        console.log("Error reading file", err);
    } else {
        console.log(result);
    }
})

fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());

// fs.appendFileSync("./test.txt", " This is appended text");

// req -> event queue -> queue pool -> blocking direct result 
// req -> event queue -> queue pool -> non-blocking -> thread pool -> thread(worker)