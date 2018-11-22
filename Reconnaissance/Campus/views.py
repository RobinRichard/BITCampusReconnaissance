from django.http import HttpResponse,JsonResponse
from django.shortcuts import render
from django.core import serializers
from .models import *
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from . import serializer
import json
import os
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.template.loader import get_template
import qrcode
from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter,A4
from datetime import datetime
try:
    from urllib import unquote
except ImportError:
    from urllib.parse import unquote
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMessage
from django.core.mail import EmailMultiAlternatives

from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.lib.units import inch

#api
class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = serializer.CategorySerializer
    queryset = Category.objects.all()

class SectionViewSet(viewsets.ModelViewSet):
    serializer_class = serializer.SectionSerializer
    queryset = Section.objects.all()

class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = serializer.QuestionSerializer
    queryset = Question.objects.all()

class StatusViewSet(viewsets.ModelViewSet):
    serializer_class = serializer.StatusSerializer
    queryset = Status.objects.all()

def getAnswers(request):
    if request.method == "GET":
        rest_list = ''
        qid = request.GET.get('qid')
        uid = request.GET.get('uid')
        if qid and uid:
            rest_list = Reconnaissance.objects.filter(question_id=qid).filter(user_id=uid)
        ser = serializer.AnswerSerializer(rest_list, many=True)
        return JsonResponse(ser.data, safe=False)

def getGallery(request):
    if request.method == "GET":
        rest_list = Gallery.objects.all()
        ser = serializer.GallerySerializer(rest_list, many=True)
        return JsonResponse(ser.data, safe=False)

def getUserDetails(request):

    if request.method == "GET":
        rest_list = ''
        uid = request.GET.get('uid')

        if uid:
            rest_list = User.objects.filter(id=uid)

        ser = serializer.UserSerializer(rest_list, many=True)
        return JsonResponse(ser.data, safe=False)
def activate(request):
    if request.method == "GET":
        rest_list = ''
        id = request.GET.get('code')
        try:
            u = User.objects.filter(id=id).update(user_status=1)
            return render(request, 'Campus/success.html')
        except:
            return JsonResponse({'message':'Server error'}, safe=False)
            
def addUser(request):
    if request.method == "GET":
        rest_list = ''
        reqtype = request.GET.get('type')

        if reqtype == "check":
            user_mail = request.GET.get('user_mail')
            try:
                u = User.objects.get(user_mail=user_mail)
                return JsonResponse({'status':0,'message':'Mail Id already exist'}, safe=False)
            except User.DoesNotExist:
                return JsonResponse({'status':1,'message':'Unique email'}, safe=False)

        if reqtype == "reg":
            user_name = request.GET.get('user_name')
            user_mail = request.GET.get('user_mail')
            user_password = request.GET.get('user_password')
            user_department = request.GET.get('user_department')
            user_rollno = request.GET.get('user_rollno')
            user_phone = request.GET.get('user_phone')
            user_address = request.GET.get('user_address')
            try:
                user = User.objects.create(user_name = user_name,
                                    user_department=user_department,
                                    user_rollno=user_rollno,
                                    user_mail = user_mail,
                                    user_password = user_password,
                                    user_phone = user_phone,
                                    user_address = user_address,
                                    user_image ='/uploads/user.png',
                                    user_role_id = 2,
                                    user_status_id = 2)
                try:
                    email = EmailMessage("Reconnaissance OTAGO Polytechnic", "Welcome "+ user_name+" please <a href='http://robinrichard.pythonanywhere.com/api/activate?code="+ str(user.id) +"' > click here </a> to activate your account", to=[user_mail])
                    email.content_subtype = "html"
                    email.send()
                    return JsonResponse({'status':1,'user_id':user.id}, safe=False)
                except:
                    return JsonResponse({'status':2,'user_id':user.id,'message':'contact administrator to activate your accounr'}, safe=False)
            except:
                return JsonResponse({'status':0}, safe=False)

