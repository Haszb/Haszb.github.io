---
title: FloraFlow
kicker: Computer vision
summary: 'Classification of plant seedlings into 12 species from 5,539 images. After comparing a custom CNN with six pretrained models, we fine-tuned ResNet50V2 and MobileNetV3Large in successive stages (background removal by colour segmentation, fine-tuning), using a test engine built to change one parameter at a time. Grad-CAM shows what each model looks at. Final F1 score: 97%.'
order: 5
period: '2023'
context: DataScientest
team: Team of four
stack: [Python, TensorFlow, Keras, OpenCV, scikit-image, Plotly, Streamlit]
links:
  - label: Repository
    href: https://github.com/Haszb/Floraflow
cover: /img/academic/floraflow-gradcam.jpg
coverAlt: Seedling images with their Grad-CAM heatmaps
---
