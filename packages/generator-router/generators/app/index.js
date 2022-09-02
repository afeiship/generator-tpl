'use strict';
const Generator = require('yeoman-generator');
const globby = require('globby');
const yoHelper = require('@jswork/yeoman-generator-helper');

module.exports = class extends Generator {
  writing() {
    this.fs.copyTpl(
      globby.sync(this.templatePath('**'), { dot: true }),
      this.destinationPath('src/modules'),
      { ...this.props, ctx: yoHelper.ctx }
    );
  }
};
