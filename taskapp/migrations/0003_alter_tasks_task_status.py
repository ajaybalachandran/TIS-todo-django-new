# Generated by Django 4.1.4 on 2022-12-20 17:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('taskstatusapp', '0004_alter_taskstatus_stat_color'),
        ('taskapp', '0002_alter_tasks_task_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tasks',
            name='task_status',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='taskstatusapp.taskstatus'),
        ),
    ]
