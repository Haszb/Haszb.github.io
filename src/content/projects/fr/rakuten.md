---
title: Classification de produits Rakuten
kicker: MLOps
summary: Mise en production d’un modèle multimodal qui classe les produits Rakuten à partir de leur texte et de leur image. Une API FastAPI sécurisée gère trois rôles d’utilisateurs, et un pipeline Airflow vérifie chaque jour les nouveaux produits et réentraîne le modèle quand son accuracy baisse (de 59 % à 85,5 % dans le scénario de test). Le tout est packagé avec Docker Compose, avec une intégration continue sur GitHub Actions.
order: 3
period: '2023'
context: DataScientest
team: Projet d’équipe
stack: [Python, FastAPI, SQLAlchemy, PostgreSQL, Airflow, Docker Compose, GitHub Actions]
links:
  - label: Dépôt
    href: https://github.com/Haszb/Rakuten
cover: /img/academic/rakuten-workflow.png
coverAlt: DAG Airflow du workflow de réentraînement
---
