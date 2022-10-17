const getUsers = (req, res, next) => {
    if(Object.keys(req.query).length){
        const{
            userName,
            gender,
            age
        } = req.query

        const filter = [];

        if(userName)filter.push(userName);
        if(gender)filter.push(gender);
        if(age)filter.push(age);

        for(let i=0; i<filter.length; i++){
            console.log(`Searching for user(s) by: ${filter[i]}`)
        }
    }
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({
        success: true, msg: 'show all users'
    })
}

const postUser = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json({
        success: true, msg: `add user with the following fields:
        User Name: ${req.body.userName}
        Gender: ${req.body.gender}
        Age: ${req.body.age}`
    })
}

const deleteUsers = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({
        success: true, msg: 'delete all users'
    })
}

const getUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({
        success: true, msg: `show user id: ${req.params.userId}`
    })
}

const updateUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({
        success: true, msg: `update user id: ${req.params.userId} `
    })
}

const deleteUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({
        success: true, msg: `delete user id: ${req.params.userId}`
    })
}

module.exports = {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser
}


