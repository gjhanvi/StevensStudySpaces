# Stevens Study Spaces
A forum where users can review or share new study spots at Stevens. We seek to build a website where you can go and find the perfect study spot for you or your group. 

# Installing application

In your terminal, run ```git clone https://github.com/gjhanvi/StevensStudySpaces ``` then cd to the new folder and run ```git pull``` just to keep the application up to date. Run ```npm i ``` to install all dependencies and packages. 

1. ```git clone https://github.com/gjhanvi/StevensStudySpaces ```
2.  ```git pull```
3.  ```npm i ```



# How To Run
Run ```node seed.js``` to populate the mongo database with fake users, posts. comments and etc. Run ```node start ``` to start the website and access it by [localhost:3000/](localhost:3000/)

1. ```git pull```
2. ```node seed.js``` optional
2. ```npm start ```
3. [localhost:3000/](localhost:3000/)


# Features
+ User Registration
	- This site is meant for Steven Students so we require all users to create an account using their Stevens email.
+ User Login
  - Using your Stevens email and created password, Stevens Students will have access to our website and features.
+ Posts
	+ Posts are the predominate feature of our website.
		+ Post Creation 
 	 		- Users can create their own post about a study spot by filling out form that includes information such as where the spot is, how noisy it is, and other qualities that are important to student when it comes to finding a study spot. After successfully uploading a post, users can then upload a corresponding photo with it.
		+ Comments
  			- Users can leave comments on their post to share their opinions or the original author can share more information if they want to in the comments as well.
		+ Flags/Like/Dislikes
 			 - Other users can like/dislike posts to let others know their thoughts. If a user notices that a post contains wrong information, they can flag it and report various option as to why they are flagging the post.	
 		+ Post Deletion
 			+ Users can choose to delete their post as well if they want to .
 + Filter Posts
 	+ Our website has the ability to filter posts by how noisy they are or where they are located. All users have to do is choose their selective options and click a button and they will instantly see study spots that fit their criteria 
 
