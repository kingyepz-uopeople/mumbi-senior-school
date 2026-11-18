interface Grade10Intake {
  year: number;
  reportingDate: string;
  reportingDateProvisional: boolean;
  fees: {
    amounts: { label: string; amountKes: number }[];
    scheduleUrl?: string;
  };
}

// Keep intake-specific information here. Only publish school-approved fees.
export const grade10Intake: Grade10Intake = {
  year: 2027,
  reportingDate: '2027-01-18',
  reportingDateProvisional: true,
  fees: {
    amounts: [],
  },
};
