from django.contrib import admin
from taskapp.models import Tasks, Todos
# Register your models here.
admin.site.register(Tasks)
admin.site.register(Todos)