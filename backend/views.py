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


def shop(request, slug ):
    shop = Post.objects.get(slug=slug)
    context = {
        'shop' : shop
    }

    return render(request, 'post.html', context)
