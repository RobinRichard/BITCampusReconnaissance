# Generated by Django 2.0.2 on 2018-10-15 23:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Campus', '0003_auto_20180905_1746'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='user_image',
            field=models.CharField(default='/uploads/user.png', max_length=200),
        ),
    ]