@csrf_exempt
def apiUpload(request):
    if request.method == 'POST' and request.FILES['profile']:
        try:
            user_id = request.POST.get('user_id')
            myfile = request.FILES['profile']
            fs = FileSystemStorage()
            filename = fs.save(myfile.name, myfile)
            uploaded_file_url = fs.url(filename)
            user = User.objects.filter(id=user_id).update(
                                user_image=uploaded_file_url)

            return JsonResponse({'status':1}, safe=False)
        except:
            return JsonResponse({'status':0}, safe=False)

def updateAnswer(request):
    if request.method == "GET":
        rest_list = ''
        qid = request.GET.get('qid')
        uid = request.GET.get('uid')
        ans = request.GET.get('ans')
        try:
            r = Reconnaissance.objects.filter(question_id=qid).filter(user_id=uid)
            if r.count() == 0:
                r = Reconnaissance.objects.create(question_id=qid,
                                            user_id=uid,
                                            answer_text=ans,
                                            answer_status_id=3,
                                            answer_date=datetime.now()
                                           )
                return JsonResponse({'status':'Answer added  successfully'}, safe=False)
            else:
                r = Reconnaissance.objects.filter(question_id=qid).filter(user_id=uid).update(answer_text=ans,
                                                                                              answer_status_id=3,answer_date=datetime.now())
                return JsonResponse({'status':'Answers updated successfully'}, safe=False)
        except Reconnaissance.DoesNotExist:
           return JsonResponse({'status':'Failed to save'}, safe=False)

def resetAnswer(request):
    if request.method == "GET":
        rid = request.GET.get('rid')
        try:
            r = Reconnaissance.objects.filter(id=rid).delete()
            return JsonResponse({'status':'Answer deleted  successfully'}, safe=False)
        except:
           return JsonResponse({'status':'Failed to delete'}, safe=False)

def apiQuestions(request):

    if request.method == "GET":
        id = request.GET.get('id')
        rest_list = {}
        cat = Category.objects.all()
        catser = serializer.CategorySerializer(cat, many=True)

        sec = Section.objects.all()
        secser = serializer.SectionSerializer(sec, many=True)

        qus = Question.objects.all()
        qusser = serializer.QuestionSerializer(qus, many=True)

        ans = Reconnaissance.objects.filter(user_id=id)
        ansser = serializer.AnswerSerializer(ans, many=True)

        rest_list['category'] = catser.data
        rest_list['section'] = secser.data
        rest_list['qusetion'] = qusser.data
        rest_list['answers'] = ansser.data

        return JsonResponse(rest_list, safe=False)


def applogin(request):
    if request.method == "GET":
        rest_list = ''
        uname = request.GET.get('uname')
        password = request.GET.get('password')
        if uname and password:
            try:
                u = User.objects.get(user_mail=uname)
                if u.user_password == password:
                    if u.user_status_id == 1:
                        ser = serializer.UserSerializer(u)
                        return JsonResponse({'status':1,'data':ser.data}, safe=False)
                    else:
                        return JsonResponse({'status':2,'data':'Inactive account'}, safe=False)
                else:
                    return JsonResponse({'status':0,'data':'Invalid password'}, safe=False)
            except User.DoesNotExist:
                return JsonResponse({'status':0,'data':'Invalid Access'}, safe=False)

# Create your views here.
def login(request):
    return render(request, 'Campus/login.html')

def adminHome(request):
    return render(request, 'Campus/adminhome.html')

def ListCategory(request):
    return render(request, 'Campus/category.html')

def ListSection(request):
    return render(request, 'Campus/section.html')

def ListQuestion(request):
    return render(request, 'Campus/question.html')

def ListUser(request):
    return render(request, 'Campus/manageuser.html')

def ListReport(request):
    return render(request, 'Campus/report.html')

def ListGallery(request):
    return render(request, 'Campus/imagegallery.html')

def ListDocument(request):
    return render(request, 'Campus/Document.html')


