# Task Manager

A task management web app built with **TypeScript**, and **Tailwind CSS**.

> Repository: [Abdelrahmanrefaat20/Task-Manager](https://github.com/Abdelrahmanrefaat20/Task-Manager)

## Tech Stack

- **TypeScript** — the entire codebase is written in TypeScript for type safety (see [TypeScript Configuration](#typescript-configuration) below)
- **Tailwind CSS v4** — utility-first styling (`@tailwindcss/cli`)
- **Font Awesome** — icon set (`@fortawesome/fontawesome-free`)


## Project Structure

```
Task-Manager/
├── src/                # Application source code (.ts / .tsx files)
├── package.json        # Project dependencies and scripts
├── package-lock.json   # Locked dependency versions
└── tsconfig.json       # TypeScript compiler configuration (strict mode)
```

Component files use the `.tsx` extension (TypeScript + JSX), while non-component logic (utilities, types, hooks, etc.) uses plain `.ts` files.

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/Abdelrahmanrefaat20/Task-Manager.git
cd Task-Manager

# Install dependencies
npm install
```

### Running the Project

Check `package.json` for the exact script names available in your local copy (e.g. `dev`, `build`, `start`), then run, for example:

```bash
npm run dev
```

> **Note:** No build/dev scripts were listed in `package.json` at the time this README was generated — add the appropriate script(s) for your build tool (e.g. Vite) and update this section accordingly.

## Features

_This section is a placeholder — add a description of what the app actually does (e.g. create/edit/delete tasks, mark tasks complete, filter/sort, due dates, etc.) as functionality is built out._

- [ ] Create tasks
- [ ] Edit tasks
- [ ] Delete tasks
- [ ] Mark tasks as complete
- [ ] Filter/sort tasks
