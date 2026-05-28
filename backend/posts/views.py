from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Commit, Review
from .serializers import (
    CommitCreateSerializer,
    CommitSerializer,
    ReviewCreateSerializer,
    ReviewSerializer,
)


class CommitList(APIView):
    def get(self, request):
        commits = Commit.objects.all().order_by('-created_at')
        serializer = CommitSerializer(commits, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CommitCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommitDetail(APIView):
    def get(self, request, commit_id):
        commit = get_object_or_404(Commit, id=commit_id)
        serializer = CommitSerializer(commit)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, commit_id):
        commit = get_object_or_404(Commit, id=commit_id)
        password = request.data.get('password')

        if commit.password != password:
            return Response({'message': '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        commit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ReviewList(APIView):
    def get(self, request, commit_id):
        reviews = Review.objects.filter(commit_id=commit_id).order_by('-created_at')
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, commit_id):
        serializer = ReviewCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(commit_id=commit_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewDetail(APIView):
    def delete(self, request, commit_id, review_id):
        review = get_object_or_404(Review, id=review_id, commit_id=commit_id)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
