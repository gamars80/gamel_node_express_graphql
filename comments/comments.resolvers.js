const commentMoldel = require('./comments.model');
module.exports = {
    Query: {
        // comments: async (parent) => {
        //     const comment = await Promise.resolve(parent.comments);
        //     return comment;
        // }
        comments: () => {
            return commentMoldel.getAllComments();
        },
        commentsByLikes: (_, args) =>{
            return commentMoldel.getCommentsByLikes(args.minLikes);
        }
    },
    Mutation: {
        addNewComment: (_, args) => {
            return commentMoldel.addNewComment(args.id, args.text);
        }
    }
}