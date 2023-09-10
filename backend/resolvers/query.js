module.exports = {
    project: (_parent, args, { dataSources }) => {
      return dataSources.projectApi.project(args)
    },
    module: (_parent, args, { dataSources }) => {
      return dataSources.projectApi.module(args)
    },
    function: (_parent, args, { dataSources }) => {
      return dataSources.projectApi.function(args)
    },
    line: (_parent, args, { dataSources }) => {
      return dataSources.projectApi.line(args)
    }
  }
  