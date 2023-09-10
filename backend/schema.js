module.exports = `#graphql

type Query {
  project(_id: ID): [Project]
  module(project_id: ID, module_id: ID): [Module]
  function(module_id: ID, function_id: ID): [Function]
  line(module_id: ID, line_id: ID): [Line]
}

type Mutation {
  saveproject(_id: ID, title: String, modules: [ID]): Project
  removeproject(_id: ID!): Project
  newmodule(project_id: ID!, name: String!): Module
  removemodule(_id: ID): Module
  newfunction(module: ID!, name: String!, loc: VectorInput!, content: String): Function
  removefunction(_id: ID): Function
  addline(module: ID!, start: VectorInput!, end: VectorInput!): Line
  removeline(_id: ID!): Line
}

type Project {
  id: ID!
  title: String!
  modules: [ID!]
}

type Module {
  id: ID
  name: String
  project: ID
  functions: [ID]
}

type Function {
  id: ID
  name: String
  loc: vector
  module: ID
  content: String
}

type Line {
  id: ID
  module: ID
  start: vector
  end: vector
}

input FunctionInput {
  id: ID!
  name: String!
  loc: VectorInput!
  module: ID!
  content: String
}

input ModuleInput {
  id: ID!
  name: String!
  functions: [ID!]
}

type vector {
  x: Int
  y: Int
}

input VectorInput {
  x: Int
  y: Int
}
`