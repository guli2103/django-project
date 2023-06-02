from django.urls import path
from .views import *
urlpatterns = [
    path('', index),
    path('post/<slug:slug>/', shop)
]