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
    this.log(
      yosay(`Welcome to the grand ${chalk.red("parcel-app")} generator!`)
    );
    const prompts = [
      {
        type: "list",
        name: "framework",
        message: "React or Vue?",
        choices: ["React", "Vue"]
      },
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
    const finalPath = path.resolve(
      __dirname,
      `./templates/${this.getProject()}/src/*`
    );
    this.fs.copyTpl(
      this.templatePath(finalPath),
      this.destinationPath("src/"),
      {
        name: this.props.name,
        fullName: this.props.fullName,
        author: this.props.author,
        license: this.props.license,
        year: new Date().getFullYear()
      }
    );
  }

  isReact() {
    return this.props.framework === "React";
  }

  getProject() {
    return this.isReact() ? "react_project" : "vue_project";
  }

  _writingPackageJSON() {
    const finalPath = path.resolve(
      __dirname,
      `./templates/${this.getProject()}/package.json`
    );
    this.fs.copyTpl(
      this.templatePath(finalPath),
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
    const finalPath = path.resolve(
      __dirname,
      `./templates/${this.getProject()}/README.md`
    );
    this.fs.copyTpl(
      this.templatePath(finalPath),
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
    const finalPath = path.resolve(
      __dirname,
      `./templates/${this.getProject()}/.babelrc`
    );
    this.isReact() &&
      this.fs.copyTpl(
        this.templatePath(finalPath),
        this.destinationPath(".babelrc")
      );
  }

  _writingGitignore() {
    const finalPath = path.resolve(
      __dirname,
      `./templates/${this.getProject()}/.gitignore`
    );
    this.isReact() &&
      this.fs.copyTpl(
        this.templatePath(finalPath),
        this.destinationPath(".gitignore")
      );
  }

  // 安装依赖
  install() {
    this.log("\nInstall deps...\n");
    this.installDependencies();
  }
};
