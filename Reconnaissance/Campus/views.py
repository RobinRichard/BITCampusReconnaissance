from django.http import HttpResponse,JsonResponse
from django.shortcuts import render
from django.core import serializers
from .models import *
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from . import serializer
import json

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

def apiCategory(request):
   
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
                u= User.objects.filter(user_mail=uname).filter(user_password=password)
                if u.count() != 0:
                    rest_list=u
            except User.DoesNotExist:
                rest_list=None
        ser = serializer.UserSerializer(rest_list, many=True)
        return JsonResponse(ser.data, safe=False)

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
                request.session['user_name'] = u.user_name
                request.session['user_id'] = u.id
                request.session['user_role'] = u.user_role_id
                response_data['flag'] = "1"
                response_data['result'] = u.user_role_id
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
        # try:
        if category_id == "":
            c = Category.objects.all()
        else:
            c = Category.objects.filter(id=category_id)
        response_data['flag'] = "1"
        response_data['result'] = serializers.serialize('json',c)
        # except:
        #     response_data['flag'] = "0"
        #     response_data['result'] = "Error in getting Date"
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
                s = Section.objects.all().select_related('category')
            else:
                s = Section.objects.filter(id=s_id)
            response_data['flag'] = "1"
            response_data['result'] = serializers.serialize('json',s)
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
                q = Question.objects.all().select_related('section')
            else:
                q = Question.objects.filter(id=q_id)
            response_data['flag'] = "1"
            response_data['result'] = serializers.serialize('json',q)
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
        if user_id == "":
            try:
                user = User.objects.create(user_name = user_name,
                                           user_department=user_department,
                                           user_rollno=user_rollno,
                                           user_mail = user_mail,
                                           user_password = user_password,
                                           user_phone = user_phone,
                                           user_address = user_address,
                                           user_role_id = user_role)
                response_data['flag'] = "1"
                response_data['result'] = "User saved Successfully"
            except:
                response_data['flag'] = "0"
                response_data['result'] = "Failed to save"
        else:
            try:
                user = User.objects.filter(id=user_id).update(user_name = user_name,
                                           user_department=user_department,
                                           user_rollno=user_rollno,
                                           user_mail = user_mail,
                                           user_password = user_password,
                                           user_phone = user_phone,
                                           user_address = user_address,
                                           user_role_id = user_role)
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