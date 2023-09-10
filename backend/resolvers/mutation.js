module.exports = {
    saveproject: (_parent,  args, { dataSources }) => {
      return dataSources.projectApi.saveproject(args)
    },
    removeproject: (_parent, args , { dataSources }) => {
      return dataSources.projectApi.removeproject(args)
    },
    newmodule: (_parent, args , { dataSources }) => {
      return dataSources.projectApi.savemodule(args)
    },
    removemodule: (_parent, args , { dataSources }) => {
      return dataSources.projectApi.removemodule(args)
    },
    newfunction: (_parent, args , { dataSources }) => {
      return dataSources.projectApi.savefunction(args)
    },
    removefunction: (_parent, args , { dataSources }) => {
      return dataSources.projectApi.removefunction(args)
    },
    addline: (_parent, args , { dataSources }) => {
      return dataSources.projectApi.addline(args)
    },
    removeline: (_parent, args , { dataSources }) => {
      return dataSources.projectApi.removeline(args)
    },
  }
  