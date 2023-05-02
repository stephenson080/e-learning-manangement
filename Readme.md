# CSC501 Project
Software engineering practical assignment
## Project Setup

To run this project, you need to have NodeJs and Typescript installed;
NodeJs can be download [Here](https://nodejs.org/en/download)

After Nodejs is installed, install Typescript using npm;

```console
    npm install -g typescript
```
### Setting up Coudinary

Cloudinary cloud service is used for uploading files. Create  cloundinary account [here](https://cloudinary.com/users/register_free) and get create a app on your cloudinary dashboard. get your app name Api key, Api secret from your dasboard. then create a .env file add the following in it.

```env
    CLOUDINARY_NAME=[YOUR_APP_NAME]
    API_KEY=[YOUR_API_KEY]
    API_SECRET=[YOUR_API_SECRET]
```
### Setting up mongodb

create a MongoDB Atlas account and create Database o your Dashboard. get the database connection url and add it the .env file

```env
    DB_CONNECTION=[YOUR_MONGODB_DATABASE_URL]
```


After cloning the project from github, on the root directory, run the command below to install all dependencies;

```console
    npm install
```

## Running Project

To run the project run on your terminal;

```console
    npm run dev
```

