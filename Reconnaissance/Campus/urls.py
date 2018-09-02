from django.urls import path
from . import views

urlpatterns = [
    path('', views.login, name='loginpage'),
    path('login', views.login, name='login'),
    path('adminHome', views.adminHome, name='adminHome'),


    path('ajax/checklogin', views.checkLogin, name='checklogin'),
]