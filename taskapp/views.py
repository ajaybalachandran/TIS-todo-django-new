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
def new_home_view(request):
    return render(request, 'home.html')

class CreateNewTaskView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'newtask.html')

    def post(self, request, *args, **kwargs):
        task_name = request.POST.get('title')
        description = request.POST.get('desc')
        cats = request.POST.get('cat')
        task_category = Category.objects.get(cat_name=cats)
        task_image = request.FILES['task_img']

        needed_time = request.POST.get('avail_time')
        return redirect('todo-create-new-task')

