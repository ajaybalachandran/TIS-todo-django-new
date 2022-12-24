from django.db import models

# Create your models here.
class TaskStatus(models.Model):
    stat_name = models.CharField(max_length=120)
    color_choices = (('lawngreen', 'lawngreen'),
                     ('blue', 'blue'),
                     ('yellow', 'yellow'),
                     ('green', 'green'),
                     ('red', 'red'),
                     ('grey', 'grey'),
                     ('orange', 'orange'),
                     ('pink', 'pink'),
                     ('teal', 'teal'),
                     ('black', 'black'),
                     ('aqua', 'aqua'))
    stat_color = models.CharField(max_length=20, choices=color_choices, unique=True)

    def __str__(self):
        return self.stat_name