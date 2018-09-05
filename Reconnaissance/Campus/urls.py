from django.urls import path
from . import views

urlpatterns = [
    path('', views.login, name='loginpage'),
    path('login', views.login, name='login'),
    path('adminHome', views.adminHome, name='adminHome'),
    path('Category', views.ListCategory, name='Category'),
    path('Section', views.ListSection, name='Section'),
    path('Question', views.ListQuestion, name='Question'),
    path('User', views.ListUser, name='User'),
    path('Report', views.ListReport, name='Report'),

    path('ajax/checklogin', views.checkLogin, name='checklogin'),
    path('ajax/checkemail', views.checkEmail, name='checkemail'),

    path('ajax/getCategory', views.getCategory, name='getCategory'),
    path('ajax/categoryaction', views.categoryAction, name='categoryaction'),
    
    path('ajax/getSection', views.getSection, name='getSection'),
    path('ajax/sectionaction', views.sectionAction, name='sectionaction'),

    path('ajax/getType', views.getType, name='getType'),
    path('ajax/getRole', views.getRole, name='getRole'), 
    
    path('ajax/getQuestion', views.getQuestion, name='getQuestion'),
    path('ajax/questionaction', views.questionAction, name='questionaction'),

    path('ajax/getUser', views.getUser, name='getUser'),
    path('ajax/useraction', views.userAction, name='useraction'),
]