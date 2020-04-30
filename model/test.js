const connection = require("../utilities/connection")

let model = {}

model.createPost = (postObj) => {
    return connection.getPostCollection().then(postCollection => {
        return postCollection.create(postObj).then(data => {
            if(data && data.length!==0){
                return connection.getCommentCollection().then(commentCollection => {
                    let commentObj = {PostId : postObj.PostId , Comments : [] }
                    return commentCollection.create(commentObj).then(response => {
                        if(response && response.length!==0){
                            let postLikeObj = {PostId : postObj.PostId, NoOfLikes : 0}
                            return connection.getPostLikesCollection(postLikeObj).then(likeCollection => {
                                return likeCollection.create(postLikeObj).then(likeResponse => {
                                    if(likeResponse && likeResponse.length!==0){
                                        return true
                                    }
                                    else return false
                                })
                            })
                        }
                        else return false
                    })
                })
            }
            else{
                return false
            }
        })
    })
}

model.createComment = (commentObj, postId) => {
    const now = new Date()
    let commentId = now % 10000;
    commentObj.CommentId = commentId
    
        return connection.getCommentCollection().then(commentCollection => {
            return commentCollection.updateOne({ "PostId": postId }, { $push: { "Comments": commentObj } }).then(response => {
                if (response.nModified > 0) {
                    return connection.getReplyCollection().then(replyCollection => {
                        let replyObj = { CommentId: commentId, Replies: [] }
                        return replyCollection.create(replyObj).then(rData => {
                            if (rData && rData.length !== 0) {
                                return true
                            }
                            else {
                                return false
                            }
                        })
                    })
                }
                else {
                    return "error"
                }
            })
        })
    }


model.insertEmails = (emailObj) => {
    return connection.getSubscriberCollection().then(collection => {
        return collection.find({}, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }).then(data => {
            console.log("data at model after finding ->", data)
            let arr = []
            for (x of data) {
                arr.push(x.Email)
            }
            console.log("array ->", arr)
            if (arr.indexOf(emailObj.Email) === -1) {
                return collection.create(emailObj).then(response => {
                    console.log("response in model ->", response)
                    if (response)
                        return true
                    else return false
                })
            }
            else {
                return "dupVal"
            }
        })
    })
}


model.getAllSubscribers = () => {
    return connection.getSubscriberCollection().then(collection => {
        return collection.find({}, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }).then(data => {
            let arr = []
            for (let x of data) {
                arr.push(x.Email)
            }
            let emailString = ""
            for(let x of data){
                emailString+=x.Email
                emailString+=" "
            }
            emailString = String(emailString)
            if(emailString.length!== 0){
                return emailString
            }
            else return null
        })
    })
}



model.createReply = (replyObj, commentId) => {
    const now = new Date()
    let replyId = now % 10000;
    replyObj.ReplyId = replyId
    return connection.getReplyCollection().then(collection => {
        return collection.updateOne({ "CommentId": commentId }, { $push: { "Replies": replyObj } }).then(response => {
            if (response.nModified > 0) {
                return true
            }
            else return false
        })
    })
}

model.getPostIds = () => {
    return connection.getPostCollection().then(collection => {
        return collection.find({}, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }).then(data => {
            if (data && data.length !== 0) {
                let arr = []
                for (x of data) {
                    arr.push(x.PostId)
                }
                return arr
            }
            else return null
        })
    })
}

model.getComments = (postId) => {
    return connection.getCommentCollection().then(collection => {
        return collection.find({ "PostId": postId }, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0, PostId: 0 }).then(data => {
            console.log("data at model -> ", data)
            if (data && data.length !== 0) {
                data = data[0].Comments
                let arr = []
                for (x of data) {
                    obj = { "Name": x.Name, "Comment": x.Comment, "CommentId": x.CommentId }
                    arr.push(obj)
                }
                console.log("Array at model -> ", arr)
                return arr
            }
            else {
                return null
            }
        })
    })
}

model.getReplies = (commentId) => {
    return connection.getReplyCollection().then(collection => {
        return collection.find({ "CommentId": commentId }, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0, CommentId: 0 }).then(data => {
            if (data && data.length !== 0) {
                data = data[0].Replies
                let arr = []
                for (x of data) {
                    obj = { "Name": x.Name, "Reply": x.Reply, "ReplyId": x.ReplyId }
                    arr.push(obj)
                }
                return arr
            }
            else {
                return null
            }

        })
    })
}

model.deleteComment = (postId, commentId) => {
    return connection.getCommentCollection().then(collection => {
        return collection.updateOne({ "PostId": postId }, { $pull: { Comments: { CommentId: commentId } } }).then(response => {
            if (response.nModified > 0) {
                return connection.getReplyCollection().then(replyCollection => {
                    return replyCollection.deleteOne({ CommentId: commentId }).then(dData => {
                        if (dData) {
                            return commentId
                        }
                        else return null
                    })
                })
            }
            else return null
        })
    })
}

model.deleteReply = (commentId, replyId) => {
    return connection.getReplyCollection().then(collection => {
        return collection.updateOne({ "CommentId": commentId }, { $pull: { Replies: { ReplyId: replyId } } }).then(response => {
            if (response.nModified > 0) {
                return replyId
            }
            else return null
        })
    })
}

model.increasePostLikes = (PostId) => {
    return connection.getPostLikesCollection().then(collection => {
        return collection.updateOne({PostId:PostId},{$inc:{NoOfLikes:1}}).then(response => {
            if(response.nModified > 0){
                return true
            }
            else return false
        })
    })
}

model.decreasePostLikes = (PostId) => {
    return connection.getPostLikesCollection().then(collection => {
        return collection.updateOne({PostId:PostId},{$inc:{NoOfLikes:-1}}).then(response => {
            if(response.nModified > 0){
                return true
            }
            else return false
        })
    })
}

model.getPostLikes = (PostId) => {
    return connection.getPostLikesCollection().then(collection => {
        return collection.find({PostId:PostId},{NoOfLikes:1,_id:0}).then(data => {
            if(data){
                return data[0]
            }
            else return null
        })
    })
}

model.postMessage = (messageObj) => {
   return connection.getContactCollection().then(collection => {
       return collection.create(messageObj).then(data => {
           if(data && data.length!==0){
               return data
           }
           else return false
       })
   }) 
}

model.getAllMessages = () => {
    return connection.getContactCollection().then(collection => {
        return collection.find({},{Name:1,Email:1,Message:1,_id:0}).then(data => {
            data=data[0]
            if(data && data.length!==0){
                return data
            }
            else return null
        })
    })
}

module.exports = model



