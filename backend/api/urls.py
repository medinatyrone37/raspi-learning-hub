from django.urls import path

from .views import ServerStatusView


urlpatterns = [
    path("status/", ServerStatusView.as_view(), name="server-status"),
]