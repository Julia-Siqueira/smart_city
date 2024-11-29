from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from app_smart.models import Sensor
from django.db.models import Q
import csv
from .forms import formularioCSV
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, authentication_classes
import csv
from datetime import datetime
from dateutil import parser
from django import forms
from app_smart.models import TemperaturaData, Sensor, UmidadeData, LuminosidadeData, ContadorData
from .forms import formularioCSV
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework import serializers
from django.core.exceptions import ValidationError
from rest_framework.authentication import TokenAuthentication
import logging

# Configuração básica de log
logger = logging.getLogger(__name__)


def abre_cadastro(request):
    return HttpResponseRedirect('http://localhost:3000/cadastro')

def abre_login(request):
    return HttpResponseRedirect('http://localhost:3000')

def abre_visao_geral(request):
    return HttpResponseRedirect('http://localhost:3000/sensores')


def abre_index(request):
    mensagem = 'MENSAGEM DA FUNÇÃO abre_index'
    return HttpResponse(mensagem)

def UploadCSV(request, modelo_da_classe, campos_esperados):
    if request.method == 'POST':
        form = formularioCSV(request.POST, request.FILES)

        if form.is_valid():
            csv_file = request.FILES['file']

            if csv_file.name.endswith('.csv'):
                file_data = csv_file.read().decode('ISO-8859-1').splitlines()
                reader = csv.DictReader(file_data, delimiter=',')
                success_count = 0

                for row in reader:
                    model_instance = modelo_da_classe()
                    for field in campos_esperados:
                        value = row.get(field)
                        if value:
                            if field in ['sensor_id']:
                                try:
                                    value = float(value)
                                except ValueError:
                                    continue
                            model_instance.__setattr__(field, value)

                    model_instance.save()
                    success_count += 1

                return JsonResponse({
                    'message': f'Sucesso: {success_count} registro(s) carregado(s).'
                }, status=200)

        return JsonResponse({'error': 'Arquivo inválido.'}, status=400)

    return JsonResponse({'error': 'Método não permitido.'}, status=405)
   

