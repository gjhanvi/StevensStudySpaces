const posts = require('./data/posts');
const users = require('./data/users');
const comments = require('./data/comments');
const connection = require('./config/mongoConnection');
//const { comments } = require('./data');

async function main() {
    const db = await connection.dbConnection();
    await db.dropDatabase();

    //let userId;
    // try{
    //     let user = await users.createUser("jhanvi1@stevens.edu", "Stevens-123!", "Jhanvi", "Ganesh");
    //     //userId = user._id;
    //     console.log("user created");
    // }catch(e){
    //     console.log(e);
    // }
  

    // let postId;
    // try{
    //     let post = await posts.addPost('1111', "hello", 'Babbio', '1', 'I am testing',
    //     '1', '3', '11', '4', 'randomPhoto', 'Yes');
    //     postId = post._id;
    //     console.log('added new post');
    // } catch(e){
    //     console.log(e);
    // }


    // try {
    //     let comment = await comments.createComment(userId, postId, "slayyyyy");
    //     console.log('comment added');
    // }catch(e){
    //     console.log(e);
    // }

    // try{
    //     let check = await posts.checkIds("639cd30b34544e59fb1c23e6", '1111');
    //     console.log(check);
    // }catch(e){
    //     console.log(e);
    // }


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

    // try{
    //     let postList = await posts.getAllPosts();
    //     console.log('showing all posts:');
    //     //console.log(postList);
    // }catch(e){
    //     console.log(e);
    // }

    // try{
    //     let addFlag = await posts.addFlag(postId,'randomUser');
    //     console.log(`Adding flag to post with id of ${postId}.`);
    //     console.log(addFlag);
    // }catch(e){
    //     console.log(e);
    // }

    // try{ //adding like to a post
    //     let addLike = await posts.addLike("639b98fdeca0fc87d5884d44", 'randomUser');
    //     console.log('after like is added')
    //     console.log(addLike);
    // }catch(e){
    //     console.log(e);
    // }
    // try{
    //     let checklike = await posts.checkUserLiked(postId, userId);
    //     console.log(checklike);
    // }catch(e){
    //     console.log(e);
    // }
    // try{// adding dislike to same post
    //     let addLike = await posts.addDislike(postId, userId);
    //     console.log(addLike);
    // }catch(e){
    //     console.log(e);
    // }

    // try{
    //     let ans = await posts.checkUserFlagged(postId,'randomUser' );
    //     console.log(ans);
    // }catch(e){
    //         console.log(e);
    //     }
    



    await connection.closeConnection();
}

main();