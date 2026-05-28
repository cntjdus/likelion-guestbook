from django.contrib import admin
from .models import Commit, Review


admin.site.register(Commit)
admin.site.register(Review)
