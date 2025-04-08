const { execSync } = require("child_process");
const inquirer = require("inquirer");

(async () => {
  try {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "releaseType",
        message: "Qual tipo de release você quer fazer?",
        choices: [
          { name: "Patch (0.0.X)", value: "patch" },
          { name: "Minor (0.X.0)", value: "minor" },
          { name: "Major (X.0.0)", value: "major" },
        ],
      },
    ]);

    console.log(`\n📦 Gerando versão com tipo: ${answers.releaseType}...\n`);

    // Executa o comando do standard-version
    execSync(`npx standard-version --release-as ${answers.releaseType}`, {
      stdio: "inherit",
    });

    // Faz push com tags
    execSync(`git push --follow-tags origin main`, {
      stdio: "inherit",
    });

    console.log("\n✅ Versão criada e enviada com sucesso!\n");
  } catch (error) {
    console.error("\n❌ Erro ao realizar o release:", error.message);
  }
})();
