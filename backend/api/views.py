from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ServerStatusSerializer


class ServerStatusView(APIView):
    def get(self, request):
        data = {
            "status": "online",
            "message": "Raspi Web Server API is working!",
        }

        serializer = ServerStatusSerializer(data)

        return Response(serializer.data)