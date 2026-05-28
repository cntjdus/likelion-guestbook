from django.db import models


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Commit(BaseModel):
    message = models.CharField(max_length=100)
    author = models.CharField(max_length=30)
    description = models.TextField(blank=True)
    password = models.CharField(max_length=30)

    def __str__(self):
        return self.message


class Review(BaseModel):
    commit = models.ForeignKey(Commit, on_delete=models.CASCADE, related_name='reviews')
    reviewer = models.CharField(max_length=30)
    type = models.CharField(max_length=20)
    comment = models.TextField()

    def __str__(self):
        return self.comment
