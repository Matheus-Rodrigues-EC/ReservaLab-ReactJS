import inquirer from 'inquirer';
import { execSync } from 'child_process';

const { type } = await inquirer.prompt([
  {
    type: 'list',
    name: 'type',
    message: 'Qual tipo de versão deseja subir?',
    choices: [
      { name: 'patch (0.0.x)', value: 'patch' },
      { name: 'minor (0.x.0)', value: 'minor' },
      { name: 'major (x.0.0)', value: 'major' },
    ],
  },
]);

try {
  execSync(`npx standard-version --release-as ${type}`, { stdio: 'inherit' });
} catch (err) {
  console.error('❌ Erro ao realizar o release:', err.message);
}
