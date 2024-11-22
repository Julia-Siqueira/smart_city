from django.db import models

class Sensor(models.Model):
    TIPOS_SENSOR_CHOICES = [
        ('Temperatura', 'Temperatura'),
        ('Umidade', 'Umidade'),
        ('Contador', 'Contador'),
        ('Luminosidade', 'Luminosidade')
    ]

    sensor_id = models.IntegerField(unique=True, null=True, blank=True)
    tipo = models.CharField(max_length=50, choices=TIPOS_SENSOR_CHOICES)
    mac_address = models.CharField(max_length=20, null=True) # endereçamento físico do sensor (placa ESP)
    latitude = models.FloatField()
    longitude = models.FloatField()
    localizacao = models.CharField(max_length=100)
    responsavel = models.CharField(max_length=100)
    unidade_medida = models.CharField(max_length=20, blank=True, null=True)
    status_operacional = models.BooleanField(default=True)
    observacao = models.TextField(blank=True)

    def __str__(self):
        return f"{self.tipo} - {self.localizacao}"

# model que armazena os dados de temperatura
class TemperaturaData(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    valor = models.FloatField() # valor da temperatura em graus Celcius
    # timestamp = models.DateTimeField(auto_now_add=True)
    timestamp = models.DateTimeField()
    
    def __str__(self):
        return f"Temperatura: {self.valor}°C - {self.timestamp}"

# model que armazena os dados de umidade
class UmidadeData(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    valor = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Umidade: {self.valor}% - {self.timestamp}"
    
# model que armazena os dados do contador
class ContadorData(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Contagem - {self.timestamp}"

class LuminosidadeData(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    valor = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Luminosidade: {self.valor} Lux - {self.timestamp}"
    

