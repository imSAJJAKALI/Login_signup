const mongoose= require('mongoose')


const connection = mongoose.connect('mongodb+srv://sajjak2506:sajjakali@cluster0.puywhdu.mongodb.net/mock6practice?retryWrites=true&w=majority')

module.exports = connection;
