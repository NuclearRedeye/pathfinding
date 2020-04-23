import { terser } from 'rollup-plugin-terser';
import { default as copy } from 'rollup-plugin-copy';

export default [
  {
    input: 'dist/debug/index.js',
    output: [
      {
        file: 'dist/release/bundle.min.js',
        format: 'cjs',
        plugins: [terser()]
      }
    ],
    plugins: [
      copy({
        targets: [
          { src: 'clients/*', dest: ['dist/debug', 'dist/release'] }
        ]
      })
    ]
  }
];
