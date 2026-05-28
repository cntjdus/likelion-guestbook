from rest_framework import serializers
from .models import Commit, Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'commit', 'reviewer', 'type', 'comment', 'created_at', 'updated_at']


class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'reviewer', 'type', 'comment', 'created_at', 'updated_at']


class CommitSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Commit
        fields = ['id', 'message', 'author', 'description', 'created_at', 'updated_at', 'reviews']


class CommitCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commit
        fields = ['id', 'message', 'author', 'description', 'password', 'created_at', 'updated_at']
