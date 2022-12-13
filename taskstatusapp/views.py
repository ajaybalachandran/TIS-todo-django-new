from django.shortcuts import render

# Create your views here.
def list_status_view(request):
    return render(request, 'list_status.html')