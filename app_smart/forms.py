from django import forms

class formularioCSV(forms.Form):
    arquivo = forms.FileField(label='Selecione o arquivo')

