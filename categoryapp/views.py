from django.shortcuts import render

# Create your views here.
def list_category_view(request):
    return render(request, 'list_cat.html')
def category_create_view(request):
    return render(request, 'newcat.html')