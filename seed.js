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

    let carnegieId = '';
    try{
        let post = await posts.addPost(jhanviId, 'Carnegie is okay', 'Carnegie', '2', 
        'Hi Ta/Ca, Steven here. You will notice that some of the descriptions will be random sentences because I ran out of brain power thinking of them. Hope grading/finals is going well for yall.',
        '2', '2', '11', '4', 'No');
        carnegieId = post._id.toString();
    }catch(e){
        console.log(e);
    }


    let mcleanId = '';
    try{
        let post = await posts.addPost(susanId, 'Mclean more Mcdonalds or something', 'McLean', '2', 
        'This is placeholder text Because I ran out of descriptions of study spots. This description is being written at 3:09am because we needed more posts of every building imho. - Steven. Send help ',
        '4', '1', '13', '4', 'Yes');
        mcleanId = post._id.toString();
    }catch(e){
        console.log(e);
    }

    let mortonId = '';
    try{
        let post = await posts.addPost(shreyaId, 'Morton is Neat', 'Morton', '4', 
        'This is placeholder text Because I ran out of descriptions of study spots. Imagine a really funny description and accurate one about a study spot on the fourth floor of morton lol',
        '5', '2', '17', '4', 'No');
        mortonId = post._id.toString();
    }catch(e){
        console.log(e);
    }

    let pierceId = '';
    try{
        let post = await posts.addPost(zachId, 'The Dining Hall is Great For Studying and Eating', 'Pierce', '2', 
        'Pierce food is fantastic and I would eat here every day and study here if I had unlimited swipes! Oh studying here is pretty cool here too I guess',
        '3', '3', '19', '3', 'Yes');
        pierceId = post._id.toString();
    }catch(e){
        console.log(e);
    }

    let absId = '';
    try{
        let post = await posts.addPost(stevenId, 'ABS stands for Awesome Basement Spot', 'ABS', '1', 
        'This spot is so secert but so good!',
        '2', '3', '4', '5', 'No');
        absId = post._id.toString();
    }catch(e){
        console.log(e);
    }

    
    let edwinId = '';
    try{
        let post = await posts.addPost(freshmanId, 'Fake Spot in Edwin. Try to Flag me!', 'Edwin', '1', 
        'You gotta take the elevator from the 8th floor down into the 5th floor and jump out at the 17th floor while driving backwards to get here losers',
        '1', '1', '1', '1', 'Yes');
        edwinId = post._id.toString();
    }catch(e){
        console.log(e);
    }

    let gateWaySouthId = '';
    try{
        let post = await posts.addPost(freshmanId, 'Go ahread try to Spam my Post. Loser + Ratio + L Bozo', 'Gateway South', '3', 
        'Stevens is a terrbile school and we should boycott it. Take this L admins and users, you guys smell ! >:)',
        '5', '5', '5', '5', 'No');
        gateWaySouthId = post._id.toString();
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

    try{
        let comment = await comments.createComment(shreyaId, uccPostId, 'I do not agree with your view rating.');
    }catch(e){
        console.log(e);
    }

    
    let burchardPostId = '';
    try{
        let post = await posts.addPost(zachId, 'Great spot for groups', 'Burchard', '1', 
        'The first floor of Burchard has a room with a big table that is great for meetings or getting work done with a group of friends.',
        '2', '3', '15', '1', 'No');
        burchardPostId = post._id.toString();
    }catch(e){
        console.log(e);
    }
    
    let howePostId = '';
    try{
        let post = await posts.addPost(stevenId, 'Good studies and great views', 'Howe', '4', 
        'The 4th floor of Howe is a spot a lot of people probably know about, but it is great! The Howe building has great views in general and this room has a lot of windows to see the city. I like to go here to get work done especially at night. ',
        '3', '5', '20', '5', 'Yes');
       howePostId = post._id.toString();
    }catch(e){
        console.log(e);
    }
    try{
        let comment = await comments.createComment(susanId, howePostId, 'This is a classic.');
    }catch(e){
        console.log(e);
    }
    try{ //adding like to a post
        let addLike = await posts.addLike(howePostId, susanId);
    }catch(e){
        console.log(e);
    }
    try{ //adding like to a post
        let addLike = await posts.addLike(howePostId, jhanviId);
    }catch(e){
        console.log(e);
    }
    try{ //adding like to a post
        let addLike = await posts.addLike(howePostId, shreyaId);
    }catch(e){
        console.log(e);
    }
    
    let gatewayPostId = '';
    try{
        let post = await posts.addPost(susanId, 'Gateway Steps', 'Gateway North', '1', 
        'The big steps in gateway are a nice spot to do homework or just hangout in between classes. There is always space to sit and it is right outside gateway cafe which is nice. ',
        '5', '3', '9', '2', 'Yes');
        gatewayPostId = post._id.toString();
    }catch(e){
        console.log(e);
    }
    try{ //adding like to a post
        let addLike = await posts.addLike(gatewayPostId, shreyaId);
    }catch(e){
        console.log(e);
    }
    try{ //adding like to a post
        let addLike = await posts.addLike(gatewayPostId, stevenId);
    }catch(e){
        console.log(e);
    }
    
    try{
        let comment = await comments.createComment(shreyaId, gatewayPostId, 'I love this spot too thanks for sharing Susan!');
    }catch(e){
        console.log(e);
    }
    try{
        let comment = await comments.createComment(stevenId, gatewayPostId, 'Great post!');
    }catch(e){
        console.log(e);
    }
    

    let babbioPostId = '';
    try{
        let post = await posts.addPost(jhanviId, 'Hallway Desks', 'Babbio', '2', 
        'There are desks and tables in the hallway of Babbio which are a great quiet spot to study. I did not realize they were there until I had a class on this floor. Some spots are right near the window and have great city views!',
        '1', '2', '2', '4', 'Yes');
        babbioPostId = post._id.toString();
    }catch(e){
        console.log(e);
    }
    let babbioPostId1 = '';
    try{
        let post = await posts.addPost(jhanviId, 'This is a duplicate babbio to show filters usage', 'Babbio', '3', 
        'RanaisdaomOG Garbage Description SLASODKPSDKPOAISDKPASJKPDASJKPDIASJPIDJPSIAJ',
        '3', '1', '6', '4', 'Yes');
        babbioPostId1 = post._id.toString();
    }catch(e){
        console.log(e);
    }
    let babbioPostId2 = '';
    try{
        let post = await posts.addPost(jhanviId, 'This is a duplicate babbio to show filters usage', 'Babbio', '3', 
        'RanaisdaomOG Garbage Description SLASODKPSDKPOAISDKPASJKPDASJKPDIASJPIDJPSIAJ',
        '4', '2', '9', '2', 'Yes');
        babbioPostId2 = post._id.toString();
    }catch(e){
        console.log(e);
    }
    try{
        let comment = await comments.createComment(susanId, babbioPostId, 'I just showed my friend this spot and she had no idea!');
    }catch(e){
        console.log(e);
    }
    let kiddePostId = '';
    try{
        let post = await posts.addPost(freshmanId, 'Soundproof room!!', 'Kidde', '2', 
        'This might not apply to a lot of students, but for us music tech kids, our studying involves playing music so this is the best spot.',
        '5', '2', '12', '1', 'Yes');
        kiddePostId = post._id.toString();
    }catch(e){
        console.log(e);
    }

    
    try{
        let comment = await comments.createComment(stevenId, kiddePostId, 'I am not music tech but this is a fun spot.');
    }catch(e){
        console.log(e);
    }
    try{ //adding like to a post
        let addLike = await posts.addLike(babbioPostId, zachId);
    }catch(e){
        console.log(e);
    }
    try{ //adding like to a post
        let addLike = await posts.addLike(kiddePostId, zachId);
    }catch(e){
        console.log(e);
    }
    try{ //adding like to a post
        let addLike = await posts.addLike(burchardPostId, susanId);
    }catch(e){
        console.log(e);
    }
    try{ //adding like to a post
        let addLike = await posts.addLike(burchardPostId, freshmanId);
    }catch(e){
        console.log(e);
    }
    try{ //adding like to a post
        let addDislike = await posts.addDislike(burchardPostId, shreyaId);
    }catch(e){
        console.log(e);
    }
    try{
        let comment = await comments.createComment(shreyaId, burchardPostId, 'Last time I was here, these kids kicked me out and said they reserved the spot. :/');
    }catch(e){
        console.log(e);
    }

    try{ //adding like to a post
        let addLike = await posts.addLike(mortonId, shreyaId);
        let addDislike = await posts.addDislike(edwinId, shreyaId);
        let comment = await comments.createComment(shreyaId, absId, "This is a comment to show you that comments work");
        
    }catch(e){
        console.log(e);
    }
    try{
        let addLike = await posts.addLike(mortonId, zachId);
        let addDislike = await posts.addDislike(edwinId, zachId);
        let comment = await comments.createComment(zachId, absId, "This is a comment to show you that comments work");
    }catch(e){
        console.log(e);
    }
    try{
        let addLike = await posts.addLike(mortonId, susanId);
        let addDislike = await posts.addDislike(edwinId, susanId);
        let comment = await comments.createComment(susanId, absId, "This is a comment to show you that comments work");
    }catch(e){
        console.log(e);
    }
    try{
        let addLike = await posts.addLike(mortonId, stevenId);
        let addDislike = await posts.addDislike(edwinId, stevenId);
        let comment = await comments.createComment(stevenId, absId, "This is a comment to show you that comments work");
    }catch(e){
        console.log(e);
    }
    try{
        let addLike = await posts.addLike(mortonId, jhanviId);
        let addDislike = await posts.addDislike(edwinId, jhanviId);
        let comment = await comments.createComment(jhanviId, absId, "This is a comment to show you that comments work");
    }catch(e){
        console.log(e);
    }

    
    try{ //adding like to a post
        let addLike = await posts.addLike(carnegieId, shreyaId);
        let addDislike = await posts.addDislike(pierceId, shreyaId);
        let comment = await comments.createComment(shreyaId, babbioPostId, "This is a comment to show you that comments work");
        
    }catch(e){
        console.log(e);
    }
    try{
        let addLike = await posts.addLike(carnegieId, zachId);
        let addDislike = await posts.addDislike(pierceId, zachId);
        let comment = await comments.createComment(zachId, carnegieId, "This is a comment to show you that comments work");
    }catch(e){
        console.log(e);
    }
    try{
        let addLike = await posts.addLike(pierceId, susanId);
        let addDislike = await posts.addDislike(carnegieId, susanId);
        let comment = await comments.createComment(susanId, pierceId, "This is a comment to show you that comments work");
    }catch(e){
        console.log(e);
    }
    try{
        let addLike = await posts.addLike(gateWaySouthId, stevenId);
        let addDislike = await posts.addDislike(mcleanId, stevenId);
        let comment = await comments.createComment(stevenId, gateWaySouthId, "This is a comment to show you that comments work");
    }catch(e){
        console.log(e);
    }
    try{
        let addLike = await posts.addLike(gateWaySouthId, jhanviId);
        let addDislike = await posts.addDislike(mcleanId, jhanviId);
        let comment = await comments.createComment(jhanviId, mcleanId, "This is a comment to show you that comments work");
    }catch(e){
        console.log(e);
    }
    
    await connection.closeConnection();
}

main();