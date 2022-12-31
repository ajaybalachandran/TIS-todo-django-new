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
    path('todo/listcategory/', catview.ListCategoryView.as_view(), name='todo-cat-list'),
    path('todo/liststatus/', statusview.ListStatusView.as_view(), name='todo-status-list'),
    path('task/<int:id>/details/', views.TaskDetailsView.as_view(), name='todo-details'),
    path('todo/category/add/', catview.CategoryCreateView.as_view(), name='todo-add-new-cat'),
    path('todo/new/', views.CreateNewTaskView.as_view(), name='todo-create-new-task'),
    path('todo/home/', views.NewHomeView.as_view(), name='todo-home'),
    path('todo/home/test/', views.test, name='todo-test'),

    path('task/<int:id>/new_todo/', views.TaskToTodoView.as_view(), name='task-to-todo'),
    path('todo/<int:id>/', views.ChangeTodoStatusView.as_view(), name='todo-change-status'),
    path('todo/<int:id>/add_note/', views.AddTaskNoteView.as_view(), name='todo-add-task-note'),
    path('todo/<str:slug>/details/', views.TodoDetailsView.as_view(), name="todo-todo-details"),
    path('todo/<str:slug>/update/', views.todo_stat_change_view, name="todo-todo-update"),

    path('accounts/login/', views.LoginView.as_view(), name='todo-login'),
    path('logout/', views.signout_view, name='todo-logout')

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
