const posts = require('./data/posts');
const users = require('./data/users');
const connection = require('./config/mongoConnection');

async function main() {
    const db = await connection.dbConnection();
    await db.dropDatabase();

    let postId;
    try{
        let post = await posts.addPost('ObjectId(23234)', 'Tester', '1', 'I am testing',
        '1', '3', '11', '4', 'randomPhoto', 'Yes');
        postId = post._id;
        console.log('added new post');
        // console.log(post);
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