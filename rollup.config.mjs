import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import fs from 'node:fs';
import { terser } from '@rollup/plugin-terser';

const DEV = true;

export default {
  input: 'src/index.ts',
  output: {
    dir: 'output',
    format: 'es',
    compact: !DEV
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    typescript({ outputToFilesystem: true }),
    html({
      template: (d) => {
        if (fs.existsSync('output/assets')) {
          fs.rmSync('output/assets', { recursive: true });
        }

        fs.mkdirSync('output/assets');

        for (const file of d.files.js) {
          fs.writeFileSync(`output/assets/${file.fileName}`, file.code);
        }

        return [
          `<!DOCTYPE html>`,
          `<html lang="${d.attributes.html.lang}">`,
          `  <head>`,
          `    <meta charset="UTF-8" />`,
          `    <meta http-equiv="X-UA-Compatible" content="IE=edge" />`,
          `    <meta name="viewport" content="width=device-width, initial-scale=1.0" />`,
          `    <title>${d.title}</title>`,
          `  </head>`,
          ``,
          `  <body>`,
          `    <div id="app"></div>`,
          `    <noscript>You need to enable JavaScript to run this app.</noscript>`,
          ...d.files.js.map((f) => `<script type="${d.attributes.script.type}" src="assets/${f.fileName}"></script>`),
          `  </body>`,
          `</html>`
        ].join('\n');
      }
    }),
    ...(DEV ? [] : [terser()])
  ]
};
