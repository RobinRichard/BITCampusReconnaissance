# BITCampusReconnaissance

This project aims to provide a user-friendly mobile application to digitize the traditional way of filling forms using pen and paper. Every year BIT asks the newly enrolled students to fill a
paper form containing questions about the polytechnic campus. The objective of this form is
to make sure that every student knows all the important information about the campus.
I developed a mobile application which makes the students to fill the same form in digital
format. Anyone can easily download the mobile application and register with their email
address and can fill the Reconnaissance form easily.
There are two different parts in this project – a web application and a mobile application.

##1. Web application
Using this application, the administrator can add questions for the
reconnaissance form and can generate the reports in PDF format that contains all the
submitted responses of the students for those questions. This web application also
provides APIs for the mobile application for accessing data relevant to the user in the
database.
##2. Mobile application 
This is the application that will be used by the Polytechnic
students. It fetches the questions from the database using the APIs provided by the
web application and displays them in a well-designed user interface screen of the
mobile application. The students provide answers to these questions which are
recorded in the database.

## Screenshots

<img src="/screenshot/screenshot.PNG" width="800" height="550" />

## Getting Started


```
1. Clone the repo
2. cd HappyMoose
```
## To run the django server
```
1. cd happyMoose (Django web application)
2. pip install -r requirements.txt
3. python manage.py runserver
```
## To run react native app in android emulator
```
1. cd Moose (Native mobile application)
2. npm install
3. react-native run-android
```
## Dependencies

```
    native-base
    prop-types
    react-native-camera
    react-native-elements
    react-native-image-picker
    react-native-image-slider,
    react-native-linear-gradient
    react-native-menu
    react-native-modal
    react-native-parallax-scroll-view
    react-native-qrcode-scanner
    react-native-router-flux
    react-native-scrollable-tab-view
    react-native-stager
    react-native-swiper
    react-native-underline-tabbar
    react-native-vector-icons
    react-navigation
    rn-fetch-blob
    tcomb-form-native
```


## Getting started

<table width="0">
<tbody>
<tr>
<td width="39">
<p><strong>No</strong></p>
</td>
<td width="88">
<p><strong>Page</strong></p>
</td>
<td width="336">
<p><strong>Functionalities</strong></p>
</td>
<td width="123">
<p><strong>Snapshots (Figures)</strong></p>
</td>
</tr>
<tr>
<td width="39">
<p><strong>1</strong></p>
</td>
<td width="88">
<p>Login</p>
</td>
<td width="336">
<p>In this page the admin user needs to provide their user name and password to authenticate in to the application (e.g. using the&nbsp; credentials provided above)</p>
</td>
<td width="123">
<p>Figure 1a</p>
</td>
</tr>
<tr>
<td width="39">
<p><strong>2</strong></p>
</td>
<td width="88">
<p>Dashboard</p>
</td>
<td width="336">
<p>Admin can view the total counts of a) categories, b) sections, c) questions and d) registered users&nbsp;</p>
</td>
<td width="123">
<p>&nbsp;</p>
</td>
</tr>
<tr>
<td width="39">
<p><strong>3</strong></p>
</td>
<td width="88">
<p>Category</p>
</td>
<td width="336">
<p>Admin can view all the list of available categories, edit the category details by clicking on the edit icon given in each record in the table view and can add new category by clicking on the <strong>Add category</strong> button on the right corner of the screen. It will open a pop-up modal and the admin can enter the categories details and save it using the <strong>save </strong>button given at the bottom.</p>
</td>
<td width="123">
<p>&nbsp;</p>
</td>
</tr>
<tr>
<td width="39">
<p><strong>4</strong></p>
</td>
<td width="88">
<p>Section</p>
</td>
<td width="336">
<p>Admin can view all the list of available sections, edit the section details by clicking on the edit icon given with each record in the table view and can add new section by clicking on the <strong>Add section</strong> button on the right corner of the screen. It will open a pop-up modal and the admin can enter the section details and save it using the <strong>save </strong>button given at the bottom.</p>
</td>
<td width="123">
<p>&nbsp;</p>
</td>
</tr>
<tr>
<td width="39">
<p><strong>5</strong></p>
</td>
<td width="88">
<p>Questions</p>
</td>
<td width="336">
<p>Admin can view all the list of available questions, edit the question details by clicking on the edit icon given with each record in the table and can add new question by clicking on the <strong>Add question</strong> button on the right corner of the screen. It will open a pop-up modal and the admin can enter the question details and save it using the <strong>save </strong>button given at the bottom.</p>
</td>
<td width="123">
<p>&nbsp;</p>
</td>
</tr>
<tr>
<td width="39">
<p><strong>6</strong></p>
</td>
<td width="88">
<p>Users</p>
</td>
<td width="336">
<p>Admin can view all the list of available users, edit the user details by clicking on the edit icon given with each record in the table and can add new user by clicking on the <strong>Add user</strong> button on the right corner of the screen. It will open a pop-up modal and the admin can enter the user details and save it using the <strong>save </strong>button given on the bottom.</p>
</td>
<td width="123">
<p>&nbsp;</p>
</td>
</tr>
<tr>
<td width="39">
<p><strong>7</strong></p>
</td>
<td width="88">
<p>PDF report</p>
</td>
<td width="336">
<p>Admin can generate Reconnaissance PDF report for a student by clicking on the download icon given as a part of the student record table. It will open a new browser tab with generated PDF which the admin can save or print based on their choice.</p>
</td>
<td width="123">
<p>&nbsp;</p>
</td>
</tr>
<tr>
<td width="39">
<p><strong>8</strong></p>
</td>
<td width="88">
<p>QR report</p>
</td>
<td width="336">
<p>Admin can generate QR code for the task type questions in this page by clicking on the download icon given for each student record in the table. It will open a new browser tab with generated PDF admin can save or print on their choice.</p>
</td>
<td width="123">
<p>&nbsp;</p>
</td>
</tr>
<tr>
<td width="39">
<p><strong>9</strong></p>
</td>
<td width="88">
<p>Gallery</p>
</td>
<td width="336">
<p>In this page the admin can upload images with descriptions by clicking on the <strong>New Image</strong> button given at the right corner of the screen. This&nbsp; image will then be displayed on mobile application gallery screen of the user.</p>
</td>
<td width="123">
<p>&nbsp;</p>
</td>
</tr>
</tbody>
</table>
## Built With

* [Django](https://docs.djangoproject.com/en/2.1/intro/) - Web framework for python
* [React Native](https://facebook.github.io/react-native/docs/getting-started.html) - Build native mobile apps using JavaScript and React

## Author

### Robin Richard Arulanantham 

<!-- ## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details -->



