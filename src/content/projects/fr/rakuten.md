---
title: Classification de produits Rakuten
kicker: MLOps
summary: Déploiement d’un modèle multimodal qui classe les produits Rakuten à partir de leur texte et de leur image. Un service FastAPI sécurisé gère trois rôles d’utilisateurs, et un pipeline Airflow contrôle chaque jour les nouveaux produits et réentraîne le modèle quand son accuracy baisse (dans le scénario de test, le réentraînement l’a fait passer de 59 % à 85,5 %). L’ensemble est conteneurisé avec Docker Compose, avec une CI sous GitHub Actions.
order: 3
period: '2024'
stack: [Python, FastAPI, SQLAlchemy, PostgreSQL, Airflow, Docker Compose, GitHub Actions]
links:
  - label: Dépôt
    href: https://github.com/Haszb/Rakuten
cover: /img/academic/rakuten-workflow.png
coverAlt: DAG Airflow du workflow de réentraînement
---
