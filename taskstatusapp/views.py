import json

from django.shortcuts import render,redirect
from django.views.generic import View, ListView
from taskstatusapp.models import TaskStatus

# Create your views here.


class ListStatusView(View):
    def get(self, request, *args, **kwargs):
        qs = TaskStatus.objects.all().order_by('id')
        all_colors = ['lawngreen', 'blue', 'yellow', 'green', 'red',
                      'grey', 'orange', 'pink', 'teal', 'black', 'aqua']
        print(qs)
        created_colors = []
        for stat in qs:
            created_colors.append(stat.stat_color)

        available = list(set(all_colors).symmetric_difference(set(created_colors)))
        qs_json = json.dumps(list(TaskStatus.objects.values()))

        return render(request, 'list_status.html', {'task_status': qs, 'available_colors': available, 'qs_json': qs_json})

    def post(self, request, *args, **kwargs):
        print(request.POST)
        stat_name = request.POST.get('stat_name')
        stat_color = request.POST.get('selected_color')
        # print(stat_color, stat_name)
        TaskStatus.objects.create(stat_name=stat_name, stat_color=stat_color)

        return redirect('todo-status-list')
