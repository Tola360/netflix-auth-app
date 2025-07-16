from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

def home_view(request):
    return JsonResponse({
        "message": "Bienvenido a la API de CECYTEM. Usa /api/register/ para crear usuarios o /api/token/ para autenticación JWT."
    })

urlpatterns = [
    path('', home_view),
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),  # Aquí está /api/register/
    path('api/movies/', include('movies.urls')),

    # 👇 AÑADE ESTO:
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
