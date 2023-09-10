const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
//const { ApolloServerPluginLandingPageDisabled } = require('@apollo/server/plugin/disabled')
const ProjectAPI = require('./datasources/ProjectAPI')
const typeDefs = require('./schema')
const resolvers = require('./resolvers/resolvers')


const server = new ApolloServer({cors: {origin: '*', credentials: true},typeDefs,resolvers })

const start = async () => { 
  const { url } = await startStandaloneServer(server, {
    context: async () => {return { dataSources: { projectApi: new ProjectAPI() } }}
  })
  console.log(`Apollo Server running at ${url}`)
}
start()