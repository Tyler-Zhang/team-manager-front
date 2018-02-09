# Team Manager Frontend

[![Build Status][build-badge]][build]

[build]: https://travis-ci.org/waterloop/team-manager-front
[build-badge]: https://travis-ci.org/waterloop/team-manager-front.svg?branch=master

Frontend Webapp for managing Waterloop team members

**[Checkout the Backend Repo here](https://github.com/teamwaterloop/team-manager-back/)**


## Pictures

![](https://i.imgur.com/78r9fyu.png)
Adding a user

![](https://i.imgur.com/sqv1WBC.png)
User control panel

![](https://i.imgur.com/CWLKvIj.png)
Team control panel


## Steps to run the project

### 1. Install Dependences

For this project we are using yarn.

If you have yarn, just run:  ```yarn```

If you don't you can run ```npm install -g yarn``` to get it. Sudo might be required on mac/linux

### 2. Make sure you are running the backend server

Go to the repo [here](https://github.com/teamwaterloop/team-manager-back) for instructions

### 3. Run the project!

You can either:

* Run the project on port 9000 ```yarn start```
* Run the project on port 80 ```yarn start:80```

This is so that you can test Google Authentication which needs to redirect to a non-localhost address. So when you add localhost.com to your host file, you can run the webpack dev server on port 80 and access it as localhost.com.
