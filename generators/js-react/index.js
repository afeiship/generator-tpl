'use strict';
const Generator = require('@jswork/yeoman-generator');
const yosay = require('yosay');
const replace = require('replace-in-file');
const yoHelper = require('@jswork/yeoman-generator-helper');
const genp = require('@jswork/generator-prompts');
const prompts = genp(['project_name', 'description']);

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the stunning $
          "generator-tpl"
         generator!`,
      ),
    );

    this.props = await this.prompt(prompts);
  }

  writing() {
    this.fs.copyTpl(
      this.srcFiles,
      this.destinationPath(),
      { ...this.props, ctx: yoHelper.ctx },
    );
  }

  end() {
    const { description, project_name } = this.props;
    const files = glob.sync(resolve(this.destinationPath(), '{**,.*}'));

    replace.sync({
      files,
      from: [
        /js-react/g,
      ],
      to: [project_name],
    });
  }
};
