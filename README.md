# public-group-chat-on-the-go
Installation:
1. exec cmd on terminal 
    * ```git clone https://github.com/michaeljymsgutierrez/public-group-chat-on-the-go.git```
    * ```npm install```
    * ```npm install -g pm2```
    * ```pm2 serve project_path 5000```
    * ```pm2 start db-server.js```
2. make sure you have installed `mysql` if not then proceed ```google``` and install
3. create ```database``` on ```mysql``` name ```chat```
4. create ```table``` and fields are ```id ,user, msg, is_mentioned```
5. all fields are ```longtext``` except ```id``` duh!!!