import fs from 'fs';
import path from 'path';

const baseSchema = `
    type Query {
        _: String
    }
    type Mutation {
        _: String
    }
`;

function joinSchemas(...schemas) {
  return [baseSchema, ...schemas].join('\n');
}

const querySchema = fs.readFileSync(path.join(__dirname, '/modules/user/user.graphql'), 'utf8');
const schema = joinSchemas(querySchema);

export default schema;
