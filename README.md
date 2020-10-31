<b>SERTIS BACKEND LAB</b>
<br/><br/>
**TODOS...**
1. npm i --save<br/>
2. npm start <br/>

| URL | METHOD | REQ-BODY | EVENTS |
| ------ | --- | ------ | ------------ |
| localhost:5000 | GET | - | Create table/database and set sessions|
| localhost:5000/auth | POST | username,password | check for account authentication, old account check password, new account randomly generated password | 
| localhost:5000/session  | GET | - | check all sessions for current value|
| localhost:5000/api/allPost  | POST | - | list all post from anyone with JSON output. Fetch from mysql online instead of local mysql| 
| localhost:5000/api/myPost | POST | - | list all posts that own by current authenticated user |
| localhost:5000/api/addPost | POST | content,cardName,cardstatus,cardContent,cardCategory | Add new post(with title/status/category/name/etc) and record the owner rights | 
| localhost:5000/api/editPost/:id | PUT | content,cardName,cardstatus,cardContent,cardCategory | Update the post that own by the current authenticted user |
| localhost:5000/api/deletePost/:id | DELETE | - | Delete content own by the authenticated user | 
<hr/>
<p6>API lists...</p6><br/>
- <p6>
- GET localhost:5000 <= {}<br/>
- POST localhost:5000/auth  <= {username,password}<br/>
- GET localhost:5000/session <= {}<br/>
- POST localhost:5000/api/allPost <= {}<br/>
- POST localhost:5000/api/myPost <= {}<br/>
- POST localhost:5000/api/addPost <= {content,cardName,cardstatus,cardContent,cardCategory}<br/>
- PUT localhost:5000/api/editPost/[id] <= {content,cardName,cardstatus,cardContent,cardCategory}<br/>
- DELETE localhost:5000/api/deletePost/[id] <= {}<br/></p6>

<hr/><br/>

<br/>
<img src="./screenshots/index.gif" width="100%" /><br/>
<b>GET localhost:5000 <= {} </b><br/><br/>
<hr/><br/>
<img src="./screenshots/auth.gif" width="100%" /><br/>
<b>POST localhost:5000/auth  <= {username,password} </b><br/><br/>
<hr/><br/>
<img src="./screenshots/session.gif" width="100%" /><br/>
<b>GET localhost:5000/session <= {} </b><br/><br/>
<hr/><br/>
<img src="./screenshots/allpost.gif" width="100%" /><br/>
<b>POST localhost:5000/api/allPost <= {} </b><br/><br/>
<hr/><br/>
<img src="./screenshots/mypost.gif" width="100%" /><br/>
<b>POST localhost:5000/api/myPost <= {} </b><br/><br/>
<hr/><br/>
<img src="./screenshots/addpost.gif" width="100%" /><br/>
<b>POST localhost:5000/api/addPost <= {content,cardName,cardstatus,cardContent,cardCategory} </b><br/><br/>
<hr/><br/>
<img src="./screenshots/edit.gif" width="100%" /><br/>
<b>PUT localhost:5000/api/editPost/[:id] <= {content,cardName,cardstatus,cardContent,cardCategory} </b><br/><br/>
<hr/><br/>
<img src="./screenshots/del.gif" width="100%" /><br/>
<b>DELTE localhost:5000/api/deletePost/[:id] <= {} </b><br/><br/>
<hr/><br/>

