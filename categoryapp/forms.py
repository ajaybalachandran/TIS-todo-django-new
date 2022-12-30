from django import forms
from django.contrib.auth.models import User
from categoryapp.models import Category


class CreateCategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['cat_name', 'cat_image']
        widgets = {
            'cat_name': forms.TextInput(attrs={'class': 'form-control', 'required': 'true'}),
            'cat_image': forms.FileInput(attrs={'class': 'form-control', 'required': 'true'})
        }
