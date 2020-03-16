import { GraphQLOutputType, GraphQLFieldConfigArgumentMap } from 'graphql';

export interface Resolver {
  type: GraphQLOutputType;
  resolve?: (parent: any, args: any) => any;
  args?: GraphQLFieldConfigArgumentMap;
}
