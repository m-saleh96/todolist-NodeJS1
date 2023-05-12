const fs = require('fs')
const filePath = process.env.FILE_PATH || "./db.json"

function checkFS(path) {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path,JSON.stringify([]))
    }
}
checkFS(filePath)


function add(parsedData) {
    const todoList = JSON.parse(fs.readFileSync(filePath , 'utf-8'))
    const lastID = ((todoList[(todoList.length)-1]).id)+1
    const todo = {
        id:lastID,
        title : parsedData.title,
        body : parsedData.body,
        checked: false
    }
    todoList.push(todo)
    fs.writeFileSync(filePath,JSON.stringify(todoList))
}

function edit(parsedData) {
    const todoList = JSON.parse(fs.readFileSync(filePath , 'utf-8'))
    todoList.map((elem)=>{
        if (elem.id == parsedData.id) {
            elem.title = parsedData.title
            elem.body = parsedData.body
        }
    })
    fs.writeFileSync(filePath,JSON.stringify(todoList))

}

function remove(parsedData) {
    let todoList = JSON.parse(fs.readFileSync(filePath , 'utf-8'))
    todoList = todoList.filter((elem)=>{
        return (elem.id != parsedData.id)
    } )
    console.log(todoList)
    fs.writeFileSync(filePath,JSON.stringify(todoList))
}



function list(parsedData) {
    let todoList = JSON.parse(fs.readFileSync(filePath , 'utf-8'))
    let key = parsedData.type
    switch (key) {
        case "all":
            break;
        case "checked":
            todoList = todoList.filter((elem)=>elem.checked)
            break;
        case "unchecked":
            todoList = todoList.filter((elem)=>!(elem.checked))
            break;
        default:
            break;
    }
    console.log(todoList)
}


function check(parsedData) {
    const todoList = JSON.parse(fs.readFileSync(filePath , 'utf-8'))
    todoList.map((elem)=>{
        if (elem.id == parsedData.id) {
            elem.checked = true
        }
    })
    fs.writeFileSync(filePath,JSON.stringify(todoList)) 
}

function uncheck(parsedData) {
    const todoList = JSON.parse(fs.readFileSync(filePath , 'utf-8'))
    todoList.map((elem)=>{
        if (elem.id == parsedData.id) {
            elem.checked = false
        }
    })
    fs.writeFileSync(filePath,JSON.stringify(todoList))  
}


function parseData(data) {
    const parsedData = data.reduce((prev , elem , index) => {
        const [key,value] = elem.split("=")
        prev[key] = value
        return prev
    } , {})
    return parsedData
}


function parseData(data) {
    const parsedData = data.reduce((prev , elem , index) => {
        const [key,value] = elem.split("=")
        prev[key] = value
        return prev
    } , {})
    return parsedData
}
module.exports = {add , edit , remove , list , check , uncheck, parseData}

