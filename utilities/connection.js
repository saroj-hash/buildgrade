const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema
mongoose.set("useCreateIndex",true)
let postSchema = {
    "PostId" : {
        type:Number,
        required:true,
        unique:true
    }
}
let commentSchema = {
    "PostId":{
        type:Number,
        required:true,
        unique:true
    },
    "Comments" : {
        type : [{
            "CommentId" : {
                type:Number,
                required:true,
                unique:true
            },
            "Name"  : {
                type : String,
                required : true
            },
            "Comment" : {
                type : String,
                required : true
            }
        }]
    }
}
let replySchema = {
    "CommentId" : {
        type:Number,
        unique:true,
        required:true
    },
    "Replies" : {
        type : [{
            "ReplyId" : {
                type:Number,
                unique:true,
                required:true
            },
            "Name"  : {
                type : String,
                required : true
            },
            "Reply" : {
                type : String,
                required : true
            }
        }],
        default : []
    }
}
let subscribeSchema = {
    "Email" : {
        type : String,
        required : true,
        unique : true
    }
}

let postLikeSchema = {
    "PostId" : {
        type:Number,
        required:true,
        unique:true
    },
    "NoOfLikes" : {
        type:Number,
        required:true
    }
}

let contactSchema = {
    "Name" : {
        type : String,
        required : true
    },
    "Email" : {
        type : String,
        required : true
    },
    "Message" : {
        type : String,
        required : true
    }
}

let PostSchema = new Schema(postSchema, { collection : "Posts", timestamps : true})
let CommentSchema = new Schema(commentSchema, { collection : "Comments", timestamps : true})
let ReplySchema = new Schema(replySchema, { collection : "Replies", timestamps : true})
let SubscribeSchema = new Schema(subscribeSchema, { collection : "Subcscribers", timestamps : true})
let PostLikeSchema  = new Schema(postLikeSchema, { collection : "PostLikes", timestamps : true})
let ContactSchema = new Schema(contactSchema, { collection : "ContactDB", timestamps : true})

let connection = {}

connection.getPostCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/WJDB",{ useNewUrlParser: true }).then((db) => {
        console.log("Connected to post DB")
        return db.model("Posts",PostSchema)
    }).catch(err => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

connection.getCommentCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/WJDB",{ useNewUrlParser: true }).then((db) => {
        console.log("Connected to comment DB")
        return db.model("Comments",CommentSchema)
    }).catch(err => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

connection.getReplyCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/WJDB",{ useNewUrlParser: true }).then((db) => {
        console.log("Connected to reply DB")
        return db.model("Replies",ReplySchema)
    }).catch(err => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

connection.getSubscriberCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/WJDB",{ useNewUrlParser: true }).then((db) => {
        console.log("Connected to  Subscriber DB")
        return db.model("Subcscribers",SubscribeSchema)
    }).catch(err => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

connection.getPostLikesCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/WJDB",{ useNewUrlParser: true }).then((db) => {
        console.log("Connected to  PostLikes DB")
        return db.model("PostLikes",PostLikeSchema)
    }).catch(err => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

connection.getContactCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/WJDB",{ useNewUrlParser: true }).then((db) => {
        console.log("Connected to  Contact DB")
        return db.model("ContactDB",ContactSchema)
    }).catch(err => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}



module.exports = connection