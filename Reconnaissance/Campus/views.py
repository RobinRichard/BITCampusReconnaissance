from django.http import HttpResponse
from django.shortcuts import render
from .models import *
import json
# Create your views here.
def login(request):
    return render(request, 'Campus/login.html')

def adminHome(request):
    return render(request, 'Campus/adminhome.html')

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
