# Awesome Project Build with Sequelize

Steps to run this project:

1. Run `node server.js` command
2. graphiql : http://localhost:port/graphql


# Express Graphql 서버 생성하기
    필요 모듈 설치: npm install express express-graphql graphql --save

    graphql 모듈을 통해 쿼리 스키마 생성

    express-graphql 에서 제공하는 graphqlHTTP를 통해 서버 생성

# Graphiql 사용해보기
    graphql 을 로컬통해 테스트를 할 수 있는 환경을 제공해준다

    graphqlHTTP의 프로퍼티에 graphiql:true를 추가한다

    서버 시작후 localhost:포트/graphql 로 접속하면 된다

# 스키마 작성 및 GraphQL Tools 이용해보기
    graphql-tools란 스키마들을 모듈별로 파일로 분리해놓으면 다시 하나로 모아주는 도구이다

    npm install @graphql-tools/schema

    post와 comment 스키마를 작성한다

    npm install @graphql-tools/load-files

    loadFileSync를 통해 분리해 놓은 스키마들을 모두 로드한다 

    makeExcutableSchema 함수를 통해 로드된 스키마들을 합친다

# Resolver
    스키마의 단일 필드에 대한 데이터를 채우는 역할을 한다. 백엔드 데이터베이스 또는 타사 api에서 데이터를 가져오는 것과 같이 원하는대로 
    정의한 방식으로 데이터를 채울 수 있다.

     (parent, args, context, info)

     parent: 필드의 부모에 대한 resolver의 반환값

     args: 필드에 제공된 모든 graphql 인수를 포함하는 객체

     context: 특정작업에 대해 실행중인 모든 resolver간에 공유되는 object이다. 인증정보, 데이터로더 인스턴스 및 리졸버에서 추적할 기타 항목을
     포함하여 작업별 상태를 공유하는 데 사용한다.

     info : 필드 이름, 루트에서 필드까지의 경로 등을 포함해 작업의 실행 상태에 대한 정보를 포함하고 있다.

     resolver 함수에서 비동기 처리 : aync(parent) => {.... await} , 명시적으로 프라미스로 반환도 가능

# Resolver 모듈화 하기
    posts.resolvers.js 와 comments.reslovers.js 파일 생성

    loadFilesSync를 통해 분리된 리졸버들 로드한다

    로직을 model 부분에 함수로 만들어 사용한다

# 필터링 기능 추가하기
    쿼리에 필터용 스키마 추가 -> 모델에 함수 생성 -> 리졸버에서 함수 호출 리턴

# ID로 데이터 가져오기
    post Id를 이용해 post 데이터 가져오기

    해당 작업 위한 쿼리에 스키마 추가 ->  모델에 함수 생성 -> 리졸버에서 함수 호출 리턴











