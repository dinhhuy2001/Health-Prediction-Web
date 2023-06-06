import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import CheckChatLogin from '../components/CheckChatLogin';

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

    const handlePrediction = (e) => {
        try {
            e.preventDefault();
            const requestFile = list.toString();
            console.log({ requestFile: requestFile });
            axios
                .get(`http://127.0.0.1:5000/predict?requestFile=${requestFile}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'no-cors',
                })
                .then((res, data) => {
                    setResultPrediction(res.data);
                });
        } catch (error) {
            // Handle any errors that occur during the request
            console.log(error);
        }
    };
    return (
        <div className="py-5 predict">
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
            <div className="symptomps-list mb-3">
                <div className="container text-center">
                    <div className="row symptomps-container g-2">
                        {list.sort().map((value, id) => (
                            <div key={id} className="col-6 col-md-4 col-lg-3 symptomp-item">
                                {value}
                                <div className="symptomp-delete" onClick={() => handleDelete(id)}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mb-3 text-center">
                <button type="button" className="btn btn-info" onClick={handlePrediction}>
                    Predict
                </button>
            </div>
            <div className="mb-3 text-center">
                <div className="h4 result-title">
                    Result:
                    <span className="result">{resultPrediction}</span>
                </div>
            </div>
            <div className="symptomps">
                <div className="container text-center">
                    <div className="row g-2 symptomps-container align-items-center">
                        {listBellow
                            .sort()
                            .filter((name) => name.match(new RegExp(searchValue, 'i')))
                            .map((value, id) => (
                                <div
                                    key={id}
                                    className="col-6 col-md-4 col-lg-4 symptomp-item "
                                    onClick={() => handleSymptomps(value)}
                                >
                                    {value}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <CheckChatLogin />
        </div>
    );
};

export default Predict;
