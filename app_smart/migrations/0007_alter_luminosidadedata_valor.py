# Generated by Django 5.0.7 on 2024-11-29 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_smart', '0006_alter_umidadedata_valor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='luminosidadedata',
            name='valor',
            field=models.FloatField(default=0.0),
        ),
    ]
