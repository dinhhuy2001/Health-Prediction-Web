import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import CheckChatLogin from '../components/CheckChatLogin';
import Doctor from '../components/Doctor';

const symptomps = [
    'Itching',
    'Skin Rash',
    'Nodal Skin Eruptions',
    'Continuous Sneezing',
    'Shivering',
    'Chills',
    'Joint Pain',
    'Stomach Pain',
    'Acidity',
    'Ulcers On Tongue',
    'Muscle Wasting',
    'Vomiting',
    'Burning Micturition',
    'Spotting Urination',
    'Fatigue',
    'Weight Gain',
    'Anxiety',
    'Cold Hands And Feets',
    'Mood Swings',
    'Weight Loss',
    'Restlessness',
    'Lethargy',
    'Patches In Throat',
    'Irregular Sugar Level',
    'High Fever',
    'Sunken Eyes',
    'Breathlessness',
    'Sweating',
    'Dehydration',
    'Indigestion',
    'Headache',
    'Yellowish Skin',
    'Dark Urine',
    'Nausea',
    'Loss Of Appetite',
    'Pain Behind The Eyes',
    'Back Pain',
    'Constipation',
    'Abdominal Pain',
    'Diarrhoea',
    'Mild Fever',
    'Yellow Urine',
    'Yellowing Of Eyes',
    'Acute Liver Failure',
    'Fluid Overload',
    'Swelling Of Stomach',
    'Swelled Lymph Nodes',
    'Malaise',
    'Blurred And Distorted Dision',
    'Phlegm',
    'Throat Irritation',
    'Redness Of Eyes',
    'Sinus Pressure',
    'Runny Nose',
    'Congestion',
    'Chest Pain',
    'Weakness In Limbs',
    'Fast Heart Rate',
    'Pain During Bowel Movements',
    'Pain In Anal Region',
    'Bloody Stool',
    'Irritation In Anus',
    'Neck Pain',
    'Dizziness',
    'Cramps',
    'Bruising',
    'Obesity',
    'Swollen Legs',
    'Swollen Blood Vessels',
    'Puffy Face And Eyes',
    'Enlarged Thyroid',
    'Brittle Nails',
    'Swollen Extremeties',
    'Excessive Hunger',
    'Extra Marital Contacts',
    'Drying And Tingling Lips',
    'Slurred Speech',
    'Knee Pain',
    'Hip Joint Pain',
    'Muscle Weakness',
    'Stiff Neck',
    'Swelling Joints',
    'Movement Stiffness',
    'Spinning Movements',
    'Loss Of Balance',
    'Unsteadiness',
    'Weakness Of One Body Side',
    'Loss Of Smell',
    'Bladder Discomfort',
    'Foul Smell Of Urine',
    'Continuous Feel Of Urine',
    'Passage Of Gases',
    'Internal Itching',
    'Toxic Look(Typhos)',
    'Depression',
    'Irritability',
    'Muscle Pain',
    'Altered Sensorium',
    'Red Spots Over Body',
    'Belly Pain',
    'Abnormal Menstruation',
    'Dischromic Patches',
    'Watering From Eyes',
    'Increased Appetite	Polyuria',
    'Family History',
    'Mucoid Sputum',
    'Rusty Sputum',
    'Lack Of Concentration',
    'Visual Disturbances',
    'Receiving Blood Transfusion',
    'Receiving Unsterile Injections',
    'Coma',
    'Stomach Bleeding',
    'Distention Of Abdomen',
    'History Of Alcohol Consumption',
    'Fluid Overload',
    'Blood In Sputum',
    'Prominent Veins On Calf',
    'Palpitations',
    'Painful Walking',
    'Pus Filled Pimples',
    'Blackheads',
    'Scurring',
    'Skin Peeling',
    'Silver Like Dusting',
    'Small Dents In Nails',
    'Inflammatory Nails',
    'Blister',
    'Red Sore Around Nose',
    'Yellow Crust Ooze',
];

