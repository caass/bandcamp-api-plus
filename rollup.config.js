import typescript from 'rollup-plugin-typescript2';
import { main, module, dependencies, peerDependencies } from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: main,
      format: 'cjs',
    },
    {
      file: module,
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(dependencies || {}),
    ...Object.keys(peerDependencies || {}),
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
  ],
};
