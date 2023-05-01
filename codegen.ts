import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://core-api.uk.plain-development.com/graphql/v1/schema.graphql',
  documents: ['./graphql/**/*.gql'],
  generates: {
    './graphql/types.ts': {
      plugins: [
        {
          add: {
            content: '/* THIS FILE IS GENERATED */',
          },
        },
        'typescript',
        'typescript-operations',
        'typed-document-node',
      ],
    },
  },
};

export default config;
