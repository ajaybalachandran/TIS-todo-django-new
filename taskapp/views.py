from django.shortcuts import render

# Create your views here.

def task_detail_view(request):
    return render(request, 'taskdetails.html')

def new_task_view(request):
    return render(request, 'newtask.html')
def new_home_view(request):
    return render(request, 'home.html')
