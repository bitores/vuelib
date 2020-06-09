const path = require('path')
const {
  sortDependencies,
  installDependencies,
  printMessage
} = require('./utils')

module.exports = {
  helpers: {
    'raw-helper': function (options) {
      return options.fn()
    },
    'to_hump': function(v) {
      return v.replace(/\_(\w)/g, function(all, letter){
        return letter.toUpperCase();
      }).replace(/(^[a-z])/g, function(all, letter){
        return letter.toUpperCase();
      })
    }
  },
  prompts: {
    name: {
      type: 'string',
      required: true,
      default: 'vuelib',
      message: 'Project name'
    },
    description: {
      type: 'string',
      required: true,
      label: 'Project description',
      default: 'A Vue Library project with Vue.js'
    },
    author: {
      type: 'string',
      label: 'Author'
    },
    autoInstall: {
      type: 'list',
      message:
        'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [
        { name: 'Yes, use NPM', value: 'npm', short: 'npm' },
        { name: 'Yes, use Yarn', value: 'yarn', short: 'yarn' },
        { name: 'No, I will handle that myself', value: false, short: 'no' }
      ]
    }
  },
  filters: {
    'node_modules/**': 'false',
    'dist/**': 'false',
  },
  complete: function (data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  }
}
