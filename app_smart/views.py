from django.shortcuts import render
from django.http import HttpResponse

def abre_index(request):
    mensagem = 'MENSAGEM DA FUNÇÃO abre_index'
    return HttpResponse(mensagem)
