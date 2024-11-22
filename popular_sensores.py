import os
import django

# Configura o ambiente Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smart_city.settings')  # 'smart_city.settings' é o nome do arquivo settings.py
django.setup()

from app_smart.models import Sensor  # Agora você pode importar os modelos

def popular_sensores():
    sensores = [
        {'sensor_id': 1, 'tipo': 'Contador', 'localizacao': 'Local 1', 'latitude': -23.55, 'longitude': -46.63},
        {'sensor_id': 2, 'tipo': 'Contador', 'localizacao': 'Local 2', 'latitude': -23.56, 'longitude': -46.64},
        {'sensor_id': 3, 'tipo': 'Contador', 'localizacao': 'Local 3', 'latitude': -23.57, 'longitude': -46.65},
        {'sensor_id': 4, 'tipo': 'Contador', 'localizacao': 'Local 4', 'latitude': -23.58, 'longitude': -46.66},
        {'sensor_id': 5, 'tipo': 'Contador', 'localizacao': 'Local 5', 'latitude': -23.59, 'longitude': -46.67},
    ]

    for sensor_data in sensores:
        Sensor.objects.create(**sensor_data)
        print(f"Sensor criado: {sensor_data}")  # Isso vai mostrar os sensores criados

# Chama a função para popular os sensores
popular_sensores()
