from django.db import models

# Create your models here.
class TaskStatus(models.Model):
    stat_name = models.CharField(max_length=120)
    color_choices = (('grey', 'grey'),
                     ('orange', 'orange'))
    stat_color = models.CharField(max_length=20, choices=color_choices)

    def __str__(self):
        return self.stat_name