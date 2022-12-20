from django.db import models

# Create your models here.
class Category(models.Model):
    cat_name = models.CharField(max_length=120)
    cat_image = models.ImageField(upload_to='category_images')

    def __str__(self):
        return self.cat_name
