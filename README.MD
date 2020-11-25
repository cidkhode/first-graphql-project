
# Introduction to GraphQL  

### Brief Overview of Project

Just a brief personal project trying out GraphQL for the first time. Also using Cypress for integration testing followed by Jest and Enzyme for unit testing. The goal of this project was to take in a large data set in CSV format `~` separated and serve it up to a UI which gave the user the capability to filter the amount of data they needed to see, i.e. the age, name, wage, value, etc. of a football player. Goes to show the purpose of using GraphQL because it allows us to filter out unnecessary data and only pick and choose the data that we want to see. Traditional RESTful services don't allow this and often times the UI can't specify what data they're looking for on the client side.  
  
### Tech Stack  
  
The tech stack is as follows:
 - React.JS
 - ApolloGraphQL ApolloServer 
 - ApolloGraphQL ApolloClient
 - Cypress
 - Jest
 - Enzyme

### Setup  

Run these steps sequentially:
- `npm install`
- `npm run server`
- `npm run start`
- To test, run `npm run test`
- To run cypress, run `npm run cypress`