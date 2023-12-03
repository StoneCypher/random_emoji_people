
const fs = require('fs');

const pkg = JSON.parse( fs.readFileSync('package.json') );





fs.writeFileSync('./src/ts/generated_code/version.ts', `
const version    : string = "${pkg.version}",
      build_time : number = ${new Date().getTime()};

export { version, build_time };
`);