const Predict = () => {
    const [list, setList] = useState([]);

    const [listBellow, setListBellow] = useState(symptomps);

    const [searchValue, setSearchValue] = useState('');

    const [resultPrediction, setResultPrediction] = useState('');

    const [diseaseInfo, setDiseaseInfo] = useState({});

    const [doctorSuggest, setDoctorSuggest] = useState({});

    const [diseases, setDiseases] = useState([]);

    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        axios
            .get('https://raw.githubusercontent.com/dinhhuy2001/fake-data-for-finalPbl/master/doctors.json')
            .then((res) => setDoctors(res.data));
    }, []);

    useEffect(() => {
        axios
            .get('https://raw.githubusercontent.com/dinhhuy2001/fake-data-for-finalPbl/master/diseases.json')
            .then((res) => setDiseases(res.data));
    }, []);

    const handleSymptomps = (e) => {
        setList([...list, e]);
        const newListBellow = listBellow.filter((i, _) => i !== e);
        setListBellow(newListBellow);
    };

    const handleDelete = (index) => {
        const newList = list.filter((_, i) => i !== index);
        setListBellow([...listBellow, list[index]]);
        setList(newList);
    };

    const handlePrediction = async (e) => {
        try {
            e.preventDefault();
            const requestFile = list.toString();
            await axios
                .get(`https://tdhuy.pythonanywhere.com/predict?requestFile=${requestFile}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'no-cors',
                })
                .then((res, data) => {
                    setResultPrediction(res.data);
                });
            document.querySelector('.predict-container').classList.remove('none');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        for (let i = 0; i < diseases.length; ++i) {
            if (diseases[i].name === resultPrediction) {
                setDiseaseInfo(diseases[i]);
            }
        }
    }, [resultPrediction]);

    useEffect(() => {
        for (let j = 0; j < doctors.length; ++j) {
            if (diseaseInfo.speciality === doctors[j].specialize) {
                setDoctorSuggest(doctors[j]);
            }
        }
    }, [diseaseInfo, doctors]);

    const handleDetail = () => {
        document.querySelector('.disease-doctor').classList.toggle('none');
    };

    const handleReset = () => {
        document.querySelector('.disease-doctor').classList.add('none');
        document.querySelector('.predict-container').classList.add('none');
        setSearchValue('');
        setList([]);
    };
    return (
        <div className="py-5 predict" style={{ backgroundColor: '#f6f7fb' }}>
            <div className="mb-3">
                <div className="symptomp-search container d-flex ">
                    <div className="search-icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <input
                        className="search-input"
                        type="text"
                        name="search"
                        placeholder="search your symptom"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
            </div>
            <div className="mb-3">
                <div className="container text-center">
                    <div className="row g-3">
                        {list.sort().map((value, id) => (
                            <div key={id} className="col-6 col-md-4 col-lg-4">
                                <div className="w-80 symptomp-item">
                                    {value}
                                    <div className="symptomp-delete" onClick={() => handleDelete(id)}>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mb-3 d-flex justify-content-center align-items-center" style={{ gap: '20px' }}>
                <button type="button" className="btn btn-info" onClick={handlePrediction}>
                    Predict
                </button>
                <button type="button" className="btn btn-danger" onClick={handleReset}>
                    Reset
                </button>
            </div>
            <div className="container">
                <div className="bg-light mb-3 predict-container none">
                    <div className="d-flex justify-content-between align-items-center predict-header">
                        <span>You may have:</span>
                        <span className="predict-result">{resultPrediction}</span>
                        <span className="click-detail d-flex align-items-center" onClick={handleDetail}>
                            Click to see detail... <FontAwesomeIcon className="ms-2" icon={faChevronDown} />
                        </span>
                    </div>
                    <div className="row g-3 disease-doctor none">
                        <div className="disease-info col-12 col-md-6 col-lg-8">
                            <h5>{diseaseInfo.description}</h5>
                            <h5>Symptomps: {diseaseInfo.symptom}</h5>
                        </div>
                        <Doctor key={doctorSuggest.id} doctor={doctorSuggest} />
                    </div>
                </div>
            </div>
            <div className="container mx-auto ">
                <div className="row g-3">
                    {listBellow
                        .sort()
                        .filter((name) => name.match(new RegExp(searchValue, 'i')))
                        .map((value, id) => (
                            <div key={id} className="col-6 col-md-4 col-lg-4" onClick={() => handleSymptomps(value)}>
                                <div className="w-80 text-center mx-auto symptomp-item">{value}</div>
                            </div>
                        ))}
                </div>
            </div>
            <CheckChatLogin />
        </div>
    );
};

export default Predict;
