const express = require("express")
const routing = express.Router();
const service = require("../service/test")

routing.post("/insertEmail",(req,res,next) => {
    let emailObj=req.body;
    service.insertEmails(emailObj).then(data => {
        console.log("routing ->",data)
        if(data){
            res.json({message : `Welcome to the club`})
        }
    }).catch(err => {
        next(err)
    })
})
routing.put("/postComment/:postId",(req,res,next) => {
    let commentObj = req.body
    let postId = req.params.postId
    service.createComment(commentObj,postId).then(data => {
        if(data){
            res.json({message:`your comment is posted`})
        }
    }).catch(err => {
        next(err)
    })
})

routing.put("/postReply/:commentId",(req,res,next) => {
    let replyObj = req.body
    let commentId = req.params.commentId
    service.createReply(replyObj,commentId).then(data => {
        if(data){
            res.json({message : data})
        }
    }).catch(err => {
        next(err)
    })
})

routing.post("/createPost",(req,res,next) => {
    let postObj = req.body
    service.createPost(postObj).then(data => {
        if(data){
            res.json({message : data})
        }
    }).catch(err => {
        next(err);
    })
})

routing.get("/getPostIds",(req,res,next) => {
    service.getPostIds().then(data => {
        if(data && data.length!==0){
            res.json({message:data})
        }
    }).catch(err => {
        next(err)
    })
})

routing.get("/getComments/:postId",(req,res,next) => {
    let postId = req.params.postId
    service.getComments(postId).then(data => {
        if(data && data.length!==0){
            res.json({message : data})
        }
    }).catch(err => {
        next(err)
    }) 
})

routing.get("/getReplies/:commentId",(req,res,next) => {
    let postId = req.params.commentId
    service.getReplies(postId).then(data => {
        if(data && data.length!==0){
            res.json({message : data})
        }
    }).catch(err => {
        next(err)
    }) 
})

routing.delete("/deleteComment/:postId/:commentId",(req,res,next) => {
    let postId = Number(req.params.postId)
    let commentId = Number(req.params.commentId)
    service.deleteComment(postId,commentId).then(data => {
        if(data){
            res.json({message : `Your comment has been deleted`})
        }
    }).catch(err => {
        next(err)
    })
})

routing.delete("/deleteReply/:commentId/:replyId",(req,res,next) => {
    let commentId = Number(req.params.commentId)
    let replyId = Number(req.params.replyId)
    service.deleteReply(commentId,replyId).then(data => {
        if(data){
            res.json({message:`Reply deleted with ID -> ${data}`})
        }
    }).catch(err =>{
        next(err)
    })
})

routing.put("/increasePostLikes/:PostId",(req,res,next) => {
    let PostId = Number(req.params.PostId)
    service.increasePostLikes(PostId).then(response => {
        res.json({message : response})
    }).catch(err => next(err))
})

routing.put("/decreasePostLikes/:PostId",(req,res,next) => {
    let PostId = Number(req.params.PostId)
    service.decreasePostLikes(PostId).then(response => {
        res.json({message : response})
    }).catch(err => next(err))
})



routing.get("/getPostLikes/:PostId",(req,res,next) => {
    let PostId = Number(req.params.PostId)
    service.getPostLikes(PostId).then(data => {
        res.json({message:data})
    }).catch(err => next(err))
})

routing.post("/postMessage",(req,res,next) => {
    let messageObj = req.body
    service.postMessage(messageObj).then(data => {
        let name = String(data.Name)
        let arr = name.split(" ")
        name = arr[0]
        let some = name.charAt(0).toUpperCase()
        for( let k=1;k<name.length;k++){
            some+=name[k]
        }
        if(data && data.length!==0){
            res.json({message:`Hi ${some}. Our team will get back to you at the earliest. We recommend you to stay updated with your email. Thank you for getting in touch.`})
        }
    }).catch(err => next(err))
})

routing.get("/getAllMessages", (req,res,next) => {
    service.getAllMessages().then(data => {
        if(data && data.length!==0){
            res.json({message : data})
        }
    }).catch(err => next(err))
})

routing.get("/getAllSubscribers",(req,res,next) => {
    service.getAllSubscribers().then(data => {
        if(data && data.length!==0){
            res.send(data)
        }
    }).catch(err => next(err))
})

module.exports = routing