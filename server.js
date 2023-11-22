const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');
// const { ApolloServer } = require('apollo-server-express'); //아폴로 v3에서 v4로 하면서 잠시 주석
const express = require('express');
// const graphqlHTTP = require('express-graphql').graphqlHTTP; //아폴로로 인한 주석처리
const path = require('path');
const {ApolloServer} = require('@apollo/server');
const cors = require('cors');
const {json} = require('body-parser');
const {expressMiddleware} = require('@apollo/server/express4');

// const app = express();

// //graphql-tools 의 load-files 모듈로 해당 프로젝트의 graphql 확장자로 끝나는 모든 파일을 로드한다
// //npm install @graphql-tools/load-files
// const loadedFiles = loadFilesSync("**/*", {
//     extensions:['graphql']
// })

// //loadFilesSync를 통해 분리된 resolver 파일들을 로드한다
// const loadedResolvers = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

// //위에서 로드된 스키마 파일들을 합치기 위해 @graphql-tools를 이용한다
// //npm install @graphql-tools/schema
// const schema = makeExecutableSchema({
//     typeDefs: loadedFiles,
//     resolvers: loadedResolvers
// })


// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     graphiql: true
// }))

// const port = 8080;
// app.listen(port, ()=>{
//     console.log('Running a graphql server');
// })

async function startApolloServer() {
    const app = express();

    //graphql-tools 의 load-files 모듈로 해당 프로젝트의 graphql 확장자로 끝나는 모든 파일을 로드한다
    //npm install @graphql-tools/load-files
    const loadedFiles = loadFilesSync("**/*", {
        extensions:['graphql']
    })

    //loadFilesSync를 통해 분리된 resolver 파일들을 로드한다
    const loadedResolvers = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

    const schema = makeExecutableSchema({
        typeDefs: loadedFiles,
        resolvers: loadedResolvers
    })


    const server = new ApolloServer({
        schema: schema
    })

    await server.start();

    //v4로 마이그레이션 하면서 주석처리
    // server.applyMiddleware({app, path:'/graphql'})

    app.use('/graphql',
        cors(),
        json(),
        expressMiddleware(server, {
            context: async ({req}) => ({token: req.headers.token})
        })
    );


    const port = 8080;

    app.listen(port, () => {
        console.log('Running Apollo graphql server');
    })
}

startApolloServer();