from django.db import models
from datetime import datetime

class Role(models.Model):
    user_role = models.CharField(max_length=20)

    def __str__(self):
        return self.user_role

class Type(models.Model):
    question_type = models.CharField(max_length=20)

    def __str__(self):
        return self.question_type

class UserStatus(models.Model):
    user_status = models.CharField(max_length=20)

    def __str__(self):
        return self.user_status

class Status(models.Model):
    answer_status = models.CharField(max_length=20)

    def __str__(self):
        return self.answer_status

class User(models.Model):
    user_name = models.CharField(max_length=50)
    user_department = models.CharField(max_length=100)
    user_rollno = models.IntegerField(default=0)
    user_mail = models.CharField(max_length=50)
    user_password = models.CharField(max_length=50)
    user_phone = models.IntegerField(default=0)
    user_address = models.CharField(max_length=200)
    user_image = models.CharField(max_length=200,default='/uploads/user.png')
    user_role = models.ForeignKey(Role, on_delete=models.CASCADE)
    user_status = models.ForeignKey(UserStatus, on_delete=models.CASCADE,default=1)

    def __str__(self):
        return self.user_name

class Category(models.Model):
    category_name = models.CharField(max_length=100)
    category_color = models.CharField(max_length=10)
    category_icon = models.CharField(max_length=30)

    def __str__(self):
        return self.category_name

class Section(models.Model):
    section_name = models.CharField(max_length=250)
    category = models.ForeignKey(Category,related_name='categories', on_delete=models.CASCADE)

    def __str__(self):
        return self.section_name

class Question(models.Model):
    question_text = models.TextField()
    question_type = models.ForeignKey(Type, on_delete=models.CASCADE)
    question_validation = models.CharField(max_length=250)
    # question_description = models.CharField(max_length=250)
    question_description = models.TextField()
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    def __str__(self):
        return self.question_text

class Reconnaissance(models.Model):
   question = models.ForeignKey(Question, on_delete=models.CASCADE)
   user = models.ForeignKey(User, on_delete=models.CASCADE)
   answer_text = models.TextField()
   answer_status = models.ForeignKey(Status, on_delete=models.CASCADE)
   answer_date = models.DateTimeField(default=datetime.now, blank=True)

class Gallery(models.Model):
    file_name = models.CharField(max_length=200)
    Actual_name = models.CharField(max_length=200)
    description = models.TextField()