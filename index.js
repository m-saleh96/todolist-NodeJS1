const fun = require('./fun')

// node index.js add title=title1 body=body1
// node index.js edit id=1 title=title1 body=body1
// node index.js remove id=1 
// node index.js list type=all/checked/unchecked
// node index.js check id=4
// node index.js uncheck id=4
// [
//      {id:1 , title : "title1" , body : "body1" , checked : true},
// ]


function main(argv) {
    const [ , ,operation , ...data] = argv
    const parsedData = fun.parseData(data)

    console.log(parsedData) 

    switch (operation) {
        case "add":
            fun.add(parsedData)
            break;
        case "edit":
            fun.edit(parsedData)
            break;
        case "remove":
            fun.remove(parsedData)
            break;
        case "list":
            fun.list(parsedData)
            break;
        case "check":
            fun.check(parsedData)
            break;
        case "uncheck":
            fun.uncheck(parsedData)
            break;
        default:
            break;
    }
}

main(process.argv)