from django.contrib.auth import login, logout
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import LearningProgress

from .serializers import (
    LoginSerializer,
    RegisterSerializer,
    ServerStatusSerializer,
    UserSerializer,
    LearningProgressSerializer,

)


class ServerStatusView(APIView):
    def get(self, request):
        data = {
            "status": "online",
            "message": "Raspi Web Server API is working!",
        }

        serializer = ServerStatusSerializer(data)

        return Response(serializer.data)


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    "message": "Registration successful.",
                    "user": UserSerializer(user).data,
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data["user"]

            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    "message": "Login successful.",
                    "user": UserSerializer(user).data,
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)

        return Response(
            {
                "message": "Logout successful.",
            },
            status=status.HTTP_200_OK,
        )


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

class LearningProgressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        progress = LearningProgress.objects.filter(
            user=request.user
        )

        serializer = LearningProgressSerializer(
            progress,
            many=True,
        )

        return Response(serializer.data)

    def post(self, request):
        serializer = LearningProgressSerializer(
            data=request.data
        )

        if serializer.is_valid():
            progress, created = LearningProgress.objects.update_or_create(
                user=request.user,
                course=serializer.validated_data["course"],
                lesson=serializer.validated_data["lesson"],
                defaults={
                    "slide": serializer.validated_data.get("slide", 1),
                    "completed": serializer.validated_data.get(
                        "completed",
                        False,
                    ),
                },
            )

            response_serializer = LearningProgressSerializer(
                progress
            )

            return Response(
                response_serializer.data,
                status=status.HTTP_201_CREATED
                if created
                else status.HTTP_200_OK,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )