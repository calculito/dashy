Title:
DASHY - one tool which collects and combines the needed different tools for the online classes

Description:
The purpose of the ‘DASHY’ is to collect most of the needed tools for the online classes such as SLACK, SYLLABUS, Calendar tool, Homework and recordings overview. The combination of all that tools in one app should ease the self management of the students to create a convenient and easy-to-use work environment. The system is based on a relational database which is managing the login and the access to the different modules, depending of the user status (persona).

Functionalities:
Users of the system should be able to retrieve needed information from the database. Homeworks, recordings, calendar appointments and even personal links to needed websites will get stored in the database. The system will support three types of user privileges, STUDENTS, INSTRUCTORS and ADMIN. STUDENTS will have access to STUDENTS functions, and the INSTRUCTORS will have access to both STUDENTS and INSTRUCTORS management functions. The ADMIN is the ADMIN. He has access to any function of the programm.
There are 3 kinds of users(persona): students, instructors and admin(s).
The app will have 7 different areas(tabs), 1 logIn button and 1 admin logIn button (LOGO:).
2 of the tabs, ChatONE2ONE and SYLLABUS are accessible without logIn.
Depending of the user rights, after logIn more tabs will get shown.

The STUDENT should be able to do the following functions:
Use the SLACK TAB for communication within Migracode Channel
Use the SYLLABUS TAB for getting the lessons material (read-only)
Use the HOMEWORK TAB to get the information about the homeworks (read-only)
Use the RECORDINGS TAB to view the recordings of the classes (read-only)
Use the CALENDAR TAB to view appointments (read-only)
Use the ChatONE2ONE Tool to initiate or to answer communication
Use the PERSONAL LINKS to collect useful links

The INSTRUCTOR should be able to do the following functions:
Use the SLACK TAB for communication within Migracode Channel
Use the SYLLABUS TAB for getting the lessons material (read-only)
Use the HOMEWORK TAB to write the information about the homeworks
Use the RECORDINGS TAB to link the recordings of the classes
Use the CALENDAR TAB to enter/write appointments
Use the ChatONE2ONE Tool to initiate or to answer communication
Use the PERSONAL LINKS to collect useful links

User Interface:
SITEMAP
Components and user stories
Database:

Changelog:
2020-10-03 transfer to calculito
2020-10-07 tabs clean, books clean
2020-10-10 import central IMPEX.js
2020-10-10 real password, two steps authentification
2020-10-11 password visible in admin, tools in header

ToDo
App: useQuery
ADMIN: create password in database, useQuery for post
Calendar: add appointment time correcting
Chat: clean
Footer: clean
Header: clean
Homeworks: clean code, useQuery
Links: clean
Recordings: clean
Tabs: clean
Tools: clean
CSS: clean code
////////////////////////////////////////////////////////////////////////////////////////////////

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
