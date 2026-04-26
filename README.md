

![Status](https://img.shields.io/badge/status-prototype-orange)
![Platform](https://img.shields.io/badge/platform-web-blue)
![ICU](https://img.shields.io/badge/use--case-ICU-critical)



<img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/1b0223ba-1f7a-4d7b-af60-028555fa6a14" />



# ICU-VSR (ICU Visual Speech Recognition)

ICU-VSR is a proof-of-concept web application for camera-only visual speech recognition (VSR) designed to support communication in intensive care settings.

The app records a short silent video clip of a patient mouthing words, sends the clip to a backend VSR model, and returns a predicted transcript that can be displayed and spoken aloud.


---

## 🔗 Live Demo

Frontend (GitHub Pages):

👉 https://nicholasanthony.github.io/ICU-VSR/

---

## 🧠 Purpose

This project explores whether visual speech recognition can assist patients who are unable to speak, such as:

- Tracheostomy/Laryngectomy patients  
- Patients with voice impairment  
- Patients with ICU-acquired weakness  

---

## ✨ Features

- 📱 Mobile-friendly interface  
- 📷 Camera-only video capture  
- ⏱️ 5-second silent phrase recording  
- 🧠 Visual Speech Recognition backend  
- 📝 Transcript display  
- 🔊 Text-to-speech playback  
- 🎙️ Voice/accent selection  
- ⚡ Processing time display  
- 🛟 Manual safety phrase buttons  
- ⚙️ Adjustable backend endpoint  
- ⚠️ Intro screen with mandatory acknowledgement  

---

## ⚠️ Disclaimer

This is a **research prototype only**.

It is **not a certified medical device** and must not replace:

- Clinical judgement  
- Call bells  
- Emergency escalation pathways  
- Standard bedside communication methods  

---

## 📚 Models, Licensing & IP

This project uses third-party open-source visual speech recognition models and research code.

- The backend is based on the Auto-AVSR framework  
- Model weights are derived from LRS3-based visual speech recognition models  
- All underlying models, datasets, and research code remain the intellectual property of their original authors  

Use, redistribution, modification, or deployment must comply with:

- Original project licences  
- Model licensing terms  
- Dataset usage restrictions  
- Institutional governance and ethics requirements  

---

## 🖥️ Frontend Tech Stack

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg" width="40" /> <img src="https://github.com/devicons/devicon/blob/v2.17.0/icons/tailwindcss/tailwindcss-original.svg" width="40" />
- React, Vite, Tailwind CSS  
- MediaRecorder API (camera capture)  
- Web Speech API (text-to-speech)  

---

## 🔌 Backend

The frontend communicates with a separate backend API.

Default endpoint:
https://Nikachu86-icu-vsr-backend.hf.space/vsr

---

## 📱 Mobile Support

Ensure your index.html includes:

<meta name="viewport" content="width=device-width, initial-scale=1.0" />

---

## 🔮 Future Directions

- ICU-specific phrase optimisation
- Confidence scoring
- Eye-tracking / hands-free interaction
- GPU backend acceleration
- Clinical validation studies

---

## 📄 Licence

This repository covers the frontend application only unless otherwise stated.

All third-party models, datasets, and backend components are subject to their own licences.

---

## 👨‍⚕️ Author

Nicholas Anthony
Clinical Nurse & ICU Researcher
Perth, Western Australia

