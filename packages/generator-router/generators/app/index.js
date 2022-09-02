'use strict';
const Generator = require('yeoman-generator');
const globby = require('globby');
const yoHelper = require('@jswork/yeoman-generator-helper');
const genp = require('@jswork/generator-prompts');
const prompts = genp(['resource_name']);

module.exports = class extends Generator {
  async prompting() {
    this.props = await this.prompt(prompts);
  }

  writing() {
    const { resource_name } = this.props;

    this.fs.copyTpl(
      globby.sync(this.templatePath(), { dot: true }),
      this.destinationPath('src/modules'),
      { ...this.props, ctx: yoHelper.ctx },
      null,
      {
        processDestinationPath: (filePath) => {
          return filePath.replace('tpls', resource_name);
        },
      }
    );
  }
};
