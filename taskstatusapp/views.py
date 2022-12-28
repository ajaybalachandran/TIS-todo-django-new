from django.shortcuts import render
from django.views.generic import View
from taskstatusapp.models import TaskStatus

# Create your views here.


class ListStatusView(View):
    def get(self, request, *args, **kwargs):
        qs = TaskStatus.objects.all().order_by('id')

        return render(request, 'list_status.html', {'task_status': qs})

    def post(self, request, *args, **kwargs):
        pass
