var Generator = require("yeoman-generator");
const chalk = require("chalk"); // 让console.log带颜色输出
const yosay = require("yosay");
const mkdirp = require("mkdirp"); // 创建目录
const path = require("path");
module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option("babel"); // This method adds support for a `--babel` flag
  }

  initializing() {
    this.props = {};
  }

  // 接受用户输入
  prompting() {
    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Please input project name:",
        default: "parcel-app-react"
      },
      {
        type: "input",
        name: "description",
        message: "Please input project description:",
        default: "a parcel app based on react"
      },
      {
        type: "input",
        name: "main",
        message: "Main file (index.js):",
        default: "index.js"
      },
      {
        type: "input",
        name: "keywords",
        message: "Package keywords (comma to split)",
        default: "parcel,react,antd"
      },
      {
        type: "input",
        name: "author",
        message: '"Author\'s Name"',
        default: ""
      }
    ];

    return this.prompt(prompts).then(props => {
      this.log(props);
      this.props = props;
    });
  }

  // 创建项目目录
  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(`\nYour generator must be inside a folder named
        ${this.props.name}\n
        I will automatically create this folder.\n`);

      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }
  // 写文件
  writing() {
    // 将templates目录的代码拷贝到目标目录
    // templates目录默认路径是generators/app/templates
    this.log("\nWriting...\n");

    this._writingPackageJSON();
    this._writingREADME();
    this._writingBabelrc();
    this._writingGitignore();
    this._writingSrc();
  }

  _writingSrc() {
    this.fs.copyTpl(this.templatePath("src/*"), this.destinationPath("src/"), {
      name: this.props.name,
      fullName: this.props.fullName,
      author: this.props.author,
      license: this.props.license,
      year: new Date().getFullYear()
    });
  }

  _writingPackageJSON() {
    this.fs.copyTpl(
      this.templatePath("_package.json"),
      this.destinationPath("package.json"),
      {
        name: this.props.name,
        description: this.props.description,
        keywords: this.props.keywords.split(","),
        author: this.props.author
      }
    );
  }

  _writingREADME() {
    this.fs.copyTpl(
      this.templatePath("README.md"),

      this.destinationPath("README.md"),
      {
        name: this.props.name,
        fullName: this.props.fullName,
        description: this.props.description,
        author: this.props.author,
        year: new Date().getFullYear()
      }
    );
  }

  _writingBabelrc() {
    this.fs.copyTpl(
      this.templatePath(".babelrc"),
      this.destinationPath(".babelrc")
    );
  }

  _writingGitignore() {
    this.fs.copyTpl(
      this.templatePath(".gitignore"),
      this.destinationPath(".gitignore")
    );
  }

  // 以下划线_开头的是私有方法
  _writingPackageJSON() {
    // this.fs.copyTpl(from, to, context)
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      {
        name: this.props.name,
        description: this.props.description,
        keywords: this.props.keywords.split(","),
        author: this.props.author
      }
    );
  }

  // 安装依赖
  install() {
    this.log("\nInstall deps...\n");
    this.installDependencies();
  }
};