def getType(request):
    response_data = {}
    t = None
    if request.method == 'POST':
        t_id = request.POST.get('type_id')
        try:
            if t_id == "":
                t = Type.objects.all()
            else:
                t = Type.objects.filter(id=t_id)
            response_data['flag'] = "1"
            response_data['result'] = serializers.serialize('json',t)
        except:
            response_data['flag'] = "0"
            response_data['result'] = "Error in getting Date"
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def getRole(request):
    response_data = {}
    r = None
    if request.method == 'POST':
        r_id = request.POST.get('role_id')
        try:
            if r_id == "":
                r = Role.objects.all()
            else:
                r = Role.objects.filter(id=r_id)
            response_data['flag'] = "1"
            response_data['result'] = serializers.serialize('json',r)
        except:
            response_data['flag'] = "0"
            response_data['result'] = "Error in getting Date"
    return HttpResponse(json.dumps(response_data), content_type="application/json")


def checkEmail(request):
    response_data = {}
    if request.method == 'POST':
        email = request.POST.get('email')
        user_id = request.POST.get('id')
        if user_id == '':
            try:
                u = User.objects.get(user_mail=email)
                response_data['flag'] = "0"
                response_data['result'] = "mail already exist"
            except User.DoesNotExist:
                    response_data['flag'] = "1"
                    response_data['result'] = "Unique email"
        else:
            u = User.objects.get(id=user_id)
            if u.user_mail == email:
                response_data['flag'] = "1"
                response_data['result'] = "Unique email"
            else:
                try:
                    u = User.objects.get(user_mail=email)
                    response_data['flag'] = "0"
                    response_data['result'] = "mail already exist"
                except User.DoesNotExist:
                    response_data['flag'] = "1"
                    response_data['result'] = "Unique email"

    return HttpResponse(json.dumps(response_data), content_type="application/json")

def checkLogin(request):
    response_data = {}
    user = None
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
            u = User.objects.get(user_mail=username)
            if u.user_password == password:
                if u.user_status_id == 1:
                       request.session['user_name'] = u.user_name
                       request.session['user_id'] = u.id
                       request.session['user_role'] = u.user_role_id
                       response_data['flag'] = "1"
                       response_data['result'] = u.user_role_id
                else:
                    response_data['flag']="2"
                    response_data['data']='activate your account by clicking thelink send you on email'
            else:
                response_data['flag'] = "0"
                response_data['result'] = "Invalid User Id or Password"
        except User.DoesNotExist:
            response_data['flag'] = "0"
            response_data['result'] = "Invalid User Id or Password"
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def getCategory(request):
    response_data = {}
    c = None
    if request.method == 'POST':
        category_id = request.POST.get('category_id')
        try:
            if category_id == "":
                c = Category.objects.all()
            else:
                c = Category.objects.filter(id=category_id)
            response_data['flag'] = "1"
            response_data['result'] = serializers.serialize('json',c)
        except:
            response_data['flag'] = "0"
            response_data['result'] = "Error in getting Date"
    return HttpResponse(json.dumps(response_data), content_type="application/json")


def categoryAction(request):
    response_data = {}
    if request.method == 'POST':
        c_id = request.POST.get('id')
        c_name = request.POST.get('category_name')
        c_color = request.POST.get('category_color')
        c_icon = request.POST.get('category_icon')
        if c_id == "":
            try:
                c = Category.objects.create(category_name = c_name,
                                            category_color = c_color,
                                            category_icon = c_icon
                                           )
                response_data['flag'] = "1"
                response_data['result'] = "Category saved Successfully"
            except:
                response_data['flag'] = "0"
                response_data['result'] = "Failed to save"
        else:
            try:
                c = Category.objects.filter(id=c_id).update(category_name=c_name,
                                            category_color=c_color,
                                            category_icon = c_icon
                                           )
                response_data['flag'] = "1"
                response_data['result'] = "Category Updated Successfully"
            except:
                response_data['flag'] = "0"
                response_data['result'] = "Failed to Update"

    return HttpResponse(json.dumps(response_data), content_type="application/json")


