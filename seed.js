const posts = require('./data/posts');
const users = require('./data/users');
const comments = require('./data/comments');
const connection = require('./config/mongoConnection');
//const { comments } = require('./data');

async function main() {
    const db = await connection.dbConnection();
    await db.dropDatabase();

    //CREATING USERS
    let jhanviId = '';
    let susanId = '';
    let shreyaId = '';
    let zachId = '';
    let stevenId = '';
    let freshmanId = '';
    try{
        let user = await users.createUser('jhanvi1@stevens.edu', 'Stevens-123!', 'Jhanvi', 'Ganesh');
        jhanviId = user.userId.toString();

    }catch(e){
        console.log(e);
    }

    try{
        let user = await users.createUser('spatel@stevens.edu', 'Stevens1!', 'Shreya', 'Patel');
        shreyaId = user.userId.toString();

    }catch(e){
        console.log(e);
    }

    try{
        let user = await users.createUser('zzajack@stevens.edu', '$Tevens2', 'Zach', 'Zajack');
        zachId = user.userId.toString();

    }catch(e){
        console.log(e);
    }

    try{
        let user = await users.createUser('smcaloon@stevens.edu', 'Stevens1!', 'Susan', 'McAloon');
        susanId = user.userId.toString();

    }catch(e){
        console.log(e);
    }

    try{
        let user = await users.createUser('struong@stevens.edu', 'Compsci123?', 'Steven', 'Truong');
        stevenId = user.userId.toString();

    }catch(e){
        console.log(e);
    }
    try{
        let user = await users.createUser('tsmith@stevens.edu', 'Yankees9!', 'Toby', 'Smith');
        freshmanId = user.userId.toString();
    }catch(e){
        console.log(e);
    }

    //CREATING POSTS
    let libraryThirdId = '';
    try{
        let post = await posts.addPost(susanId, 'The Best Study Spot EVER', 'Library', '3', 
        'The third floor of the library is my favorite study space at Stevens. There is no talking on this floor so you get the best studying done. This spot is more for solo studying so if you want to meet with a group, maybe try somewhere else. I wish I knew about this earlier!',
        '1', '5', '4', '1', 'Yes');
        libraryThirdId = post._id.toString();
    }catch(e){
        console.log(e);
    }
    let gatewayBoothPostId = '';
    try{
        let post = await posts.addPost(shreyaId, 'My favorite spot - Gateway Booths!', 'Gateway North', '2', 
        'The booths on the second floor of Gateway are the best. I love how comfortable they are and it is cool that you can adjust the lighting in each booth. There are also outlets available in each booth so it is really convenient. Gateway is near most of my class buildings so it is a great spot to go and get work done with friends. The booths are usually filled with people, so if you see an empty booth, you gotta get it fast!',
        '3', '4', '5', '2', 'Yes');
        gatewayBoothPostId = post._id.toString();
    }catch(e){
        console.log(e);
    }

    try {
        let comment = await comments.createComment(susanId, gatewayBoothPostId, "I totally agree. This spot is so good and I get so excited when I actually get a seat.");
    }catch(e){
        console.log(e);
    }
    try {
        let comment = await comments.createComment(stevenId, gatewayBoothPostId, "If only there were more booths because they are hard to get.");
    }catch(e){
        console.log(e);
    }
    try{ //adding like to a post
        let addLike = await posts.addLike(gatewayBoothPostId, susanId);
    }catch(e){
        console.log(e);
    }
    try{ //adding like to a post
        let addLike = await posts.addLike(gatewayBoothPostId, jhanviId);
    }catch(e){
        console.log(e);
    }
    try{ //adding like to a post
        let addLike = await posts.addLike(gatewayBoothPostId, zachId);
    }catch(e){
        console.log(e);
    }
    let uccPostId = '';
    try{  //adding a controversial post
        let post = await posts.addPost(freshmanId, 'Best views ever', 'UCC', '12', 
        'I live in the University center and my floor is the best place to study. I have such good views of the city and everything is nice and new.',
        '3', '5', '10', '5', 'No');
        uccPostId = post._id.toString();
    }catch(e){
        console.log(e);
    }
    try{
        let dislike = await posts.addDislike(uccPostId, zachId);
    }catch(e){
        console.log(e);
    }
    try{
        let dislike = await posts.addDislike(uccPostId, shreyaId);
    }catch(e){
        console.log(e);
    }
    try{
        let flag = await posts.addFlag(uccPostId, susanId);
    }catch(e){
        console.log(e);
    }
    try{
        let comment = await comments.createComment(jhanviId, uccPostId, 
        "I just walked all the way to the UCC to realize I wasn't allowed past the third floor since I don't live there. This post isn't helpful because this spot is restricted.");
    }catch(e){
        console.log(e);
    }










    
    await connection.closeConnection();
}

main();


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
    //     let addLike = await posts.addLike(postId, userId);
    //     console.log(addLike);
    // }catch(e){
    //     console.log(e);
    // }
    // try{// adding dislike to same post
    //     let addLike = await posts.addDislike(postId, userId);
    //     console.log(addLike);
    // }catch(e){
    //     console.log(e);
    // }
    // try{ //adding like to a post
    //     let addLike = await posts.addLike("639b996b0b9fda32b292d836", 'randomUser');
    //     console.log('after like is added')
    //     console.log(addLike);
    // }catch(e){
    //     console.log(e);
    // }
    // try{ //adding like to a post
    //     let addLike = await posts.addLike(postId, userId);
    //     console.log(addLike);
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


