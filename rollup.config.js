
import nodeResolve from '@rollup/plugin-node-resolve';





const config = {

  input: 'build/typescript/index.js',

  output: {
    file   : 'build/rollup/index.js',
    format : 'commonjs',
    name   : 'et'
  },

  plugins : [

    nodeResolve({
      mainFields     : ['module', 'main'],
      browser        : true,
      extensions     : [ '.js', '.json', '.ts', '.tsx' ],
      preferBuiltins : false
    })

  ]

};





export default config;
