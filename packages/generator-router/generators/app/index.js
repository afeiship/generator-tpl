'use strict';
const Generator = require('yeoman-generator');
const globby = require('globby');
const yoHelper = require('@jswork/yeoman-generator-helper');

module.exports = class extends Generator {
  constructor(args, options, features) {
    super(args, options, features);
    this.argument('routes_dir', { type: String, default: 'src/modules/admin' });
    this.argument('resource', { type: String, default: 'users' });
  }

  writing() {
    const { routes_dir, resource } = this.options;

    this.fs.copyTpl(
      globby.sync(this.templatePath(), { dot: true }),
      this.destinationPath(routes_dir),
      { ctx: yoHelper.ctx, resource },
      null,
      {
        processDestinationPath: (filePath) => {
          return filePath.replace('tpls', resource);
        },
      }
    );
  }
};
