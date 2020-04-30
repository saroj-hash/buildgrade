const dbLayer = require("../model/test")
const validator = require("../utilities/validator")
let service = {}
service.insertEmails = (emailObj) => {
    validator.validateEmail(emailObj.Email)
    return dbLayer.insertEmails(emailObj).then(response => {
        console.log("service ->",response)
        if(response === true){
            return response
        }
        else if (response === false){
            let err = new Error("Some error occured!")
            err.status = 401
            throw err
        }
        else{
            let err = new Error("Sorry mate! You have already used this Email Id!")
            err.status = 501
            throw err
        }
    })
}

service.getAllSubscribers = () => {
    return dbLayer.getAllSubscribers().then(emailString => {
        if(emailString.length !== 0){
            return emailString
        }
        else{
            let err = new Error("Some error occured while getting the subscriber list")
            err.status = 501
            throw err
        }
    })
}

service.createPost = (postObj) => {
    return dbLayer.createPost(postObj).then(response => {
        if(response){
            return response
        }
        else{
            let err = new Error("Some error occured")
            err.status = 501
            throw err
        }
    })
}

service.createComment = (commentObj,postId) => {
    return dbLayer.createComment(commentObj,postId).then(response => {
        if(response){
            return response
        }
        else{
            let error = new Error("Some error occured while posting your comment")
            error.status = 501
            throw error
        }
    })
}

service.createReply = (replyObj,commentId) => {
    return dbLayer.createReply(replyObj,commentId).then(data => {
        if(data)
            return data
        else{
            let error = new Error("Some error occured while posting your reply")
            error.status = 501
            throw error
        }
    })
}

service.getPostIds = () => {
    return dbLayer.getPostIds().then(data => {
        if(data && data.length!==0){
            return data
        }
        else{
            let error = new Error("Some error occured while getting the PostIds")
            error.status = 501
            throw error
        }
    })
}
service.getComments = (postId) => {
    return dbLayer.getComments(postId).then(data => {
        if(data && data.length!==0){
            return data
        }
        else{
            let error = new Error(`Some error occured while getting the comments for postId -> ${postId}`)
            error.status = 501
            throw error
        }
    })
}

service.getReplies = (commentId) => {
    return dbLayer.getReplies(commentId).then(data => {
        if(data && data.length!==0){
            return data
        }
        else{
            let error = new Error(`Some error occured while getting the replies for commentId -> ${commentId}`)
            error.status = 501
            throw error
        }
    })
}

service.deleteComment = (postId,commentId) => {
    return dbLayer.deleteComment(postId,commentId).then(data => {
        if(data){
            return data
        }
        else{
            let err = new Error(`Some error occured while deleting comment -> ${data}`)
            err.status = 501
            throw err
        }
    })
}

service.deleteReply = (commentId,replyId) => {
    return dbLayer.deleteReply(commentId,replyId).then(data => {
        if(data){
            return data
        }
        else{
            let err = new Error(`Some error occured while deleting reply -> ${data}`)
            err.status = 501
            throw err
        }
    })
}

service.increasePostLikes = (PostId) =>{
    return dbLayer.increasePostLikes(PostId).then(response => {
        if(response){
            return true
        }
        else{
            let err = new Error(`Some error occured while increasing likes for post -> ${PostId}`)
            err.status = 501
            throw err
        }
    })
}

service.decreasePostLikes = (PostId) =>{
    return dbLayer.decreasePostLikes(PostId).then(response => {
        if(response){
            return true
        }
        else{
            let err = new Error(`Some error occured while decreasing likes for post -> ${PostId}`)
            err.status = 501
            throw err
        }
    })
}


service.getPostLikes = (PostId) => {
    return dbLayer.getPostLikes(PostId).then(data => {
        if(data){
            return data
        }
        else{
            let err = new Error(`Some error occured while getting likes for Post -> ${PostId}`)
            err.status = 501
            throw err
        }
    })
}

service.postMessage = (messageObj) =>{
    validator.validateEmail(messageObj.Email)
    return dbLayer.postMessage(messageObj).then(data => {
        if(data && data.length!==0){
            return data
        }
        else{
            let err = new Error(`Some error occured while posting the message for ${messageObj.Name} with Email ${messageObj.Email}`)
            err.status = 501
            throw err
        }
    })
}

service.getAllMessages = () => {
    return dbLayer.getAllMessages().then(data => {
        if(data && data.length!==0){
            return data
        }
        else{
            let err = new Error("Could not retrieve the messages")
            err.status = 501
            throw err
        }
    })
}


module.exports = service