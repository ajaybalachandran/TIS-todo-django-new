# Generated by Django 4.1.4 on 2022-12-31 04:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taskapp', '0008_todos_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todos',
            name='slug',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
