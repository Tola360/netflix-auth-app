from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse  # 👈 Importa JsonResponse

# Vista de bienvenida para "/"
def home_view(request):
    return JsonResponse({
        "message": "Bienvenido a la API de CECYTEM. Usa /api/register/ para crear usuarios o /api/token/ para autenticación JWT."
    })

urlpatterns = [
    path('', home_view),  # 👈 Agrega esta línea
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
]


urlpatterns =[
        path('api/', include('movies.urls')),  # Esto activa todas las rutas de la app movies
]