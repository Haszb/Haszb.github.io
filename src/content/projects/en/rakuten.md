---
title: Rakuten product classification
kicker: MLOps
summary: Deployment of a multimodal model that classifies Rakuten products from their text and image. A secured FastAPI service manages three user roles, and an Airflow pipeline checks new products daily and retrains the model when its accuracy drops (in the test scenario, retraining lifted it from 59% to 85.5%). Packaged with Docker Compose, with CI on GitHub Actions.
order: 3
period: '2023'
context: DataScientest
team: Team project
stack: [Python, FastAPI, SQLAlchemy, PostgreSQL, Airflow, Docker Compose, GitHub Actions]
links:
  - label: Repository
    href: https://github.com/Haszb/Rakuten
cover: /img/academic/rakuten-workflow.png
coverAlt: Airflow DAG of the retraining workflow
---