def getSection(request):
    response_data = {}
    s = None
    if request.method == 'POST':
        s_id = request.POST.get('section_id')
        try:
            if s_id == "":
                s = Section.objects.all().values('id','section_name','category','category__category_name')
            else:
                s = Section.objects.filter(id=s_id).values('id','section_name','category','category__category_name')
            
            ser = serializer.CustomCategorySerializer(s, many=True)
            response_data['flag'] = "1"
            response_data['result'] = ser.data
        except:
            response_data['flag'] = "0"
            response_data['result'] = "Error in getting Date"
    return HttpResponse(json.dumps(response_data), content_type="application/json")


def sectionAction(request):
    response_data = {}
    if request.method == 'POST':
        s_id = request.POST.get('id')
        s_name = request.POST.get('section_name')
        Category_id = request.POST.get('category_id')
        if s_id == "":
            try:
                s = Section.objects.create(section_name = s_name,
                                            category_id = Category_id
                                            )
                response_data['flag'] = "1"
                response_data['result'] = "Section saved Successfully"
            except:
                response_data['flag'] = "0"
                response_data['result'] = "Failed to save"
        else:
            try:
                s = Section.objects.filter(id=s_id).update(section_name = s_name,
                                            category_id = Category_id
                                           )
                response_data['flag'] = "1"
                response_data['result'] = "Section Updated Successfully"
            except:
                response_data['flag'] = "0"
                response_data['result'] = "Failed to Update"

    return HttpResponse(json.dumps(response_data), content_type="application/json")

def getQuestion(request):
    response_data = {}
    s = None
    if request.method == 'POST':
        q_id = request.POST.get('question_id')
        try:
            if q_id == "":
                q = Question.objects.all().values('id','question_text','question_type','question_type__question_type','section__section_name')
                ser = serializer.CustomQuestionSerializer(q, many=True)
                response_data['result'] = ser.data
            else:
                q = Question.objects.filter(id=q_id)
                response_data['result'] = serializers.serialize('json',q)
            response_data['flag'] = "1"
        except:
            response_data['flag'] = "0"
            response_data['result'] = "Error in getting Date"
    return HttpResponse(json.dumps(response_data), content_type="application/json")


def questionAction(request):
    response_data = {}
    if request.method == 'POST':
        q_id = request.POST.get('id')
        question_text = request.POST.get('question_text')
        question_type = request.POST.get('question_type')
        question_validation = request.POST.get('question_validation')
        question_description = request.POST.get('question_description')
        section_id = request.POST.get('section_id')
        if q_id == "":
            try:
                q = Question.objects.create(question_text = question_text,
                                            question_type_id = question_type,
                                            question_validation=question_validation,
                                            question_description=question_description,
                                            section_id=section_id
                                            )
                response_data['flag'] = "1"
                response_data['result'] = "Section saved Successfully"
            except:
                response_data['flag'] = "0"
                response_data['result'] = "Failed to save"
        else:
            try:
                q = Question.objects.filter(id=q_id).update(question_text = question_text,
                                            question_type_id = question_type,
                                            question_validation=question_validation,
                                            question_description=question_description,
                                            section_id=section_id
                                           )
                response_data['flag'] = "1"
                response_data['result'] = "Section Updated Successfully"
            except:
                response_data['flag'] = "0"
                response_data['result'] = "Failed to Update"

    return HttpResponse(json.dumps(response_data), content_type="application/json")

