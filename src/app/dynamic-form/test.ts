import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { GroupControlerWrapper } from '../models/main-model';

let groups: GroupControlerWrapper[] = [
  {
    groupName: 'addressDetail',
    items: [
      {
        fieldName: 'street',
        type: 'string',
        mandatory: true,
        Group: 'addressDetail',
        isMulti: false,
        noChange: false,
      },
      {
        fieldName: 'zipCode',
        type: 'int',
        isMulti: false,
        mandatory: true,
        noChange: false,
        Group: 'addressDetail',
      },
      {
        fieldName: 'buildingNo',
        type: 'int',
        isMulti: '',
        mandatory: true,
        noChange: '',
        Group: 'addressDetail',
      },
    ],

    child: [{
      groupName: 'addressDetail',
      items: [
        {
          fieldName: 'street',
          type: 'string',
          mandatory: true,
          Group: 'karim$addressDetail',
          isMulti: false,
          noChange: false,
        },
        {
          fieldName: 'zipCode',
          type: 'int',
          isMulti: false,
          mandatory: true,
          noChange: false,
          Group: 'student$addressDetail',
        },
        {
          fieldName: 'buildingNo',
          type: 'int',
          isMulti: '',
          mandatory: true,
          noChange: '',
          Group: 'student$addressDetail',
        },
      ],

    }]
  },
];
let controls = [];

let form = new FormGroup({

  addressDetail: new FormArray([
    new FormGroup({
      street: new FormControl('2'),
      zipCode: new FormControl(),

      student$details : new FormArray([
        new FormGroup({
          phnoeNumber: new FormControl(),
          releation: new FormControl()
        })
      ])
    }),

  ]),

  x: new FormControl(),

  Y: new FormArray([new FormControl()])
});

let x = {
  ID: 'tabletest1',
  table_name: 'tabletest1',
  fieldName: [
    {
      fieldName: 'street',
      type: 'string',
      mandatory: true,
      Group: 'addressDetail',
    },
    {
      fieldName: 'zipCode',
      type: 'int',
      isMulti: false,
      mandatory: true,
      noChange: false,
      Group: 'addressDetail',
    },
    {
      fieldName: 'buildingNo',
      type: 'int',
      isMulti: '',
      mandatory: true,
      noChange: '',
      Group: 'addressDetail',
    },
    {
      fieldName: 'StudentName',
      type: 'string',
      isMulti: '',
      mandatory: '',
      noChange: '',
      Group: '',
    },
    {
      fieldName: 'phoneNumbers',
      type: 'string',
      isMulti: true,
      mandatory: '',
      noChange: '',
      Group: '',
    },
  ],
  record_count: 1,
};
