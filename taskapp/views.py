import json
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.utils.decorators import method_decorator
from django.views.generic import View, FormView
from taskapp.models import Tasks
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from categoryapp.models import Category
from taskstatusapp.models import TaskStatus
from taskapp.models import Todos
from django.http import JsonResponse
from taskapp.forms import LoginForm
# Create your views here.
decs = [login_required, csrf_exempt]

@method_decorator(login_required, name='dispatch')
class CreateNewTaskView(View):
    def get(self, request, *args, **kwargs):
        category_list = []
        qs = Category.objects.all().order_by('id')
        for i in qs:
            category_list.append(i.cat_name)
        return render(request, 'newtask.html', {'cat_list': category_list})

    def post(self, request, *args, **kwargs):
        # print(request.POST)

        task_name = request.POST.get('task_name')
        description = request.POST.get('description')
        cats = request.POST.get('cats')
        task_category = Category.objects.get(cat_name=cats)
        task_image = request.FILES.get('file')
        # task_status = TaskStatus.objects.get(stat_color='no_color')
        needed_time = request.POST.get('needed_time')
        # print(task_name, description, task_category, task_image,  needed_time)
        # fss = FileSystemStorage()
        # filename = fss.save(task_image.name, task_image)
        # url = fss.url(filename)
        # print(task_image.name)

        Tasks.objects.create(task_name=task_name, description=description,
                             task_category=task_category, task_image=task_image,
                             needed_time=needed_time)
        return redirect('todo-home')


@method_decorator(login_required, name='dispatch')
class NewHomeView(CreateNewTaskView):
    def get(self, request, *args, **kwargs):
        category_list = []
        qs = Category.objects.all().order_by('id')
        for i in qs:
            category_list.append(i.cat_name)
        # pending_id = TaskStatus.objects.get(stat_name='pending')
        new_tasks = Tasks.objects.filter(is_active=False).order_by('id').values()
        # new_todos = Tasks.objects.filter(is_active=True)
        new_todos = Todos.objects.all().order_by('id')
        # print(new_todos)
        # new_todos2 = Todos.objects.all().order_by('id')
        # print(new_todos2)

        if new_tasks or new_todos:
            return render(request, 'home.html', {'pending_tasks': new_tasks, 'todos': new_todos, 'cat_list': category_list})
            # return JsonResponse({'pending_tasks': list(new_tasks.values()), 'todos': list(new_todos.values())})
        else:
            return render(request, 'home.html')


@method_decorator(login_required, name='dispatch')
def test(request, *args, **kwargs):
    new_tasks = Tasks.objects.filter(is_active=False).order_by('id')
    new_todos = Tasks.objects.filter(is_active=True)
    if new_tasks or new_todos:
        return JsonResponse({'pending_tasks': list(new_tasks.values()), 'todos': list(new_todos.values())})


# while checking the checkbox the task in the task section it will jump to right section
@method_decorator(decs, name='dispatch')
class TaskToTodoView(View):
    def get(self, request, *args, **kwargs):
        new_tasks = Tasks.objects.filter(is_active=False)
        new_todos = Tasks.objects.filter(is_active=True).order_by('id')
        todo = list(Todos.objects.all().order_by('id').values())
        lat_todo_task_id = todo[len(todo)-1]['todo_task_id']
        instance = Tasks.objects.get(id=lat_todo_task_id)
        latest_todo_name = instance.task_name
        latest_todo_added_date = instance.added_date


        if new_tasks or new_todos:
            return JsonResponse({'pending_tasks': list(new_tasks.values()), 'todos': list(new_todos.values()),
                                 'latest_todo': todo[len(todo)-1], 'latest_todo_name': latest_todo_name,
                                 'latest_todo_added_date': latest_todo_added_date})

    def post(self, request, *args, **kwargs):
        todo_id = kwargs.get('id')
        # print(todo_id)
        task = Tasks.objects.get(id=todo_id)
        new_stat = TaskStatus.objects.get(stat_name='New')
        Todos.objects.create(todo_task=task, todo_status=new_stat)
        task.is_active = True
        task.save()
        new = Todos.objects.get(todo_task=task).id
        new_todo_note = Todos.objects.get(todo_task=task).todo_note
        color = Todos.objects.get(todo_task=task).todo_status.stat_color
        status_name = Todos.objects.get(todo_task=task).todo_status.stat_name
        print('this is')
        print(color)

        # Todos.todo_task.add(task)
        print(type(task))
        return JsonResponse({'new_id': new, 'new_color': color, 'new_status': status_name, 'new_todo_note': new_todo_note})