@api_view(['POST'])
def login_view(request):

    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({'success': True, 'message': 'Login bem sucedido!'}, status=status.HTTP_200_OK)
    else:
        return Response({'sucess': False, 'message': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def upload_sensores(request):
    campos_esperados = [
        'tipo', 'unidade_medida', 'latitude', 'longitude',
        'localizacao', 'responsavel', 'status_operacional',
        'observacao', 'mac_address'
    ]

    if not request.FILES.get('file'):
        return JsonResponse({'error': 'Nenhum arquivo enviado.'}, status=400)

    file = request.FILES['file']

    if not file.name.endswith('.csv'):
        return JsonResponse({'error': 'O arquivo deve ser um CSV.'}, status=400)

    try:
        csv_data = file.read().decode('utf-8').splitlines()
        reader = csv.DictReader(csv_data)

        for row in reader:
            for campo in campos_esperados:
                if campo not in row:
                    raise ValidationError(f'O campo "{campo}" está faltando no arquivo.')

            # Insere no banco de dados
            Sensor.objects.create(
                tipo=row['tipo'],
                unidade_medida=row['unidade_medida'],
                latitude=row['latitude'],
                longitude=row['longitude'],
                localizacao=row['localizacao'],
                responsavel=row['responsavel'],
                status_operacional=row['status_operacional'],
                observacao=row['observacao'],
                mac_address=row['mac_address']
            )

        return JsonResponse({'message': 'Arquivo processado e dados inseridos com sucesso.'}, status=200)

    except ValidationError as e:
        return JsonResponse({'error': str(e)}, status=400)
    except Exception as e:
        return JsonResponse({'error': 'Erro ao processar o arquivo.', 'details': str(e)}, status=500)

@api_view(['POST'])  
def upload_temperatura(request):
    campos_esperados = ['valor', 'sensor_id', 'timestamp']

    if not request.FILES.get('file'):
        logger.error('Nenhum arquivo enviado.')
        return JsonResponse({'error': 'Nenhum arquivo enviado.'}, status=400)

    file = request.FILES['file']
    logger.info(f"Arquivo recebido: {file.name}, Tipo: {file.content_type}")

    if not file.name.endswith('.csv'):
        logger.error(f'Arquivo enviado não é CSV: {file.name}')
        return JsonResponse({'error': 'O arquivo deve ser um CSV.'}, status=400)

    try:
        file_content = file.read().decode('utf-8')
        if not file_content:
            logger.error('Arquivo CSV vazio.')
            return JsonResponse({'error': 'O arquivo está vazio.'}, status=400)

        csv_data = file_content.splitlines()
        reader = csv.DictReader(csv_data)

        for row in reader:
            for campo in campos_esperados:
                if campo not in row:
                    logger.error(f'Campo faltando no arquivo: {campo}')
                    raise ValidationError(f'O campo "{campo}" está faltando no arquivo.')

            sensor = Sensor.objects.get(sensor_id=row['sensor_id'])
            timestamp = datetime.strptime(row['timestamp'].split('.')[0], '%Y-%m-%d %H:%M:%S')
            valor = float(row['valor'])  # Converter o valor para float

            # Inserir no banco de dados
            TemperaturaData.objects.create(
                valor=valor,
                timestamp=timestamp,
                sensor=sensor
            )

        logger.info('Arquivo processado com sucesso.')
        return JsonResponse({'message': 'Arquivo processado e dados inseridos com sucesso.'}, status=200)

    except ValidationError as e:
        logger.error(f'Erro de validação: {str(e)}')
        return JsonResponse({'error': str(e)}, status=400)
    except Exception as e:
        logger.error(f'Erro inesperado: {str(e)}')
        return JsonResponse({'error': 'Erro ao processar o arquivo.', 'details': str(e)}, status=500)

@api_view(['POST'])  
def upload_umidade(request):
    campos_esperados = ['valor', 'sensor_id', 'timestamp']

    if not request.FILES.get('file'):
        logger.error('Nenhum arquivo enviado.')
        return JsonResponse({'error': 'Nenhum arquivo enviado.'}, status=400)

    file = request.FILES['file']
    logger.info(f"Arquivo recebido: {file.name}, Tipo: {file.content_type}")

    if not file.name.endswith('.csv'):
        logger.error(f'Arquivo enviado não é CSV: {file.name}')
        return JsonResponse({'error': 'O arquivo deve ser um CSV.'}, status=400)

    try:
        file_content = file.read().decode('utf-8')
        if not file_content:
            logger.error('Arquivo CSV vazio.')
            return JsonResponse({'error': 'O arquivo está vazio.'}, status=400)

        csv_data = file_content.splitlines()
        reader = csv.DictReader(csv_data)

        for row in reader:
            for campo in campos_esperados:
                if campo not in row:
                    logger.error(f'Campo faltando no arquivo: {campo}')
                    raise ValidationError(f'O campo "{campo}" está faltando no arquivo.')

            sensor = Sensor.objects.get(sensor_id=row['sensor_id'])
            timestamp = datetime.strptime(row['timestamp'].split('.')[0], '%Y-%m-%d %H:%M:%S')
            valor = float(row['valor'])  # Converter o valor para float

            # Inserir no banco de dados
            UmidadeData.objects.create(
                valor=valor,
                timestamp=timestamp,
                sensor=sensor
            )

        logger.info('Arquivo processado com sucesso.')
        return JsonResponse({'message': 'Arquivo processado e dados inseridos com sucesso.'}, status=200)

    except ValidationError as e:
        logger.error(f'Erro de validação: {str(e)}')
        return JsonResponse({'error': str(e)}, status=400)
    except Exception as e:
        logger.error(f'Erro inesperado: {str(e)}')
        return JsonResponse({'error': 'Erro ao processar o arquivo.', 'details': str(e)}, status=500)

@api_view(['POST'])
def upload_luminosidade(request):
    campos_esperados = ['valor', 'sensor_id', 'timestamp']

    if not request.FILES.get('file'):
        logger.error('Nenhum arquivo enviado.')
        return JsonResponse({'error': 'Nenhum arquivo enviado.'}, status=400)

    file = request.FILES['file']
    logger.info(f"Arquivo recebido: {file.name}, Tipo: {file.content_type}")

    if not file.name.endswith('.csv'):
        logger.error(f'Arquivo enviado não é CSV: {file.name}')
        return JsonResponse({'error': 'O arquivo deve ser um CSV.'}, status=400)

    try:
        file_content = file.read().decode('utf-8')
        if not file_content:
            logger.error('Arquivo CSV vazio.')
            return JsonResponse({'error': 'O arquivo está vazio.'}, status=400)

        csv_data = file_content.splitlines()
        reader = csv.DictReader(csv_data)

        for row in reader:
            for campo in campos_esperados:
                if campo not in row:
                    logger.error(f'Campo faltando no arquivo: {campo}')
                    raise ValidationError(f'O campo "{campo}" está faltando no arquivo.')

            sensor = Sensor.objects.get(sensor_id=row['sensor_id'])
            timestamp = datetime.strptime(row['timestamp'].split('.')[0], '%Y-%m-%d %H:%M:%S')
            valor = float(row['valor'])  # Converter o valor para float

            # Inserir no banco de dados
            LuminosidadeData.objects.create(
                valor=valor,
                timestamp=timestamp,
                sensor=sensor
            )

        logger.info('Arquivo processado com sucesso.')
        return JsonResponse({'message': 'Arquivo processado e dados inseridos com sucesso.'}, status=200)

    except ValidationError as e:
        logger.error(f'Erro de validação: {str(e)}')
        return JsonResponse({'error': str(e)}, status=400)
    except Exception as e:
        logger.error(f'Erro inesperado: {str(e)}')
        return JsonResponse({'error': 'Erro ao processar o arquivo.', 'details': str(e)}, status=500)


@api_view(['POST'])
def upload_contador(request):
    campos_esperados = ['timestamp', 'sensor_id']

    if not request.FILES.get('file'):
        logger.error('Nenhum arquivo enviado.')
        return JsonResponse({'error': 'Nenhum arquivo enviado.'}, status=400)

    file = request.FILES['file']
    logger.info(f"Arquivo recebido: {file.name}, Tipo: {file.content_type}")

    if not file.name.endswith('.csv'):
        logger.error(f'Arquivo enviado não é CSV: {file.name}')
        return JsonResponse({'error': 'O arquivo deve ser um CSV.'}, status=400)

    try:
        file_content = file.read().decode('utf-8')
        if not file_content:
            logger.error('Arquivo CSV vazio.')
            return JsonResponse({'error': 'O arquivo está vazio.'}, status=400)

        csv_data = file_content.splitlines()
        reader = csv.DictReader(csv_data)

        for row in reader:
            for campo in campos_esperados:
                if campo not in row:
                    logger.error(f'Campo faltando no arquivo: {campo}')
                    raise ValidationError(f'O campo "{campo}" está faltando no arquivo.')

            timestamp = datetime.strptime(row['timestamp'], '%Y-%m-%d %H:%M:%S')
            # Insere no banco de dados
            ContadorData.objects.create(
                timestamp=timestamp,
                sensor_id=row['sensor_id']
            )

        logger.info('Arquivo processado com sucesso.')
        return JsonResponse({'message': 'Arquivo processado e dados inseridos com sucesso.'}, status=200)

    except ValidationError as e:
        logger.error(f'Erro de validação: {str(e)}')
        return JsonResponse({'error': str(e)}, status=400)
    except Exception as e:
        logger.error(f'Erro inesperado: {str(e)}')
        return JsonResponse({'error': 'Erro ao processar o arquivo.', 'details': str(e)}, status=500)


def get_umidade(self, request, *args, **kwargs):
    # Lógica para o método GET
    sensor_id = request.query_params.get('sensor_id', None)
    valor_gte = request.query_params.get('valor_gte', None)
    valor_lt = request.query_params.get('valor_lt', None)
    timestamp_gte = request.query_params.get('timestamp_gte', None)
    timestamp_lt = request.query_params.get('timestamp_lt', None)
    filters = Q()

    if sensor_id:
        filters &= Q(sensor_id=sensor_id)
    if valor_gte:
        filters &= Q(valor__gte=valor_gte)
    if valor_lt:
        filters &= Q(valor__lt=valor_lt)
    if timestamp_gte:
        filters &= Q(timestamp__gte=timestamp_gte)
    if timestamp_lt:
        filters &= Q(timestamp__lt = timestamp_lt)
    
    queryset = UmidadeData.objects.filter(filters)
    serializer = serializers.UmidadeDataSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def update_umidade(request, id):
    try:
        umidade_data = UmidadeData.objects.get(id=id)
    except UmidadeData.DoesNotExist:
        return JsonResponse({'error': 'Dado não encontrado'}, status=404)

    # Aqui estamos buscando o objeto Sensor pelo ID enviado
    sensor_id = request.data.get('sensor')  # 'sensor' no corpo da requisição

    try:
        sensor = Sensor.objects.get(id=sensor_id)
    except Sensor.DoesNotExist:
        return JsonResponse({'error': f'Sensor com ID {sensor_id} não encontrado'}, status=404)

    # Atualizando os campos com os dados fornecidos
    umidade_data.sensor = sensor  # Atribuindo o objeto Sensor
    umidade_data.valor = request.data.get('valor', umidade_data.valor)
    umidade_data.timestamp = request.data.get('timestamp', umidade_data.timestamp)

    umidade_data.save()

    return JsonResponse({'message': 'Dado atualizado com sucesso'}, status=200)

@api_view(['PUT'])
def update_luminosidade(request, id):
    try:
        luminosidade_data = LuminosidadeData.objects.get(id=id)
    except LuminosidadeData.DoesNotExist:
        return JsonResponse({'error': 'Dado não encontrado'}, status=404)

    # Aqui estamos buscando o objeto Sensor pelo ID enviado
    sensor_id = request.data.get('sensor')  # 'sensor' no corpo da requisição

    try:
        sensor = Sensor.objects.get(id=sensor_id)
    except Sensor.DoesNotExist:
        return JsonResponse({'error': f'Sensor com ID {sensor_id} não encontrado'}, status=404)

    # Atualizando os campos com os dados fornecidos
    luminosidade_data.sensor = sensor  # Atribuindo o objeto Sensor
    luminosidade_data.valor = request.data.get('valor', luminosidade_data.valor)
    luminosidade_data.timestamp = request.data.get('timestamp', luminosidade_data.timestamp)

    luminosidade_data.save()

    return JsonResponse({'message': 'Dado atualizado com sucesso'}, status=200)

@api_view(['PUT'])
def update_contador(request, id):
    try:
        contador_data = ContadorData.objects.get(id=id)
    except ContadorData.DoesNotExist:
        return JsonResponse({'error': 'Dado não encontrado'}, status=404)

    # Aqui estamos buscando o objeto Sensor pelo ID enviado
    sensor_id = request.data.get('sensor')  # 'sensor' no corpo da requisição

    try:
        sensor = Sensor.objects.get(sensor_id=sensor_id)
    except Sensor.DoesNotExist:
        return JsonResponse({'error': f'Sensor com ID {sensor_id} não encontrado'}, status=404)

    # Atualizando os campos com os dados fornecidos
    contador_data.sensor = sensor  # Atribuindo o objeto Sensor
    contador_data.valor = request.data.get('valor', contador_data.valor)
    contador_data.timestamp = request.data.get('timestamp', contador_data.timestamp)

    contador_data.save()

    return JsonResponse({'message': 'Dado atualizado com sucesso'}, status=200)



@api_view(['POST'])
def create_umidade(request):
    try:
        sensor_id = request.data.get('sensor_id')
        valor = request.data.get('valor')
        timestamp = request.data.get('timestamp')

        UmidadeData.objects.create(
            sensor_id=sensor_id,
            valor=valor,
            timestamp=timestamp
        )
        return JsonResponse({'message': 'Dado criado com sucesso'}, status=201)
    except Exception as e:
        return JsonResponse({'error': 'Erro ao criar dado', 'details': str(e)}, status=400)
    
@api_view(['POST'])
def create_luminosidade(request):
    try:
        sensor_id = request.data.get('sensor_id')
        valor = request.data.get('valor')
        timestamp = request.data.get('timestamp')

        LuminosidadeData.objects.create(
            sensor_id=sensor_id,
            valor=valor,
            timestamp=timestamp
        )
        return JsonResponse({'message': 'Dado criado com sucesso'}, status=201)
    except Exception as e:
        return JsonResponse({'error': 'Erro ao criar dado', 'details': str(e)}, status=400)
    
@api_view(['POST'])
def create_contador(request):
    try:
        sensor_id = request.data.get('sensor_id')
        valor = request.data.get('valor')
        timestamp = request.data.get('timestamp')

        ContadorData.objects.create(
            sensor_id=sensor_id,
            valor=valor,
            timestamp=timestamp
        )
        return JsonResponse({'message': 'Dado criado com sucesso'}, status=201)
    except Exception as e:
        return JsonResponse({'error': 'Erro ao criar dado', 'details': str(e)}, status=400)
