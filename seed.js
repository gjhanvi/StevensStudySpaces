const posts = require('./data/posts');
const users = require('./data/users');
const comments = require('./data/comments');
const connection = require('./config/mongoConnection');
//const { comments } = require('./data');

async function main() {
    const db = await connection.dbConnection();
    await db.dropDatabase();

    let userId;
    try{
        let user = await users.createUser("jhanvi1@stevens.edu", "Stevens-123!", "Jhanvi", "Ganesh");
        userId = user._id;
        console.log("user created");
    }catch(e){
        console.log(e);
    }
    //console.log(userId);

    let postId;
    try{
        let post = await posts.addPost('ObjectId(23234)', "Title", 'Building', '1', 'I am testing',
        '1', '3', '11', '4', 'randomPhoto', 'Yes');
        postId = post._id;
        console.log('added new post');
        // console.log(post);
    } catch(e){
        console.log(e);
    }
    //console.log(postId);

    try {
        let comment = await comments.createComment(userId, postId, "slayyyyy");
        console.log('comment added');
    }catch(e){
        console.log(e);
    }

    // try{
    //     let post = await posts.addPost('ObjectId(23234)', 'Babbio', '1', 'this is a test',
    //     '1', '3', '12', '4', 'randomPhoto', 'Yes');
    //     postId = post._id;
    //     console.log('added new post');
    //     // console.log(post);
    // }catch(e){
    //     console.log(e);
    // }

    // try{    //removes first post added
    //     let remove = await posts.removePost(postId);
    //     console.log('removed post');
    // }catch(e){
    //     console.log(e);
    // }

    try{
        let postList = await posts.getAllPosts();
        console.log('showing all posts:');
        console.log(postList);
    }catch(e){
        console.log(e);
    }

    try{
        let addFlag = await posts.addFlag(postId,'UserId');
        console.log(`Adding flag to post with id of ${postId}.`);
        console.log(addFlag);
    }catch(e){
        console.log(e);
    }



    await connection.closeConnection();
}

main();