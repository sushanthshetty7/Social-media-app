# Social-media-app

This is a full-stack social media application with a real-time chat feature. The application is built using ReactJS and Node.js with Socket.io for real-time communication.

**Features**

- User authentication and authorization
- Create, read, update, and delete posts
- Like and dislike posts
- Follow and unfollow other users
- Real-time chat with online/offline status
- Responsive design

  **Getting Started**

- Prerequisites
- Node.js v18
- MongoDB v5 or higher

  ## installation

**Clone the repository**

```
git clone https://github.com/your-username/social-media-app.git
```

**Install dependencies**

```
cd social-media-app
npm install
cd react_client
npm install
cd social_rest
npm install
cd socket
npm install
```

**Configure environment variables**

Create a `.env` file in the root directory of the project
Add the following variables:

```
REACT_APP_MONGODB_URI=<your-mongodb-uri>
```

**Start the application**

> open three terminals for each of the folders

```
\react_client>npm start
\social_rest>nodemon index.js
\sosket>nodemon index.js

```

**Technologies Used**

- ReactJS
- Node.js
- Express
- MongoDB
- Socket.io
- Material UI
