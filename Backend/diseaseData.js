const diseasesData = [
    {
        "disease": "Heart Disease",
        "medicalEquipment": [
            { "name": "ECG Machine", "count": 2 },
            { "name": "Defibrillator", "count": 1 }
        ],
        "operationTheatres": [
            { "name": "Cardiac Surgery", "count": 1 }
        ],
        "doctors": [
            { "speciality": "Cardiologist", "count": 2 },
            { "speciality": "General Surgeon", "count": 1 }
        ]
    },
    {
        "disease": "Stroke",
        "medicalEquipment": [
            { "name": "MRI Machine", "count": 1 },
            { "name": "CT Scanner", "count": 1 }
        ],
        "operationTheatres": [],
        "doctors": [
            { "speciality": "Neurologist", "count": 2 }
        ]
    },
    {
        "disease": "Diabetes",
        "medicalEquipment": [
            { "name": "Glucose Meter", "count": 5 },
            { "name": "Insulin Pump", "count": 2 }
        ],
        "operationTheatres": [],
        "doctors": [
            { "speciality": "Endocrinologist", "count": 3 }
        ]
    },
    {
        "disease": "Pneumonia",
        "medicalEquipment": [
            { "name": "Ventilator", "count": 3 },
            { "name": "Oxygen Cylinder", "count": 5 }
        ],
        "operationTheatres": [],
        "doctors": [
            { "speciality": "Pulmonologist", "count": 2 }
        ]
    },
    {
        "disease": "Cancer",
        "medicalEquipment": [
            { "name": "Chemotherapy Machine", "count": 2 },
            { "name": "Radiation Therapy Machine", "count": 3 }
        ],
        "operationTheatres": [],
        "doctors": [
            { "speciality": "Oncologist", "count": 4 }
        ]
    },
    {
        "disease": "Appendicitis",
        "medicalEquipment": [
            { "name": "Ultrasound Machine", "count": 2 }
        ],
        "operationTheatres": [
            { "name": "General Surgery", "count": 1 }
        ],
        "doctors": [
            { "speciality": "General Surgeon", "count": 3 }
        ]
    },
    {
        "disease": "Gastritis",
        "medicalEquipment": [
            { "name": "Endoscope", "count": 2 },
            { "name": "Ultrasound Machine", "count": 1 }
        ],
        "operationTheatres": [],
        "doctors": [
            { "speciality": "Gastroenterologist", "count": 2 }
        ]
    },
    {
        "disease": "Eye Infection",
        "medicalEquipment": [
            { "name": "Ophthalmoscope", "count": 3 },
            { "name": "Eye Chart", "count": 1 }
        ],
        "operationTheatres": [],
        "doctors": [
            { "speciality": "Ophthalmologist", "count": 2 }
        ]
    },
    {
        "disease": "Kidney Stones",
        "medicalEquipment": [
            { "name": "Ultrasound Machine", "count": 2 }
        ],
        "operationTheatres": [],
        "doctors": [
            { "speciality": "Urologist", "count": 2 }
        ]
    },
    {
        "disease": "Hernia",
        "medicalEquipment": [],
        "operationTheatres": [
            { "name": "General Surgery", "count": 1 }
        ],
        "doctors": [
            { "speciality": "General Surgeon", "count": 2 }
        ]
    }
];

module.exports = diseasesData;