def userAction(request):
    response_data = {}
    if request.method == 'POST':
        user_id = request.POST.get('id')
        user_name = request.POST.get('user_name')
        user_department = request.POST.get('user_department')
        user_rollno = request.POST.get('user_rollno')
        user_mail = request.POST.get('user_mail')
        user_password = request.POST.get('user_password')
        user_phone = request.POST.get('user_phone')
        user_role = request.POST.get('user_role')
        user_address = request.POST.get('user_address')
        hdn_filename = request.POST.get('hdn_filename')
        user_status= request.POST.get('user_status')
        fs = FileSystemStorage()

        if user_id == "":
            uploaded_file_url = '/uploads/user.png'
            if request.FILES['user_profile']:
                myfile = request.FILES['user_profile']
                filename = fs.save(myfile.name, myfile)
                uploaded_file_url = fs.url(filename)
            try:
                user = User.objects.create(user_name = user_name,
                                        user_department=user_department,
                                        user_rollno=user_rollno,
                                        user_mail = user_mail,
                                        user_password = user_password,
                                        user_phone = user_phone,
                                        user_address = user_address,
                                        user_image = uploaded_file_url,
                                        user_role_id = user_role,
                                        user_status_id = user_status)
                response_data['flag'] = "1"
                response_data['result'] = "User saved Successfully"
            except:
                response_data['flag'] = "0"
                response_data['result'] = "Failed to save"
        else:
            uploaded_file_url = hdn_filename
            if hdn_filename =='':
                u = User.objects.get(id=user_id)
                path, filename = os.path.split(u.user_image)
                if fs.exists(filename) and filename!='user.png':
                    fs.delete(filename)
                try:
                    myfile = request.FILES['user_profile']
                    filename = fs.save(myfile.name, myfile)
                    uploaded_file_url = fs.url(filename)
                except:
                    uploaded_file_url='/uploads/user.png'
            try:
                user = User.objects.filter(id=user_id).update(user_name = user_name,
                                           user_department=user_department,
                                           user_rollno=user_rollno,
                                           user_mail = user_mail,
                                           user_password = user_password,
                                           user_phone = user_phone,
                                           user_address = user_address,
                                           user_image = uploaded_file_url,
                                           user_role_id = user_role,
                                            user_status_id = user_status)
                response_data['flag'] = "1"
                response_data['result'] = "User Updated Successfully"
            except:
                response_data['flag'] = "0"
                response_data['result'] = "Failed to Update"
    return HttpResponse(json.dumps(response_data), content_type="application/json")


def getUser(request):
    response_data = {}
    user = None
    if request.method == 'POST':
        id = request.POST.get('user_id')
        if id == "":
            user = User.objects.all().values('id','user_name','user_mail','user_department','user_role__user_role')
            ser = serializer.CustomUserSerializer(user, many=True)
            response_data['result'] = ser.data
        else:
            user = User.objects.filter(id=id)
            response_data['result'] = serializers.serialize('json', user)
        if user.count() == 0:
            response_data['flag'] = "0"
            response_data['result'] = 'No User found'
        else:
            response_data['flag'] = "1"
            

    return HttpResponse(json.dumps(response_data), content_type="application/json")


def getImage(request):
    response_data = {}
    user = None
    if request.method == 'POST':
        id = request.POST.get('Image_id')
        if id == "":
            gallery = Gallery.objects.all()
        else:
            gallery = Gallery.objects.filter(id=id)
        if gallery.count() == 0:
            response_data['flag'] = "0"
            response_data['result'] = 'No Images found'
        else:
            response_data['flag'] = "1"
            response_data['result'] = serializers.serialize('json', gallery)

    return HttpResponse(json.dumps(response_data), content_type="application/json")

