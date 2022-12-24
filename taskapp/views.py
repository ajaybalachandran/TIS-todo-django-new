import json

from django.shortcuts import render, redirect
from django.views.generic import View
from taskapp.models import Tasks
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from categoryapp.models import Category
from taskstatusapp.models import TaskStatus
from taskapp.models import Todos
from django.http import JsonResponse
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
        print(request.POST)

        task_name = request.POST.get('task_name')
        description = request.POST.get('description')
        cats = request.POST.get('cats')
        task_category = Category.objects.get(cat_name=cats)
        task_image = request.FILES.get('file')
        # task_status = TaskStatus.objects.get(stat_color='no_color')
        needed_time = request.POST.get('needed_time')
        print(task_name, description, task_category, task_image,  needed_time)
        # fss = FileSystemStorage()
        # filename = fss.save(task_image.name, task_image)
        # url = fss.url(filename)
        # print(task_image.name)

        Tasks.objects.create(task_name=task_name, description=description,
                             task_category=task_category, task_image=task_image,
                             needed_time=needed_time)


        # print(request.POST)
        # task_name = request.POST['task_name']
        # description = request.POST['description']
        # cats = request.POST['cats']
        # task_category = Category.objects.get(cat_name=cats)
        # task_image = request.FILES['task_img']
        # task_image = request.POST['task_image']
        # task_status = TaskStatus.objects.get(stat_color='no_color')
        # needed_time = request.POST['needed_time']

        # Tasks.objects.create(task_name=task_name, description=description,
        #                      task_category=task_category, task_image=task_image,
        #                      task_status=task_status,
        #                      needed_time=needed_time)
        return redirect('todo-home')


class NewHomeView(CreateNewTaskView):
    def get(self, request, *args, **kwargs):
        # pending_id = TaskStatus.objects.get(stat_name='pending')
        new_tasks = Tasks.objects.filter(is_active=False).order_by('id').values()
        # new_todos = Tasks.objects.filter(is_active=True)
        new_todos = Todos.objects.all().order_by('id')
        print(new_todos)
        new_todos2 = Todos.objects.all().order_by('id')
        print(new_todos2)

        if new_tasks or new_todos:
            return render(request, 'home.html', {'pending_tasks': new_tasks, 'todos': new_todos})
            # return JsonResponse({'pending_tasks': list(new_tasks.values()), 'todos': list(new_todos.values())})
        else:
            return render(request, 'home.html')


def test(request, *args, **kwargs):
    new_tasks = Tasks.objects.filter(is_active=False)
    new_todos = Tasks.objects.filter(is_active=True)
    if new_tasks or new_todos:
        return JsonResponse({'pending_tasks': list(new_tasks.values()), 'todos': list(new_todos.values())})


# while checking the checkbox the task in the task section it will jump to right section
@csrf_exempt
def task_to_todo_view(request, *args, **kwargs):
    todo_id = kwargs.get('id')
    print(todo_id)
    task = Tasks.objects.get(id=todo_id)
    new_stat = TaskStatus.objects.get(stat_name='New')
    Todos.objects.create(todo_task=task, todo_status=new_stat)
    task.is_active = True
    task.save()

    # Todos.todo_task.add(task)
    print(type(task))
    return redirect('todo-home')

@csrf_exempt
def change_todo_status_view(request, *args, **kwargs):
    todo_id = kwargs.get('id')
    instance = Todos.objects.get(id=todo_id)

    stat_names = []
    qs = TaskStatus.objects.all().order_by('id').values()
    for stat in qs:
        stat_names.append(stat.get('stat_name'))

    for i in stat_names:
        if i == instance.todo_status.stat_name:
            if stat_names.index(i) < len(stat_names)-1:
                next_status = TaskStatus.objects.get(stat_name=stat_names[stat_names.index(i)+1])
                instance.todo_status = next_status
                instance.save()
                break
            else:
                next_status = TaskStatus.objects.get(stat_name=stat_names[0])
                instance.todo_status = next_status
                instance.save()
                break
    return redirect('todo-home')


# get
def todo_live_data_view(request, *args, **kwargs):
    stat_names = []
    qs = TaskStatus.objects.all().order_by('id').values()
    for stat in qs:
        stat_names.append(stat.get('stat_name'))
    print(stat_names)
    return JsonResponse({'stat_names': stat_names})



