@method_decorator(decs, name='dispatch')
class ChangeTodoStatusView(View):

    def get(self, request, *args, **kwargs):
        print('helooooooooo')
        todo_id = kwargs.get('id')
        changed_todo = Todos.objects.get(id=todo_id)

        return JsonResponse({'new_status': changed_todo.todo_status.stat_name,
                             'new_status_color': changed_todo.todo_status.stat_color})

    def post(self, request, *args, **kwargs):
        todo_id = kwargs.get('id')
        instance = Todos.objects.get(id=todo_id)

        stat_names = []
        qs = TaskStatus.objects.all().order_by('id').values()
        for stat in qs:
            stat_names.append(stat.get('stat_name'))

        for i in stat_names:
            if i == instance.todo_status.stat_name:
                if stat_names.index(i) < len(stat_names) - 1:
                    next_status = TaskStatus.objects.get(stat_name=stat_names[stat_names.index(i) + 1])
                    instance.todo_status = next_status
                    instance.save()
                    break
                else:
                    next_status = TaskStatus.objects.get(stat_name=stat_names[0])
                    instance.todo_status = next_status
                    instance.save()
                    break
        return redirect('todo-home')


@method_decorator(login_required, name='dispatch')
class TaskDetailsView(View):
    def get(self, request, *args, **kwargs):
        task_id = kwargs.get('id')
        task = Tasks.objects.get(id=task_id)
        return render(request, 'taskdetails.html', {'task': task})


@method_decorator(decs, name='dispatch')
class AddTaskNoteView(View):
    def get(self, request, *args, **kwargs):
        id = kwargs.get('id')
        new_task_note = Todos.objects.get(id=id).todo_note
        return JsonResponse({'id': id, 'new_task_note': new_task_note})

    def post(self, request, *args, **kwargs):
        id = kwargs.get('id')
        print(request.POST)
        print(id)
        task_note = request.POST.get('task_note')
        todo = Todos.objects.get(id=id)
        todo.todo_note = task_note
        todo.save()
        return redirect('todo-home')


@method_decorator(login_required, name='dispatch')
class TodoDetailsView(View):
    def get(self, request, *args, **kwargs):
        id = kwargs.get('id')
        status_list = []
        todo = Todos.objects.get(id=id)
        for i in TaskStatus.objects.all().order_by("id"):
            status_list.append(i.stat_name)

        return render(request, 'todo_details.html', {'todo_detail': todo, 'status_list': status_list})

    def post(self, request, *args, **kwargs):
        id = kwargs.get('id')
        todo = Todos.objects.get(id=id)
        print(todo)
        print(request.POST)
        new_stat_name = request.POST.get('status_change')
        new_stat = TaskStatus.objects.get(stat_name=new_stat_name)
        todo.todo_status = new_stat
        todo.save()
        return redirect('todo-todo-details', id)


class LoginView(View):
    def get(self, request, *args, **kwargs):
        form = LoginForm()
        return render(request, 'login.html', {'form': form})
    def post(self, request, *args, **kwargs):
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            usr = authenticate(request, username=username, password=password)
            if usr:
                login(request, usr)
                return redirect('todo-home')
            else:
                return render(request, 'login.html', {'form': form})


@login_required
def signout_view(request, *args, **kwargs):
    logout(request)
    return redirect('todo-login')


















