from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView
from app_smart.api import serializers
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from ..models import Sensor
from app_smart.api.filters import SensorFilter
from django_filters.rest_framework import DjangoFilterBackend

class CreateUserAPIViewSet(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = serializers.SensorSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = SensorFilter