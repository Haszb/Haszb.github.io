---
title: FloraFlow
kicker: Vision par ordinateur
summary: 'Classification de jeunes plants en 12 espèces à partir de 5 539 images. Après avoir comparé un CNN conçu sur mesure à six modèles préentraînés, nous avons entraîné ResNet50V2 et MobileNetV3Large par étapes successives (suppression du fond par segmentation des couleurs, fine-tuning), avec un moteur de test conçu pour ne changer qu’un paramètre à la fois. Grad-CAM montre ce que regarde chaque modèle. Score F1 final : 97 %.'
order: 5
period: '2023'
stack: [Python, TensorFlow, Keras, OpenCV, scikit-image, Plotly, Streamlit]
links:
  - label: Dépôt
    href: https://github.com/Haszb/Floraflow
cover: /img/academic/floraflow-gradcam.jpg
coverAlt: Images de plants avec leurs cartes de chaleur Grad-CAM
---
