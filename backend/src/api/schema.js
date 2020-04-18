import fs from 'fs';
import path from 'path';
import glob from 'glob';

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

function loadSchema() {
  return joinSchemas(
    glob
      .sync(path.join(__dirname, '/modules/**/*.graphql'))
      .map((schemaPath) => fs.readFileSync(schemaPath, 'utf8')),
  );
}

const schema = loadSchema();

export default schema;
