# Generated by Django 5.0.7 on 2024-10-03 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_smart', '0002_contadordata_luminosidadedata_temperaturadata_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='temperaturadata',
            name='timestamp',
            field=models.DateTimeField(),
        ),
    ]
