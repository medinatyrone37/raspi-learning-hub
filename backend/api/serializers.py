from rest_framework import serializers


class ServerStatusSerializer(serializers.Serializer):
    status = serializers.CharField()
    message = serializers.CharField()