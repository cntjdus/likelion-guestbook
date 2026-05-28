from django.urls import path

from .views import CommitDetail, CommitList, ReviewDetail, ReviewList


urlpatterns = [
    path('commits/', CommitList.as_view()),
    path('commits/<int:commit_id>/', CommitDetail.as_view()),
    path('commits/<int:commit_id>/reviews/', ReviewList.as_view()),
    path('commits/<int:commit_id>/reviews/<int:review_id>/', ReviewDetail.as_view()),
]
