import { FormControl, FormGroup } from "@angular/forms";

export interface DynamicForm {
  ID: string;
  table_name: string;
  fieldName: CustomField[];
  record_count: number;
}

export interface CustomField {
  fieldName: string;
  type: 'int' | 'string';
  mandatory: any;
  Group: string;
  isMulti: any;
  noChange: any;
}

export interface GroupControlerWrapper {
  groupName: string;
  items: CustomField [];
  child?: GroupControlerWrapper[] | undefined;
}

export interface ContorlControlerWrapper {
  fieldName: string;
  item: CustomField;
}
