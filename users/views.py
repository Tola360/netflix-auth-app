from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken  # 👈 Importante para generar los tokens

User = get_user_model()

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Verifica que ambos campos estén presentes y no vacíos
        if not username or not password:
            return Response(
                {'error': 'Los campos username y password son obligatorios.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Verifica si el usuario ya existe
        if User.objects.filter(username=username).exists():
            return Response(
                {'error': 'El usuario ya existe.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Crea el nuevo usuario
        user = User.objects.create_user(username=username, password=password)

        # 🔐 Genera los tokens JWT automáticamente
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                'message': 'Usuario creado con éxito',
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            },
            status=status.HTTP_201_CREATED
        )

