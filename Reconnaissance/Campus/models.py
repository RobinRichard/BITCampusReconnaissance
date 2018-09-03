from django.db import models
import datetime

class Role(models.Model):
    user_role = models.CharField(max_length=20)

    def __str__(self):
        return self.user_role

class Type(models.Model):
    question_type = models.CharField(max_length=20)

    def __str__(self):
        return self.question_type

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
    user_role = models.ForeignKey(Role, on_delete=models.CASCADE)

    def __str__(self):
        return self.user_name

class Category(models.Model):
    category_name = models.CharField(max_length=100)
    category_color = models.CharField(max_length=10)

    def __str__(self):
        return self.category_name

class Section(models.Model):
    section_name = models.CharField(max_length=250)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,related_name='sectionCategory')

    def __str__(self):
        return self.section_name

class Question(models.Model):
    question_text = models.TextField()
    question_type = models.ForeignKey(Type, on_delete=models.CASCADE)
    question_validation = models.CharField(max_length=250)
    question_description = models.CharField(max_length=250)

    def __str__(self):
        return self.question_text

class Reconnaissance(models.Model):
   question = models.ForeignKey(Question, on_delete=models.CASCADE)
   user = models.ForeignKey(User, on_delete=models.CASCADE)
   answer_text = models.TextField()
   answer_status = models.ForeignKey(Status, on_delete=models.CASCADE)