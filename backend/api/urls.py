from django.urls import path

from .views import (
    CurrentUserView,
    LearningProgressView,
    LoginView,
    LogoutView,
    RegisterView,
    ServerStatusView,
)


urlpatterns = [
    path("status/", ServerStatusView.as_view(), name="server-status"),
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/logout/", LogoutView.as_view(), name="logout"),
    path("auth/me/", CurrentUserView.as_view(), name="current-user"),
    path("progress/", LearningProgressView.as_view(), name="learning-progress"),

]