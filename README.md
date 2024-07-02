# Angel

Angel is a web app designed to help you manage your time, activities, finances, and project information efficiently and organized. With Angel, you can create projects that bundle various essential features to enhance your productivity.






## Demo

[ANGEL](https://angeltask.netlify.app/)


## Features

### Time Calculator
- **Time Tracking:** Use a counter to calculate the time spent on a specific activity.
- **Automatic Resumption:** Ability to stop and restart it the next day, taking into account the start and end dates.
  

### Finance Management
- **Recording Income and Expenses:** Keep track of your project finances or your total finances.
- **Total Display:** Shows the updated total of your finances in real-time.

### Password Management
- **Secure Storage:** Save passwords for each account, including those created specifically for the project.
- **Quick Access:** Quickly access your passwords securely.

### Personal Notes
- **Adding Notes:** Add personal notes to remember what to do, jot down ideas, and keep everything organized.
## Getting Started

1. **Register:** Create an account to start using Angel.
2. **Create a Project:** Add a new project and start using the available features.
3. **Use the Features:**
 - Start the timer to track time.
 - Record your finances in the Piggybank.
 - Save your passwords in the dedicated section.
 - Add personal notes to keep track of your ideas and tasks.

## Homepage

The Angel homepage displays all your active projects. From here, you can quickly access the details and specific features of each project, including:

- **Timer:** Track the time dedicated to project activities.
- **Piggybank:** Manage the project's finances.
- **Passwords:** Save and access passwords securely.
- **Posts:** Create and view personal notes.

## Information

Angel was created for educational purposes as a project for Start2Impact and is non-profit. I'm excited to help you achieve your goals with greater efficiency and organization.## Acknowledgements

Thank you for choosing Angelo! I hope my web app can be a useful tool to improve your productivity and organization.

---

**Note:** This project was created solely for educational purposes and is not for profit.

## Run Locally

Clone the project

```bash
  git clone https://github.com/MatteoGranata/ANGEL.git
```

Go to the project directory

```bash
  cd ANGEL
```

Install dependencies

```bash
  cd client
  npm install
  cd ../
  cd server
  npm install
```

Rename the .env.example file to .env and insert inside it the links to your mongodb database, a port (if you start it locally) and the JWT_SECRET

Start the server 

```bash
  cd server
  npm run dev
```

Start the client

```bash
  cd client
  npm run dev
```


## Tech Stack

**Client:** Vue3, TailwindCSS

**Server:** Node, Express


## Authors

- [@MatteoGranata](https://www.github.com/MatteoGranata)

