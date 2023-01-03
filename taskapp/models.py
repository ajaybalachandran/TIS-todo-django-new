from django.db import models
from categoryapp.models import Category
from taskstatusapp.models import TaskStatus
from django .template.defaultfilters import slugify
from autoslug import AutoSlugField
from django.db.models.signals import pre_save
import string

# Create your models here.
class Tasks(models.Model):
    task_name = models.CharField(max_length=120)
    description = models.CharField(max_length=500)
    task_category = models.ForeignKey(Category, on_delete=models.CASCADE)
    task_image = models.ImageField(upload_to='task_images')
    # task_status = models.ForeignKey(TaskStatus, on_delete=models.CASCADE)
    needed_time = models.DateField()
    added_date = models.DateField(null=True, blank=True, auto_now_add=True)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.task_name


class Todos(models.Model):
    todo_task = models.ForeignKey(Tasks, on_delete=models.CASCADE, related_name='new_todo')
    todo_status = models.ForeignKey(TaskStatus, on_delete=models.CASCADE,
                                    null=True, blank=True, related_name='todo_stat_info')
    todo_note = models.CharField(max_length=10000, null=True, blank=True)
    slug = models.SlugField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return self.todo_task.task_name

    # def save(self, *args, **kwargs):
    #     if not self.slug:
    #         self.slug = slugify(self.todo_task.task_name + "-" + str(self.todo_task.added_date))
    #         return super().save(*args, **kwargs)


def slug_generator(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = instance.todo_task.task_name + "-" + str(instance.todo_task.added_date)


pre_save.connect(slug_generator, sender=Todos)
