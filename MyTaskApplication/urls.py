"""MyTaskApplication URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from taskapp import views
from categoryapp import views as catview
from taskstatusapp import views as statusview
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('todo/listcategory/', catview.list_category_view, name='todo-cat-list'),
    path('todo/liststatus/', statusview.list_status_view, name='todo-status-list'),
    path('todo/1/details/', views.task_detail_view, name='todo-details'),
    path('todo/category/add/', catview.category_create_view, name='todo-add-new-cat'),
    path('todo/new/', views.CreateNewTaskView.as_view(), name='todo-create-new-task'),
    path('todo/home/', views.NewHomeView.as_view(), name='todo-home'),
    path('task/<int:id>/new_todo/', views.task_to_todo_view, name='task-to-todo'),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
