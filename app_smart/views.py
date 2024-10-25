from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from app_smart.models import Sensor
import csv
from .forms import formularioCSV
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
import csv
from datetime import datetime
from dateutil import parser
from django import forms
from app_smart.models import TemperaturaData, Sensor, UmidadeData, LuminosidadeData, ContadorData
from .forms import formularioCSV

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

                return render(request, 'csv.html', {
                    'form': form,
                    'message': f'Sucesso: {success_count} registro(s) carregado(s).'
                })

        return render(request, 'sensores.html', {'form': form, 'message': 'Arquivo inválido.'})

    return render(request, 'sensores.html', {'form': formularioCSV()})
   

@api_view(['POST'])
def login_view(request):

    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({'success': True, 'message': 'Login bem sucedido!'}, status=status.HTTP_200_OK)
    else:
        return Response({'sucess': False, 'message': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

def return_html(request):
    return render(request, 'api/sensores.html')


def upload_sensores(request):
    campos_esperados = ['tipo', 'unidade_medida', 'latitude', 'longitude', 'localizacao', 'responsavel', 'status_operacional', 'obsrevacao', 'mac_address']
    
    if request.method == 'POST':
        return UploadCSV(request, Sensor, campos_esperados)
    
    form = formularioCSV()
    return render(request, 'api/sensores.html', {'form': form})

        
def upload_temperatura(request):
    campos_esperados = ['sensor_id', 'valor', 'timestamp']
    return UploadCSV(request,  TemperaturaData, campos_esperados)

def upload_umidade(request):
    campos_esperados = ['sensor_id', 'valor', 'timestamp']
    return UploadCSV(request,  UmidadeData, campos_esperados)

def upload_luminosidade(request):
    campos_esperados = ['sensor_id', 'valor', 'timestamp']
    return UploadCSV(request,  LuminosidadeData, campos_esperados)

def upload_contador(request):
    campos_esperados = ['sensor_id', 'timestamp']

    if request.method == 'POST':
        return UploadCSV(request,  ContadorData, campos_esperados)
    
    form = formularioCSV()
    return render(request, 'api/sensores.html', {'form': form})

