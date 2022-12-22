from django.db import models
from categoryapp.models import Category
from taskstatusapp.models import TaskStatus

# Create your models here.
class Tasks(models.Model):
    task_name = models.CharField(max_length=120)
    description = models.CharField(max_length=500)
    task_category = models.ForeignKey(Category, on_delete=models.CASCADE)
    task_image = models.ImageField(upload_to='task_images')
    task_status = models.ForeignKey(TaskStatus, on_delete=models.CASCADE)
    needed_time = models.DateField()
    added_date = models.DateField(null=True, blank=True, auto_now_add=True)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.task_name

class Todos(models.Model):
    todo_task = models.ForeignKey(Tasks, on_delete=models.CASCADE, related_name='new_todo')

    def __str__(self):
        return self.todo_task
