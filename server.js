const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const path = require('path');

const app = express();

//graphql-tools 의 load-files 모듈로 해당 프로젝트의 graphql 확장자로 끝나는 모든 파일을 로드한다
//npm install @graphql-tools/load-files
const loadedFiles = loadFilesSync("**/*", {
    extensions:['graphql']
})

//loadFilesSync를 통해 분리된 resolver 파일들을 로드한다
const loadedResolvers = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

//위에서 로드된 스키마 파일들을 합치기 위해 @graphql-tools를 이용한다
//npm install @graphql-tools/schema
const schema = makeExecutableSchema({
    typeDefs: loadedFiles,
    resolvers: loadedResolvers
})


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

const port = 8080;
app.listen(port, ()=>{
    console.log('Running a graphql server');
})