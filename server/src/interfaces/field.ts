import { GraphQLOutputType, GraphQLFieldConfigArgumentMap } from 'graphql';

// graphql field interface for create separate fields in each type
export interface Field {
  type: GraphQLOutputType;
  resolve?: (parent: any, args: any) => any;
  args?: GraphQLFieldConfigArgumentMap;
}
