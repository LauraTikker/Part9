import React from "react";
import { HealthCheckEntry } from "../types";
import { useStateValue } from "../state/state";
import { Icon, Rating } from "semantic-ui-react";

export interface EntryProps {
    entry: HealthCheckEntry;
}

const HealthCheckEntryComponent: React.FC<EntryProps> = (props) => {
  const [{ diagnoses},] = useStateValue();
    const entry = props.entry;

  return (
    <div >
    <h2>{entry.date}
    <Icon className="check" size="big"></Icon>
    </h2>
    <p>{entry.description}</p>
    <p>Specialist: {entry.specialist}</p>

    {entry.diagnosisCodes ? (
      <div className="entries-diagnosis-code">
            {entry.diagnosisCodes.map(code => {
            const diagnosis = Object.values(diagnoses).find(diagnosis => diagnosis.code === code);

        return  (<li key={code}>{code} {diagnosis?.name}</li>);
        })}
      </div>) 
    : null}

    <Rating icon="heart" disabled rating={entry.healthCheckRating} maxRating={4} />
    </div>
  );
};

export default HealthCheckEntryComponent;