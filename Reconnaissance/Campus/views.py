from django.http import HttpResponse
from django.shortcuts import render
from django.core import serializers
from django.db.models import Prefetch
from .models import *
import json
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
    return render(request, 'Campus/user.html')

def ListReport(request):
    return render(request, 'Campus/report.html')



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
        if c_id == "":
            try:
                c = Category.objects.create(category_name = c_name,
                                            category_color = c_color
                                           )
                response_data['flag'] = "1"
                response_data['result'] = "Category saved Successfully"
            except:
                response_data['flag'] = "0"
                response_data['result'] = "Failed to save"
        else:
            try:
                c = Category.objects.filter(id=c_id).update(category_name=c_name,
                                            category_color=c_color
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
        # try:
        if s_id == "":
            s = Section.objects.all()
            c = s.category_set.all()
        else:
            s = Section.objects.filter(id=s_id).prefetch_related()
        response_data['flag'] = "1"
        response_data['result'] = serializers.serialize('json',s)
        # except:
        #     response_data['flag'] = "0"
        #     response_data['result'] = "Error in getting Date"
    return HttpResponse(json.dumps(response_data), content_type="application/json")


def sectionAction(request):
    response_data = {}
    if request.method == 'POST':
        s_id = request.POST.get('id')
        s_name = request.POST.get('section_name')
        Category_id = request.POST.get('category_id')
        if c_id == "":
            try:
                s = Section.objects.create(section_name = s_name,
                                            Category_id = Category_id
                                           )
                response_data['flag'] = "1"
                response_data['result'] = "Section saved Successfully"
            except:
                response_data['flag'] = "0"
                response_data['result'] = "Failed to save"
        else:
            try:
                s = Section.objects.filter(id=s_id).update(section_name = s_name,
                                            Category_id = Category_id
                                           )
                response_data['flag'] = "1"
                response_data['result'] = "Section Updated Successfully"
            except:
                response_data['flag'] = "0"
                response_data['result'] = "Failed to Update"
                
    return HttpResponse(json.dumps(response_data), content_type="application/json")
    
