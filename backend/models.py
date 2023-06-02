from django.db import models

class Turi(models.Model):
    turi = models.CharField(max_length=255)
    def __str__(self):
        return self.turi


class Post(models.Model):
    name = models.CharField(max_length=255)
    content = models.TextField()
    use = models.CharField(max_length=255)
    data = models.DateField(auto_now_add=False)
    img1 = models.CharField(max_length=255)
    img2 = models.CharField(max_length=255)
    img3 = models.CharField(max_length=255)
    vaqti = models.IntegerField(default=0)
    many = models.ManyToManyField(Turi, blank=True)
    slug = models.SlugField(max_length=255, unique=True)

    def __str__(self):
        return self.name



