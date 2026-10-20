---
title: FloraFlow
kicker: Vision par ordinateur
summary: 'Classification de jeunes plants en 12 espèces à partir de 5 539 images. Après avoir comparé un CNN conçu sur mesure à six modèles préentraînés, nous avons optimisé ResNet50V2 et MobileNetV3Large par étapes successives (suppression de l’arrière-plan par segmentation des couleurs, puis fine-tuning), à l’aide d’un moteur de test conçu pour ne modifier qu’un paramètre à la fois. Grad-CAM montre les zones sur lesquelles chaque modèle s’appuie. F1-score final : 97 %.'
order: 5
period: '2023'
stack: [Python, TensorFlow, Keras, OpenCV, scikit-image, Plotly, Streamlit]
links:
  - label: Dépôt
    href: https://github.com/Haszb/Floraflow
cover: /img/academic/floraflow-gradcam.jpg
coverAlt: Images de plants avec leurs cartes de chaleur Grad-CAM
---