def imageAction(request):
    response_data = {}
    if request.method == 'POST':
        image_id = request.POST.get('id')
        image_name = request.POST.get('image_name')
        image_description = request.POST.get('image_description')
        hdn_filename = request.POST.get('hdn_filename')

        fs = FileSystemStorage()

        if image_id == "":
            if request.FILES['image_gallery']:
                myfile = request.FILES['image_gallery']
                filename = fs.save('Gallery/'+myfile.name, myfile)
                uploaded_file_url = fs.url(filename)
            try:
                gallery = Gallery.objects.create(file_name = image_name,
                                        Actual_name=uploaded_file_url,
                                        description = image_description
                                       )
                response_data['flag'] = "1"
                response_data['result'] = "Image saved Successfully"
            except:
                response_data['flag'] = "0"
                response_data['result'] = "Failed to save"
        else:
            if request.FILES['image_gallery']:

                g = Gallery.objects.get(id=image_id)
                path, fname = os.path.split(g.Actual_name)
                if fs.exists(unquote('Gallery/'+fname)):
                    fs.delete(unquote('Gallery/'+fname))
                try:
                    myfile = request.FILES['image_gallery']
                    filename = fs.save('Gallery/'+myfile.name, myfile)
                    uploaded_file_url = fs.url(filename)
                    gallery = Gallery.objects.filter(id=image_id).update(file_name = image_name,
                                            Actual_name=uploaded_file_url,
                                            description = image_description
                                        )
                    response_data['flag'] = "1"
                    response_data['result'] = "Image Updated Successfully"
                except:
                    response_data['flag'] = "0"
                    response_data['result'] = "Failed to Update"

        return HttpResponse(json.dumps(response_data), content_type="application/json")



def getcount(request):
    response_data = {}
    user = None
    if request.method == 'GET':
        id = request.POST.get('user_id')
        if id == "":
            user = User.objects.all()
        else:
            user = User.objects.filter(id=id)
        if user.count() == 0:
            response_data['flag'] = "0"
            response_data['result'] = 'No User found'
        else:
            response_data['flag'] = "1"
            response_data['result'] = serializers.serialize('json', user)

    return HttpResponse(json.dumps(response_data), content_type="application/json")


def getDashboard(request):
    response_data = {}

    user = User.objects.all()
    category = Category.objects.all()
    section = Section.objects.all()
    question = Question.objects.all()
    response_data['flag'] = "1"
    response_data['user'] = user.count()
    response_data['category'] = category.count()
    response_data['section'] = section.count()
    response_data['question'] = question.count()
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def delete(request):
    response_data = {}
    if request.method == 'POST':
        id = request.POST.get('id')
        typename = request.POST.get('type')
        try:
            if typename == "category":
                response_data['action'] = "Category"
                Category.objects.all().filter(id=id).delete()
                response_data['flag'] = "1"

            if typename == "section":
                response_data['action'] = "Section"
                Section.objects.all().filter(id=id).delete()
                response_data['flag'] = "1"

            if typename == "question":
                response_data['action'] = "Question"
                Question.objects.all().filter(id=id).delete()
                response_data['flag'] = "1"

            if typename == "user":
                response_data['action'] = "User"
                User.objects.all().filter(id=id).delete()
                response_data['flag'] = "1"

        except:
            response_data['flag'] = "0"
            response_data['result'] = "Failed to delete"

        return HttpResponse(json.dumps(response_data), content_type="application/json")


def generateQR(request):
     if request.method == 'GET':
        qid = request.GET.get('q_id')
        q = Question.objects.get(id=qid)

        qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L,box_size=10,border=1,)
        qr.add_data(q.question_validation)
        qr.make(fit=True)
        img = qr.make_image()
        img.save('uploads/QR/temp.png')

        doc = SimpleDocTemplate("uploads/QR/somefilename.pdf",pagesize=A4,
                        rightMargin=30,leftMargin=30,
                        topMargin=20,bottomMargin=20)
        styles = getSampleStyleSheet()
        Story = [Spacer(0,0*inch)]
        style = styles["Normal"]
        stylecat = ParagraphStyle('title',alignment=1, fontSize=16) 
        stylesec = ParagraphStyle('Heading1', fontSize=15,alignment=1) 
        stylequs = ParagraphStyle('Heading3',fontSize=13,leading=20) 

        
        p = Paragraph("RECONNAISSANCE", stylecat)
        Story.append(p)
        Story.append(Spacer(1,0.5*inch))
        p = Paragraph('For mobile APP use scan QR code and use web code for web application', stylecat)
        Story.append(p)
        Story.append(Spacer(1,0.5*inch))
        
        p = Paragraph('Question : '+q.question_text, stylequs)
        Story.append(p)
        Story.append(Spacer(1,0.5*inch))

        im = Image('uploads/QR/temp.png', 5*inch, 5*inch)
        Story.append(im)
        Story.append(Spacer(1,0.5*inch))

        p = Paragraph('Web Code : '+q.question_validation, stylesec)
        Story.append(p)
        doc.build(Story)

        fs = FileSystemStorage()
        if fs.exists('QR/temp.png'):
            fs.delete('QR/temp.png')

        fs = FileSystemStorage("uploads/QR")
        with fs.open("somefilename.pdf") as pdf:
            response = HttpResponse(pdf, content_type='application/pdf')
            response['Content-Disposition'] = 'inline; filename="somefilename.pdf"'

        return response



