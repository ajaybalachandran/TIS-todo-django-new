from django.shortcuts import render, redirect
from django.views.generic import View
from taskapp.models import Tasks
from categoryapp.models import Category
from taskstatusapp.models import TaskStatus
# Create your views here.

def task_detail_view(request):
    return render(request, 'taskdetails.html')

# def new_task_view(request):
#     return render(request, 'newtask.html')
# def new_home_view(request):
#     return render(request, 'home.html')

class CreateNewTaskView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'newtask.html')

    def post(self, request, *args, **kwargs):
        task_name = request.POST.get('title')
        description = request.POST.get('desc')
        cats = request.POST.get('cat')
        task_category = Category.objects.get(cat_name=cats)
        task_image = request.FILES['task_img']
        task_status = TaskStatus.objects.get(stat_color='no_color')
        needed_time = request.POST.get('avail_time')
        Tasks.objects.create(task_name=task_name, description=description,
                             task_category=task_category, task_image=task_image,
                             task_status=task_status,
                             needed_time=needed_time)
        return redirect('todo-home')


class NewHomeView(CreateNewTaskView):
    def get(self, request, *args, **kwargs):
        # pending_id = TaskStatus.objects.get(stat_name='pending')
        new_tasks = Tasks.objects.filter(is_active=False)
        new_todos = Tasks.objects.filter(is_active=True)
        if new_tasks or new_todos:
            return render(request, 'home.html', {'pending_tasks': new_tasks, 'todos': new_todos})
        else:
            return render(request, 'home.html')

def task_to_todo_view(request, *args, **kwargs):
    id = kwargs.get('id')
    print(id)
    return redirect('todo-home')

















