# Team Node-JS
# Chat Bubbles 

This project features two servers. One is in the `client-react` folder and the other is in the `server-express-mysql` folder. In order to run this project, open two terminal windows, one for each folder. 

For `client-react`, run `npm install`, then `npm start`, and the server will run at `http://localhost:3000`.

For `server-express-mysql`, run `npm install`, `npm run db:create`, then `npm start`, and the server will run at `http://localhost:3001`.

## Signing up users

In order to signup users, a `.env` file should be creates in the `server-express-mysql` folder. 
1. The following fields should be created with information from the administrator's email account:

>OUTGOING_EMAIL_SERVER=[administrator smtp server]
>EMAIL_SERVER_PORT=587
>EMAIL_ADDRESS=[administrator email address]
>EMAIL_PASSWORD=[administrator password]
>EMAIL_ACCOUNT_ADMINISTRATOR=[administrator name]

2. As an example, a Google email account was used. A new account that is used only for this feature should be used. Once a new account is created, use the following link and choose `Less secure apps & your Google Account` and follow the instructions to turn on (allow) less secure app access.

https://support.google.com/accounts/topic/7188673?hl=en&ref_topic=3382253

3. While testing the server functions for `localhost:3001/users/signup`, an email will be sent by the email address provided in the `.env` file. For testing this feature, the administrator should only send emails to email addresses that they have control over. The email provider who receives the email may flag it as unsafe due to the fact it was created by a less secure app. The email confirmation server can be disabled by commenting out `line 95` in the`server-express-mysql/routes/users.js` file. The confirmation codes are still accessible using `MySQL Workbench`.