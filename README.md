# Project exam 2



## Description
I was tasked with creating a frontend application for booking and hosting venues. The project has two main contexts; manager and customer. In addition to this, there is a third interface for users who are not registered. 

* Users
Users who are not registered can browse the app and search for and look at venues. The navigation items are Home, About and Login. If the user tries to book a venue, they are prompted to log in.

* Customers
Upon registering as a customer, the user is allowed access to booking venues. The user is also allowed to update their profile image. A Profile and a Bookings navigation item is added to the header. 

* Managers
Upon registering as a manager, the user has access to all customer functionality, but also gain access to post their own venues. As the primary usecase for managers is assumed to be posting venues, the bookings navigation item is now changed to a venues navigation item. Bookings are still accessible from the profile page, so no functionality is lost. 

### Built with

* React.js
* Bootstrap
* Scss

### Getting started
Clone the repo and run npm install
1. git clone git@https://github.com/Eplepai96/project-exam-2.git
2. npm install

### Running
To run the app, run the following command
npm run start


### Contributing
If you'd like to contribute, please open a pull request so code can be reviewed.


