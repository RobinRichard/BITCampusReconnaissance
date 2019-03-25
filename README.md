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


## Getting Started


```
1. Clone the repo
2. cd BITCampusReconnaissance
```
## To run the django web application (server-side)
```
1.  cd Reconnissance
2.	pip install -r requirements.txt
3.	python manage.py runserver

The server will run on http://127.0.0.1:8000

```
## To run react native app in android device (client-side)
```
1. cd BITCampus (Native mobile application)
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


## Functionalities of the server-side web application
<p>The table below describes the functionalities of various web pages on the server-side web application, which will be used by administrators to populate data, which will then be available for the mobile application (which pulls the data from the database).</p>
<table width="0">
<tbody>
<tr>
<td width="39">
<p><strong>No</strong></p>
</td>
<td width="88">
<p><strong>Page</strong></p>
</td>
<td width="374">
<p><strong>Functionalities</strong></p>
</td>
<td width="85">
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
<td width="374">
<p>In this page the admin user needs to provide their user name and password to authenticate in to the application (e.g. using the&nbsp; credentials provided above)</p>
</td>
<td width="85">
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
<td width="374">
<p>Admin can view the total counts of a) categories, b) sections, c) questions and d) registered users&nbsp;</p>
</td>
<td width="85">
<p>Figure 1b</p>
</td>
</tr>
<tr>
<td width="39">
<p><strong>3</strong></p>
</td>
<td width="88">
<p>Category</p>
</td>
<td width="374">
<p>Admin can view all the list of available categories, edit the category details by clicking on the edit icon given in each record in the table view and can add new category by clicking on the <strong>Add category</strong> button on the right corner of the screen. It will open a pop-up modal and the admin can enter the categories details and save it using the <strong>save </strong>button given at the bottom.</p>
</td>
<td width="85">
<p>Figure 1c</p>
</td>
</tr>
<tr>
<td width="39">
<p><strong>4</strong></p>
</td>
<td width="88">
<p>Section</p>
</td>
<td width="374">
<p>Admin can view all the list of available sections, edit the section details by clicking on the edit icon given with each record in the table view and can add new section by clicking on the <strong>Add section</strong> button on the right corner of the screen. It will open a pop-up modal and the admin can enter the section details and save it using the <strong>save </strong>button given at the bottom.</p>
</td>
<td width="85">
<p>Figure 1d</p>
</td>
</tr>
<tr>
<td width="39">
<p><strong>5</strong></p>
</td>
<td width="88">
<p>Questions</p>
</td>
<td width="374">
<p>Admin can view all the list of available questions, edit the question details by clicking on the edit icon given with each record in the table and can add new question by clicking on the <strong>Add question</strong> button on the right corner of the screen. It will open a pop-up modal and the admin can enter the question details and save it using the <strong>save </strong>button given at the bottom.</p>
</td>
<td width="85">
<p>Figure 1e</p>
</td>
</tr>
<tr>
<td width="39">
<p><strong>6</strong></p>
</td>
<td width="88">
<p>Users</p>
</td>
<td width="374">
<p>Admin can view all the list of available users, edit the user details by clicking on the edit icon given with each record in the table and can add new user by clicking on the <strong>Add user</strong> button on the right corner of the screen. It will open a pop-up modal and the admin can enter the user details and save it using the <strong>save </strong>button given on the bottom.</p>
</td>
<td width="85">
<p>Figure 1f</p>
</td>
</tr>
<tr>
<td width="39">
<p><strong>7</strong></p>
</td>
<td width="88">
<p>PDF report</p>
</td>
<td width="374">
<p>Admin can generate Reconnaissance PDF report for a student by clicking on the download icon given as a part of the student record table. It will open a new browser tab with generated PDF which the admin can save or print based on their choice.</p>
</td>
<td width="85">
<p>Figure 1i</p>
</td>
</tr>
<tr>
<td width="39">
<p><strong>8</strong></p>
</td>
<td width="88">
<p>QR report</p>
</td>
<td width="374">
<p>Admin can generate QR code for the task type questions in this page by clicking on the download icon given for each student record in the table. It will open a new browser tab with generated PDF admin can save or print on their choice.</p>
</td>
<td width="85">
<p>Figure 1j</p>
</td>
</tr>
<tr>
<td width="39">
<p><strong>9</strong></p>
</td>
<td width="88">
<p>Gallery</p>
</td>
<td width="374">
<p>In this page the admin can upload images with descriptions by clicking on the <strong>New Image</strong> button given at the right corner of the screen. This&nbsp; image will then be displayed on mobile application gallery screen of the user.</p>
</td>
<td width="85">
<p>Figure 1k</p>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<p>&nbsp;</p>

## Screenshots

<img src="/Documentaion/django1.PNG" width="800" height="550" />
<br><br>
<img src="/Documentaion/django2.PNG" width="800" height="550" />

<p><strong>Functionalities of the client-side mobile application:</strong></p>
<p>The table below describes the functionalities of various screens in client-side mobile application, which will be used by student to finish the reconnaissance.</p>
<p>&nbsp;</p>
<table width="0">
<tbody>
<tr>
<td width="40">
<p><strong>No</strong></p>
</td>
<td width="94">
<p><strong>Screen</strong></p>
</td>
<td width="452">
<p><strong>Functionalities</strong></p>
</td>
<td width="87">
<p><strong>Snapshots (Figures)</strong></p>
</td>
</tr>
<tr>
<td width="40">
<p><strong>1</strong></p>
</td>
<td width="94">
<p>Registration</p>
</td>
<td width="452">
<p>Students can register by inserting their details in this screen. After successful registration students will receive an email with a link to activate their accounts. Only activated accounts can be logged into.</p>
</td>
<td width="87">
<p>Figure 2a</p>
</td>
</tr>
<tr>
<td width="40">
<p><strong>2</strong></p>
</td>
<td width="94">
<p>Login</p>
</td>
<td width="452">
<p>After the registered account has been activated, the students can use their user name and password to authenticate into the application.</p>
</td>
<td width="87">
<p>Figure 2b</p>
</td>
</tr>
<tr>
<td width="40">
<p><strong>3</strong></p>
</td>
<td width="94">
<p>Home</p>
</td>
<td width="452">
<p>This screen contains some information about the Polytechnic. User can scroll down to read all the details.</p>
</td>
<td width="87">
<p>Figure 2c</p>
</td>
</tr>
<tr>
<td width="40">
<p><strong>4</strong></p>
</td>
<td width="94">
<p>Campus</p>
</td>
<td width="452">
<p>It contains three screens which can be navigated one after another.</p>
<p><strong>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong><strong>Category screen:</strong></p>
<p>In this screen user can view all the categories with question count in that category and count of answered questions. Another progress bar shows how much percentage of questions that user answered in that category. User can then navigate to sections screen which list all the sections in that category by clicking on the category.</p>
<p>&nbsp;</p>
<p><strong>2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong><strong>Section screen:</strong></p>
<p>In this screen the user can view the list of sections under the selected category with a status icon denoting whether all the questions in that section are answered. User can then navigate to reconnaissance screen which contains the questions by clicking on the section.</p>
<p>&nbsp;</p>
<p><strong>3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong><strong>Reconnaissance screen:</strong></p>
<p>In this screen the user can view the questions and can submit their responses. This screen provided three different types of controls for users to submit their answers based on the question type. The three types are:</p>
<p>a)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Text box for the text type question - In this type the user can answer the question (in multiple lines) by giving some text and clicking the submit button to save their answer.</p>
<p>b)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;Link button type of question &ndash; A link button is provided for link type of question, which the user can use to submit their response by clicking on that link. Clicking on the link takes them to a page that provides more information.</p>
<p>c)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A QR reader type question &ndash; A QR reader is provided to scan the QR code. User can find the location of an item or object they are searching and upon finding the location, they scan the QR code pasted in the location to answer this type of question.</p>
<p>This page have a menu icon on the right-hand corner which has two options.</p>
<p>1) <strong>More info</strong> option: to view the description about the question in a pop-up.</p>
<p>2) <strong>Reset answer</strong> option: to reset the user&rsquo;s answer. &nbsp;</p>
<p>&nbsp;</p>
</td>
<td width="87">
<p>Figure 2d(1,2,3)</p>
</td>
</tr>
<tr>
<td width="40">
<p><strong>5</strong></p>
</td>
<td width="94">
<p>Gallery</p>
</td>
<td width="452">
<p>This screen displays some photos of the campus with some descriptions. The details will change based on what the admin adds, modifies or deletes.</p>
</td>
<td width="87">
<p>Figure 2e</p>
</td>
</tr>
<tr>
<td width="40">
<p><strong>6</strong></p>
</td>
<td width="94">
<p>User</p>
</td>
<td width="452">
<p>In this screen, the user can view their details provided at the time of registration. A logout icon provided at the right corner allows the user to logout from this application.</p>
</td>
<td width="87">
<p>Figure 2f</p>
</td>
</tr>
</tbody>
</table>

## Screenshots

<img src="/Documentaion/react.PNG" width="800" height="550" />

## Built With

* [Django](https://docs.djangoproject.com/en/2.1/intro/) - Web framework for python
* [React Native](https://facebook.github.io/react-native/docs/getting-started.html) - Build native mobile apps using JavaScript and React

## App link

[BIT Reconnaissance](https://play.google.com/store/apps/details?id=com.bitcampus&hl=en)

## Author

### Robin Richard Arulanantham 

<!-- ## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details -->



