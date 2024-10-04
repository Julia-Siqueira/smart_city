from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render, redirect
from app_smart.models import Sensor
import csv
from .forms import formularioCSV
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, viewsets
import csv
from datetime import datetime
from dateutil import parser
import pytz
import os
import django
from django import forms
from app_smart.models import TemperaturaData, Sensor



def abre_index(request):
    mensagem = 'MENSAGEM DA FUNÇÃO abre_index'
    return HttpResponse(mensagem)

class UploadCSV(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request):
        arquivoCSV = formularioCSV(request.POST, request.FILES)

        if not arquivoCSV.is_valid():
            print(arquivoCSV.errors)

        if arquivoCSV.is_valid():
            arquivo_valido = request.FILES['arquivo']

            arquivo_decodificado = arquivo_valido.read().decode('utf-8').splitlines()
            leitor = csv.DictReader(arquivo_decodificado, delimiter=',')

            for row in leitor:
                Sensor.objects.create(
                    tipo=row['tipo'],
                    unidade_medida=row['unidade_medida'] if row['unidade_medida'] else None,
                    latitude=float(row['latitude'].replace(',', '.')),
                    longitude=float(row['longitude'].replace(',', '.')),
                    localizacao=row['localizacao'],
                    responsavel=row['responsavel'] if row['responsavel'] else '',
                    status_operacional=True if row['status_operacional'] == 'True' else False,
                    observacao=row['observacao'] if row['observacao'] else '',
                    mac_address=row['mac_address'] if row['mac_address'] else None
                )

            return Response({"message": "Arquivo CSV enviado e processado com sucesso!"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Arquivo inválido"}, status=status.HTTP_400_BAD_REQUEST)
        
        
def return_html(request):
    return render(request, 'api/sensores.html')


            

        
        

