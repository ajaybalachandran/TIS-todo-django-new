from django.shortcuts import render

# Create your views here.
def home_view(request):
    return render(request, 'home.html')
def list_category_view(request):
    return render(request, 'list_cat.html')
def list_status_view(request):
    return render(request, 'list_status.html')
def task_detail_view(request):
    return render(request, 'taskdetails.html')
def category_create_view(request):
    return render(request, 'newcat.html')
def new_task_view(request):
    return render(request, 'newtask.html')
def test(request):
    return render(request, 'test.html')
