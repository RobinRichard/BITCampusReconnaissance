from django.urls import path,include
from . import views
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()

router.register('categoryList', views.CategoryViewSet)
router.register('sectionList', views.SectionViewSet)
router.register('questionList', views.QuestionViewSet)
router.register('statusList', views.StatusViewSet)

urlpatterns = [
    path('', views.login, name='loginpage'),
    path('login', views.login, name='login'),
    path('adminHome', views.adminHome, name='adminHome'),
    path('Category', views.ListCategory, name='Category'),
    path('Section', views.ListSection, name='Section'),
    path('Question', views.ListQuestion, name='Question'),
    path('User', views.ListUser, name='User'),
    path('Report', views.ListReport, name='Report'),
    path('Gallery', views.ListGallery, name='Gallery'),
     path('Document', views.ListDocument, name='Document'),

    path('ajax/checklogin', views.checkLogin, name='checklogin'),
    path('ajax/checkemail', views.checkEmail, name='checkemail'),

     path('ajax/getDashboard', views.getDashboard, name='getDashboard'),

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
    path('ajax/generateQR', views.generateQR, name='generateQR'),
    path('ajax/generatePDF', views.generatePDF, name='generatePDF'),
    
    path('ajax/getImage', views.getImage, name='getImage'),
    path('ajax/imageAction', views.imageAction, name='imageAction'),
    path('ajax/delete', views.delete, name='delete'),
    
    
    path('api/getAnswers', views.getAnswers, name='getAnswers'),
    path('api/applogin', views.applogin, name='applogin'),
    path('api/getQuestions', views.apiQuestions, name='apiQuestions'),
    path('api/updateAnswer', views.updateAnswer, name='updateAnswer'),
    path('api/resetAnswer', views.resetAnswer, name='resetAnswer'),
    path('api/getUserDetails', views.getUserDetails, name='getUserDetails'),
    path('api/getGallery', views.getGallery, name='getGallery'),
    path('api/addUser', views.addUser, name='addUser'),
    path('api/apiUpload', views.apiUpload, name='apiUpload'),
    path('api/activate', views.activate, name='activate'),
    
   
    
    path('restApi/', include(router.urls))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)