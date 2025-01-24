const mongoose = require('mongoose')

const clubsSchema = new Schema({
    President:String,
    VicePresident:String,
    CoreMembers:Object,
    Description:String,
    Images:String
})

const club = mongoose.model("club", clubsSchema)