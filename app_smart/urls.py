from django.urls import path, include
from . import views
from .views import UploadCSV, login_view, abre_login, abre_cadastro, abre_visao_geral
from app_smart.api.viewsets import CreateUserAPIViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from app_smart.api.viewsets import CreateUserAPIViewSet, SensorViewSet
from rest_framework.routers import DefaultRouter # com apenas uma URL pegamos todos os métodos de requisição
# ele faz isso com base nas ações do ViewsSets
from app_smart.api.filters import(
    SensorFilterView,
    TemperaturaDataFilterView,
    UmidadeFilterView,
    LuminosidadeFilterView,
    ContadorFilterView
)
from app_smart.api.viewsets import(
    CreateUserAPIViewSet,
    SensorViewSet,
    TemperaturaDataViewSet,
    UmidadeDataViewSet,
    LuminosidadeDataViewSet,
    ContadorDataViewSet,
)

from django.http import JsonResponse
import requests

def fastapi_proxy(request):
    response = requests.get("http://127.0.0.1:5000/dados")
    return JsonResponse(response.json(), safe=False)

router = DefaultRouter()
router.register(r'sensores', SensorViewSet) # 'r' é para uma string bruta
# router.register(r'arquivos', UploadCSV, basename='upload_csv')
router.register(r'umidade', UmidadeDataViewSet)
router.register(r'luminosidade', LuminosidadeDataViewSet)
router.register(r'contador', ContadorDataViewSet)
router.register(r'temperatura', TemperaturaDataViewSet)


urlpatterns = [
    path('', abre_login , name='login'),
    path('cadastro', abre_cadastro , name='cadastro'),
    path('api/create_user/', CreateUserAPIViewSet.as_view(), name='create_user'),
    
    path('api/login/', login_view, name='login'),
    path('api/', include(router.urls)),
    path('api/visao_geral', abre_visao_geral, name='visao_geral'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/sensor_filter/', SensorFilterView.as_view(), name='sensor_filter'), #rota para filtragem personalizada
    path('api/temperatura_filter/', TemperaturaDataFilterView.as_view(), name='sensor_filter'),
    path('api/umidade_filter/', UmidadeFilterView.as_view(), name='umidade_filter'),
    path('api/luminosidade_filter/', LuminosidadeFilterView.as_view(), name='luminosidade_filter'),
    path('api/contador_filter/', ContadorFilterView.as_view(), name='contador_filter'),

    path('upload/sensores/', views.upload_sensores, name='upload_sensores'),
    path('upload/contadores/', views.upload_contador, name='upload_contadores'),
    path('upload/luminosidade/', views.upload_luminosidade, name='upload_luminosidade'),
    path('upload/temperatura/', views.upload_temperatura, name='upload_temperatura'),
    path('upload/umidade/', views.upload_umidade, name='upload_umidade'),

    path('api/umidade/<int:id>/', views.update_umidade, name='update_umidade'),
    path('api/create/umidade/', views.create_umidade, name='create_umidade'),

    path('api/luminosidade/<int:id>/', views.update_luminosidade, name='update_luminosidade'),
    path('api/create/luminosidade/', views.create_luminosidade, name='create_luminosidade'),

    path('api/contador/<int:id>/', views.update_contador, name='update_contador'),
    path('api/create/contador/', views.create_contador, name='create_contador'),

    path('api/temperatura/<int:id>/', views.update_temperatura, name='update_temperatura'),
    path('api/create/temperatura/', views.create_temperatura, name='create_temperatura'),

    path("api/contador-data/", views.get_contador_data, name="contador-data"),
    path("api/umidade-data/", views.get_umidade_data, name="umidade-data"),
    path("api/temperatura-data/", views.get_temperatura_data, name="temperatura-data"),
    path("api/luminosidade-data/", views.get_luminosidade_data, name="luminosidade-data"),
]
