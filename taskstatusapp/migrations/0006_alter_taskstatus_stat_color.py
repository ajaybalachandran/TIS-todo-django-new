# Generated by Django 4.1.4 on 2022-12-24 06:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taskstatusapp', '0005_alter_taskstatus_stat_color'),
    ]

    operations = [
        migrations.AlterField(
            model_name='taskstatus',
            name='stat_color',
            field=models.CharField(choices=[('lawngreen', 'lawngreen'), ('blue', 'blue'), ('yellow', 'yellow'), ('green', 'green'), ('red', 'red'), ('grey', 'grey'), ('orange', 'orange'), ('pink', 'pink'), ('teal', 'teal'), ('black', 'black'), ('aqua', 'aqua')], max_length=20, unique=True),
        ),
    ]
