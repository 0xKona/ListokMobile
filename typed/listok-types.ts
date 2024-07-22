export interface ListokInterface {
  id: string | null;
  title: string | null;
  desc: string | null;
  picture: string | null;
  days: {
    mon: string[];
    tue: string[];
    wed: string[];
    thu: string[];
    fri: string[];
    sat: string[];
    sun: string[];
  };
  createdBy: string | null;
  createdByName: string | null;
  createdOn: string | null;
}

export interface ListokStepInterface {
  stepNumber: number;
  completed: boolean;
  errors: boolean;
}
