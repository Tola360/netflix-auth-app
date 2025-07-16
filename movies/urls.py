from django.urls import path
from .views import MovieListView

urlpatterns = [
    path('', MovieListView.as_view()),  # http://localhost:8000/api/movies/
]
