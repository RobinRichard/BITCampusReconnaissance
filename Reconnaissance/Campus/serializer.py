from .models import *
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reconnaissance
        fields = "__all__"

class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = "__all__"

class CustomCategorySerializer(serializers.Serializer):
    id = serializers.CharField(max_length=200)
    section_name = serializers.CharField(max_length=200)
    category = serializers.CharField(max_length=200)
    category__category_name = serializers.CharField(max_length=200)

class CustomUserSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=200)
    user_name = serializers.CharField(max_length=200)
    user_mail = serializers.CharField(max_length=200)
    user_department = serializers.CharField(max_length=200)
    user_role__user_role = serializers.CharField(max_length=200)

class CustomQuestionSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=200)
    question_text = serializers.CharField(max_length=200)
    question_type = serializers.CharField(max_length=150)
    question_type__question_type = serializers.CharField(max_length=200)
    section__section_name = serializers.CharField(max_length=200)

   



