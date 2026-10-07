from django.contrib.auth.models import User
from django.db import models


class LearningProgress(models.Model):
    COURSE_CHOICES = [
        ("cybersecurity", "Cybersecurity"),
        ("docker", "Docker"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="learning_progress",
    )

    course = models.CharField(
        max_length=50,
        choices=COURSE_CHOICES,
    )

    lesson = models.PositiveIntegerField()

    slide = models.PositiveIntegerField(default=1)

    completed = models.BooleanField(default=False)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "course", "lesson")
        ordering = ["course", "lesson"]

    def __str__(self):
        return (
            f"{self.user.username} - "
            f"{self.course} - "
            f"Lesson {self.lesson}"
        )