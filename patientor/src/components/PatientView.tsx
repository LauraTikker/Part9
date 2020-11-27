import React from "react";
import axios from "axios";
import { Icon, Container, Divider, Grid, GridRow, GridColumn, Segment, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state/state";
import { Patient, Entry } from "../types";
import { updatePatient } from '../state/reducer';
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import { HospitalEntryFormValues, OccupationalHealthcareEntryFormValues, HealthCheckEntryFormValues } from "../AddEntryModal/AddEntryForm";
import HealthCheckEntry from "./HealthCheckEntry";
import { assertNever } from "../utils";
import AddEntryModal from "../AddEntryModal";

const PatientView: React.FC = () => {
  const [{ patients, diagnoses}, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {

    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const patient = Object.values(patients).find((patient: Patient) => patient.id === id);

    if (!patient?.ssn) {
      fetchPatient();
    }
  // eslint-disable-next-line
  }, [dispatch, id]);

  const patient = Object.values(patients).find((patient: Patient) => patient.id === id);

  const submitNewEntry = async (values: HospitalEntryFormValues | OccupationalHealthcareEntryFormValues | HealthCheckEntryFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(updatePatient(newPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const genderNameForIcon = (gender: string): string => {
    switch(gender) {
      case 'male':
        return "mars";
      case 'female':
        return "venus";
      default:
        return "genderless";
    }
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch(entry.type) {
      case 'Hospital':
        return <HospitalEntry entry={entry}/>;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntry entry={entry}/>;
      case 'HealthCheck':
        return <HealthCheckEntry entry={entry}/>;
      default:
        return assertNever(entry);
    }
  };

  if (patient && diagnoses)  {
  
    const gender = genderNameForIcon(patient.gender);
    
    return (
      <div >
        <Container>
          <h3>{patient.name} 
          <Icon className={gender} size="big"></Icon>
          </h3>
        </Container>
        <Divider></Divider>
        <Grid columns={2} divided relaxed stretched>
          <GridRow>
            <GridColumn>
            <Segment>
            <div>
              <p>Ssn: {patient.ssn}</p>
            </div>
              <div>
                <p>Occupation: {patient.occupation}</p>
              </div>
              <div>
              <p>Date of Birth: {patient.dateOfBirth}</p>
              </div>
            </Segment>
          </GridColumn>
          <GridColumn  textAlign='center'>
            <Segment>
            <AddEntryModal
              modalOpen={modalOpen}
              onSubmit={submitNewEntry}
              error={error}
              onClose={closeModal}
            />
              <Button onClick={() => openModal()}>Add New Entry</Button>
            </Segment>
          </GridColumn>
          </GridRow>
        </Grid>
        <Divider></Divider>
        <Container>
          <h3>Entries
            <Icon className="info" size="small"></Icon>
          </h3>
        </Container>
          {patient.entries.map(entry => (
            <Grid key={entry.id} padded>
              <GridRow>
                <GridColumn>
                  <Segment>
                   {EntryDetails({entry})}
                  </Segment>
                </GridColumn>
              </GridRow>
            </Grid>
          ))}
      </div>
    );
  } else {
    return null;
  }
};

export default PatientView;