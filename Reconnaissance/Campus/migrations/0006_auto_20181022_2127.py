# Generated by Django 2.0.3 on 2018-10-22 08:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Campus', '0005_reconnaissance_answer_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='Gallery',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_name', models.CharField(max_length=200)),
                ('Actual_name', models.CharField(max_length=200)),
                ('description', models.TextField()),
            ],
        ),
        migrations.AlterField(
            model_name='question',
            name='question_description',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='question',
            name='section',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Campus.Section'),
        ),
        migrations.AlterField(
            model_name='section',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='categories', to='Campus.Category'),
        ),
    ]
