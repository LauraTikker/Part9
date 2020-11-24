import patients from '../../data/patients';
import { NonSensitiveEntries } from '../../data/patients';
import { Patient }  from '../types';

const getPatients = (): Array<Patient> => {
    return patients;
};

const getNonSensitiveInfoFromPatients = (): NonSensitiveEntries[] => {
    return patients.map(( { id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getPatients,
    getNonSensitiveInfoFromPatients
};