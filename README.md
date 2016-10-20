## Description
This application generates huge collection (default 100k) of random objects (books with authors) using
 [Chance library](http://chancejs.com/) and displays them using [React Virtualized Table](https://github.com/bvaughn/react-virtualized).
 Data generation and collection operations(filtering and sorting) are run inside Web Workers

Project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
Check it's readme for more details. 

Below you will find some information on how to start / build it  

## Starting application
While being in the app root folder: 

- Install all dependencies
```sh
npm install
```

- Start dev server - command starts dev server and open browser window with app in dev version
```sh
npm start
```

## Building application
If You want to check to optimized version of the app
- Build application
```sh
npm run build
```
- Start local http server. I suggest using  [http-server](https://github.com/indexzero/http-server). Install it globally and type 

```sh
http-server ./build -p 9000
``` 

Provided that the project is has been built it should be running under http://localhost:9000


