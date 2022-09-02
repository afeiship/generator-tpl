#!/usr/bin/env node
const { Command } = require('commander');
const fs = require('fs');
const dirTree = require('directory-tree');

// next packages:
require('@jswork/next');
require('@jswork/next-absolute-package');

const { version } = nx.absolutePackage();
const program = new Command();
const deepEach = (ctx, fn) => {
  if (ctx.children) {
    ctx.children.forEach((item, index) => {
      fn(item, index, ctx);
      if (item.children) deepEach(item, fn);
    });
  }
};

program.version(version);

program
  .option('-c, --cwd <string>', 'Source modules(pages) path.', 'src/modules')
  .option('-p, --pretty', 'If need pretty json file.', false)
  .parse(process.argv);

nx.declare({
  statics: {
    init() {
      const app = new this();
      app.start();
    }
  },
  methods: {
    init() {
      const target = dirTree(`./${program.cwd}`, { attributes: ['type'] });
      this.files = target.children.filter((item) => item.type === 'directory');
      this.nestedFiles = { children: this.files };
    },
    start() {
      const nestedFiles = this.nestedFiles;
      const cwd = program.cwd;
      const pretty = program.pretty;
      const targetFile = `./${cwd}/.routerc.json`;
      // 1. 将类似于 _misc.tsx/_styled.tsx 开头的文件标记为 null，不属于页面模块文件
      deepEach(nestedFiles, (item, index, parent) => {
        if (item.type === 'file') {
          // console.log(item);
          if (item.name.startsWith('_') && !item.name.includes('__init__')) {
            parent.children[index] = null;
          }
        }
      });

      // 2. 结合上面步骤，清理 null 的文件
      deepEach(nestedFiles, (item, index, parent) => {
        if (item && item.type === 'directory' && item.children.length > 0) {
          item.children = item.children.filter((item) => item !== null);
        }
      });

      // 3. 在 files 上添加 routes 信息
      // 给根目录的文件夹添加 routes，因为根目录是文件夹，所以，没有 filepath
      this.files.forEach((item) => {
        item.routerPath = `/${item.name}`;
        item.routerFilePath = null;
        deepEach(item, (item1, idx, parent) => {
          const isFile = item1.type === 'file';
          const isInitFile = isFile && item1.name === '__init__.tsx';
          const isIndexFile = isFile && item1.name === 'index.tsx';
          if (isInitFile) {
            if (!parent.routerFilePath) {
              parent.routerFilePath = item1.path;
              parent.routerPath = parent.name;
              parent.children[idx] = null;
            }
          }

          if (isIndexFile) {
            item1.routerIndex = true;
            item1.routerFilePath = item1.path;
          }

          if (!isIndexFile && !isInitFile) {
            if (isFile) {
              item1.routerFilePath = item1.path;
              item1.routerPath = item1.name.split('.')[0];
            }
          }
        });
      });

      // 5. 清理 children 中的 null
      deepEach(nestedFiles, (item, index, parent) => {
        if (item && item.type === 'directory' && item.children.length > 0) {
          item.children = item.children.filter((item) => item !== null);
        }
      });

      // 6. 去掉 cwd，清理 type/name/path
      deepEach(nestedFiles, (item) => {
        if (item.routerFilePath) {
          item.routerFilePath = item.routerFilePath.slice(cwd.length);
        }
        delete item.type;
        delete item.name;
        delete item.path;
      });

      // 7. 输出内容到目标位置
      const targetFileContent = JSON.stringify(nestedFiles, null, pretty ? 2 : 0);

      fs.writeFileSync(targetFile, targetFileContent);
    }
  }
});
