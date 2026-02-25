# scavone
VTEX IO Store source code.

## Running the project

### 0. Install extensions

VTEX won't allow linking code that doesn't respect the code patterns describe in ESLint settings. To make sure you don't miss any mistake, install the following extensions in Visal Studio Marketplace:

- ESLint ([dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint))
- Prettier ([esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode))
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

This project comes with local `.vscode` settings that autofixes most of ESLint errors and .editorconfig specifications.

### 1. Login

Now, you have to login to `scavone`

```bash
$ vtex login scavone
```

### 2. Changing workspace

After logging in to the account, you must use another workspace for development, like `dev` for example:

```bash
$ vtex use dev
```

### 3. Setup dependencies

Each app has its own package of dependencies that needs to be installed in order to run the project.
To make this process easier, the following command is dedicated to simply install the `node_modules` of all of them.

```bash
$ yarn setup
```

### 4. Start

To start the project, you can simply run both `store-theme` and `store-components` app using the following command:

```bash
$ yarn start
```

This script is set to execute the `start` scripts of each app, running `vtex link --verbose` and any styles compiler needed.

### 5. Open in browser

Now, in another terminal, you can use the following command to open the corresponding webpage in your current workspace:

```bash
$ vtex browse
```

### All set!

You are ready to code. :)
