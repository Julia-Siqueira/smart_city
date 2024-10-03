from django import forms

class formularioCSV(forms.Form):
    arquivo = forms.FileField(label='Selecione o arquivo')

class formularioTempCSV(forms.Form):
    arq_temperatura = forms.FileField(label='Selecione o arquivo')