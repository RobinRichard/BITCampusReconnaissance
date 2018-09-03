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
    path('ajax/getCategory', views.getCategory, name='getCategory'),
    path('ajax/categoryaction', views.categoryAction, name='categoryaction'),
    path('ajax/getSection', views.getSection, name='getSection'),
    path('ajax/sectionaction', views.sectionAction, name='sectionaction'),
]