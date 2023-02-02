from django.shortcuts import render
from .models import *


def index(request):
    posts = Post.objects.all()
    turi = Turi.objects.all()
    context = {
        'posts' : posts,
        'turi': turi
    }
    return render(request, 'index.html', context)
