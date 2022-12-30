from django.shortcuts import render, redirect
from django.views.generic import View
from categoryapp.models import Category
from categoryapp.forms import CreateCategoryForm
# Create your views here.


class ListCategoryView(View):
    def get(self, request, *args, **kwargs):
        qs = Category.objects.all()
        return render(request, 'list_cat.html', {'categories': qs})


class CategoryCreateView(View):
    def get(self, request, *args, **kwargs):
        form = CreateCategoryForm()
        return render(request, 'newcat.html', {'form': form})

    def post(self, request, *args, **kwargs):
        # print(request.POST)
        # print(request.FILES)
        # print(request.FILES['cat_img'])
        print(request.user)
        cat_name = request.POST.get('cat_name')
        cat_image = request.FILES.get('cat_image')

        Category.objects.create(cat_name=cat_name, cat_image=cat_image)
        return redirect('todo-cat-list')

