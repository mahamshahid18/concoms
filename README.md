# concoms
This project has two components: a frontend part and a very basic and simple backend part. It basically displays a list of (hardcoded through a json file) construction companies and provides functionalities for searching and filtering through these companies. Details about running the project as well as improvements, and a demo (video) are available towards the end of this document.

## Technologies used

### Backend
- Node.js
- Express

### Frontend
- React
- React hooks
- React query
- Material UI v5
- React testing library

## Running the project  
The first thing that you can do before getting into server or frontend specific details is to install all the dependencies. The root folder contains two other folders: one holds all the backend code, and the other one holds all the frontend code.

### Server
Navigate to the project folder titled `server`. And then run `npm i` to install the dependencies. The server does not use any databases so there's no set up needed for that. 

Simply run the following command to spin up an instance of the server:

* `npm start`

And that's it. The server will now be running on `http://localhost:3000`. The service can be queried and tested using POSTMAN or a similar tool. It exposes only one endpoint `GET /companies`: to get the list of companies in JSON.

### Frontend
Navigate to the project folder titled `concoms-frontend`. Run `npm i` to install all the dependencies. Once that is done, go ahead and run the command `npm start` to run the frontend. You can then navigate to `http://localhost:3001/` to access the interface.

## Improvements / Making the app production ready

### Error handling & monitoring
* The server doesn't gracefully handle errors in this implementation. A proper error handling middleware can be written which logs the errors, and gracefully handles them ensuring that the server doesn't go down due to unexpected errors (the server implementation for this project is fairly simple so this might not be needed for that but for more complex situations, this would be useful). 
* The server can be integrated with an error monitoring system (such as Sentry / Datadog) to create error logs which developers can look into to debug problems. This can also be used to create alerts for critical errors and to monitor the health of the services in production.
* The frontend doesn't react to errors. For example, if the server goes down or there are network issues, the frontend does not provide the necessary feedback to the user. This can be improved by handling these cases and providing user friendly errors and feedback where required. As an example, we have error states available from react-query which can be used to display error messages when there are network errors. Similarly, for other specific cases as well, error checks can be done and a unified error message experience can be added.
* For the frontend as well, it can be integrated with a monitoring tool like Sentry to keep track of events and errors. These errors would contain logs or stack trace which can make it easier to debug and fix the problem. Alerts can also be created based on these error logs.

### Changing UI / Theming
The frontend part of the application has been implemented in a way that making changes to small parts of the application or to the UI would not require a major refactor. I tried to keep the UI simple and the implementation also straight-forward yet easy to change. The UI is split into small components where each component is responsible for layout of a specific item (for example, we have a component `CompanyList`  which does the API call and rendering logic and just passes the required data to `CompanyCard`  component to take care of the layout and UI specific details of each block on the list view).
Similarly, for future feature additions, similar principles can be kept in mind to split the UI into smaller, managable components where each component is responsible for one topic. What does one topic mean: we can take a look at the folder structure for this. We have a `modules` folder and each related part of the application is grouped as one module. So, similar parts of the UI can exist together as one module - separated into small components which are easy to understand and modify for the future.  

In this project, there wasn't a need to specify color theming etc. But for a production app, styles and themes can be defined in one central place and can be used in the app. So, if the company is following a design-systems approach and have the brand theme defined, that theme can easily be utilized to make sure UI wise, everything looks consistent and good.

### Accessibility
The project can be made more accessible by adding ARIA attributes to allow people with disabilities or people using screen readers to access the UI more easily

### Backend <=> Frontend case conversion
Currently, the server uses snake_case notation for defining the structure of the response (of the JSON structure for list of companies). The frontend part uses camelCase notation but for handling and accessing the structure of company details (like `company_name`), snake_case is being used on the frontend for ease of use. This situation can be improved by using a middleware which can convert between the two cases on backend and frontend respectively so that both parts of the project can use the case that they need without having to worry about case conversions or trying to access the wrong property (because of wrong case convention being used).

### Pagination / Infinite scroll
Currently, the application does not have any kind of pagination available. Which means that if there are 100 items returned from the server then the frontend waits for those 100 items to load and then the UI becomes available. This would not be ideal as this would slow down the app quite a bit. Therefore, as an improvement - pagination can be implemented on both the frontend and backend parts to improve the performance of the app. Other than pagination, infinite scroll can also be implemented to improve the performance of the frontend.

However, keeping in mind these constraints, I did add some loading and error states to show on the UI that data is being fetched so that UI does not look weird, blank and odd and the user can see something and knows that they have to wait for the data to be fetched.


### Testing
A simple component test is available in the project - which checks for the rendering of the correct icon (inside the Chip component for speciality of a company). Similar approach can be used to test the remaining components. So, the components can be tested for rendering of the correct number of elements (such as 10 items in the CompanyList, checking for 5 items to be present in the filter options). Furthermore, some user interactions can be tested as well. Such as, when the user types specific terms in the search bar, we can test and check that the expected results (of companies) is being rendered.  

Other than the component tests, any utils being used in the project should also be covered with unit tests. For this project, some basic unit tests have been added for the utils being used.

To ensure that the whole app is working, some very basic integration tests can be added (using something like Cypress). What I would do in this case would be to write tests for each page to make sure that all pages are rendering. This would ensure that the app doesn't break even if new changes are made as all the pages would be checked for rendering errors (of course, correctness of the UI and data still needs to be checked using component tests).

### Caching
We are using a json source for getting information about the list of companies within this project. However, in a proper production application, this data should come from the database. Caching can be implemented in this case with some sort of in-memory storage (like Redis) so that the backend does not access the same data multiple times on each GET call (as it could be accessed multiple times each second and without caching, the performance of the server would be slow).

On the frontend side - as we are using react-query, we can cache the API call responses as well (this is already done on frontend). This way, the frontend doesn't request the backend multiple times for the same resource if a cached non-expired response is already available.

### Hosting & scaling
Due to time constraints, I was not able to bring the application in a state where it could easily be deployed on the cloud. But I will write about what approach can be used for doing that.

Both the frontend, as well as the backend parts of this project can be packaged into separate Docker images to containerize them. After this, something like Docker compose can be used to bring together these separate Docker images to start up the whole application together. Once this is done, this containerized version of the app can then be deployed with the use of Kubernetes on different cloud platforms (such as Google Cloud Platform / Amazon AWS for example).

Containerizing could also help with the scaling of the application - if needed - by increasing the number of pods which are hosting our containers and creating more duplicates to make sure services are still running.

## Demo
You can find a demo of the project over here: []()