def generatePDF(request):
     if request.method == 'GET':
        uid = request.GET.get('u_id')
        user = User.objects.get(id=uid)
        rec = Reconnaissance.objects.filter(user_id=uid)
        cat = Category.objects.all()
        sec = Section.objects.all()
        qus = Question.objects.all()
        doc = SimpleDocTemplate("uploads/QR/somefilename.pdf",pagesize=A4,
                        rightMargin=30,leftMargin=30,
                        topMargin=20,bottomMargin=20)
        styles = getSampleStyleSheet()
        Story = [Spacer(0,0*inch)]
        style = styles["Normal"]
        stylecat = ParagraphStyle('title',alignment=1, fontSize=16) 
        stylename = ParagraphStyle('title',alignment=1, fontSize=13) 
        stylesec = ParagraphStyle('Heading1', fontSize=15,Color='#fff',leading=25) 
        stylequs = ParagraphStyle('Heading3',fontSize=14, leftIndent = 15,leading=20) 
        styleans = ParagraphStyle('Heading3', fontSize=12,leftIndent = 30,leading=20)

        # im = Image('uploads/logo.png', 2*inch, 1*inch)
        # Story.append(im)
        p = Paragraph("RECONNAISSANCE", stylecat)
        Story.append(p)
        Story.append(Spacer(1,0.2*inch))
        p = Paragraph('Student : '+user.user_name+' ( '+str(user.user_rollno)+' )', stylename)
        Story.append(p)
        Story.append(Spacer(1,0.2*inch))
        qno = 1
        for c in cat:
            categoryName = c.category_name
            bogustext = (categoryName)
            p = Paragraph(bogustext, stylecat)
            Story.append(p)
            Story.append(Spacer(1,0.2*inch))
            for s in sec:
                if s.category_id == c.id:
                    bogustext = ( s.section_name)
                    p = Paragraph(bogustext, stylesec)
                    Story.append(p)
                    Story.append(Spacer(1,0.2*inch))
                    for q in qus:
                        if q.section_id == s.id:
                            bogustext = (str(qno)+'. ' +q.question_text)
                            p = Paragraph(bogustext,stylequs)
                            Story.append(p)
                            Story.append(Spacer(1,0.02*inch))
                            if rec:
                                for r in rec:
                                    answertext=''
                                    if r.question_id == q.id:
                                        answertext = (user.user_name+"'s answer : "+r.answer_text)
                                    else:
                                        answertext = ("Not answered")
                                    p = Paragraph(answertext, styleans)
                                    Story.append(p)
                                    Story.append(Spacer(1,0.2*inch))
                            else:
                                answertext = ("Not answered")
                                p = Paragraph(answertext, styleans)
                                Story.append(p)
                                Story.append(Spacer(1,0.2*inch))
                            qno += 1
        doc.build(Story)

        fs = FileSystemStorage("uploads/QR")
        with fs.open("somefilename.pdf") as pdf:
            response = HttpResponse(pdf, content_type='application/pdf')
            response['Content-Disposition'] = 'inline; filename="somefilename.pdf"'
            return response

