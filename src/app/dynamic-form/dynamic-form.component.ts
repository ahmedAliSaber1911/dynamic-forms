import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  DynamicForm,
  GroupControlerWrapper,
  ContorlControlerWrapper,
  CustomField,
} from '../models/main-model';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  @Input() formData!: DynamicForm;

  groupsControls: GroupControlerWrapper[] = [];

  controls_fields: ContorlControlerWrapper[] = [];

  isLoaded = false;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const groupsControlsNames: string[] = [];

    this.formData.fieldName.forEach((dynamicFormItem) => {
      if (!!dynamicFormItem.Group) {
        groupsControlsNames.push(dynamicFormItem.Group);
      } else {
        this.controls_fields.push({
          fieldName: dynamicFormItem.fieldName,
          item: dynamicFormItem,
        });
      }
    });

    const parentControlsNames = Array.from(new Set(groupsControlsNames)).filter(
      (res) => !res.includes('$')
    );

    const childerensNames = Array.from(new Set(groupsControlsNames)).filter(
      (res) => res.includes('$')
    );

    const parentsControls = parentControlsNames.map((groupName: string) => {
      const itemsInsedTheGroup = this.formData.fieldName.filter(
        (res) => res.Group === groupName
      );

      return {
        groupName,
        items: itemsInsedTheGroup,
      };
    });

    const childerenControls = childerensNames.map((childGroupName: string) => {
      const itemsInsedTheGroup = this.formData.fieldName.filter(
        (res) => res.Group === childGroupName
      );

      return {
        groupName: childGroupName,
        items: itemsInsedTheGroup,
      };
    });

    this.groupsControls = parentsControls.map((parentGroup) => {
      const child = childerenControls.filter((childGroup) =>
        childGroup.groupName.startsWith(parentGroup.groupName + '$')
      ) as GroupControlerWrapper[];

      return { ...parentGroup, child: child };
    });

    this.groupsControls.forEach((group) => {
      const intialFormGroup = this.getFormGroup(group.items)

      this.form.addControl(group.groupName, this.fb.array([intialFormGroup]));

      group.child?.forEach((childGroup) => {
        const intialChildFormGroup = this.getFormGroup(childGroup.items);

        (this.form.get(group.groupName)?.get('0') as FormGroup).addControl(
          childGroup.groupName,
          this.fb.array([intialChildFormGroup])
        );
      });
    });

    this.controls_fields.forEach((fieldItem) => {
      const validators = fieldItem.item.mandatory
        ? [Validators.required]
        : undefined;
      const intialItem = this.fb.control(null, validators);

      if (fieldItem.item.isMulti) {
        this.form.addControl(
          fieldItem.item.fieldName,
          this.fb.array([intialItem])
        );
      } else {
        this.form.addControl(fieldItem.item.fieldName, intialItem);
      }
    });

    // console.log(this.form.value, 'value');
    // console.log(this.form, 'form');
    // console.log(this.groupsControls, 'controls');

    // console.log(
    //   this.form.get('student')?.get('0')?.get('student$contactDetail')?.get('0')
    //     ?.value
    // );

    this.isLoaded = true;
  }

  addFormGroupToArray(
    formArray: FormArray,
    nestedItems: CustomField[],
    child?: GroupControlerWrapper
  ): void {
      const freshClone = this.getFormGroup(nestedItems);

      if (child) {
        const intialFormGroup = this.getFormGroup(child.items)

        freshClone.addControl(
          child.groupName,
          this.fb.array([intialFormGroup])
        );
      }

      formArray.push(freshClone);
  }

  addFormControlToArray(formArray: FormArray, nestedItems: AbstractControl | null){
    const freshClone = this.fb.control(nestedItems); // get Deep Copy
    freshClone.setValue(null); // reset workaround;
    formArray.push(freshClone);

  }


  getFormGroup(items: CustomField[]): FormGroup{

    const intialValue = new FormGroup({});

    items.forEach((field) => {
      const validators = field.mandatory ? [Validators.required] : undefined;

      intialValue.addControl(
        field.fieldName,
        this.fb.control(null, validators)
      );
    });

    return intialValue;
  }

  removeFromArray(formArray: FormArray, index: number): void {
    formArray.removeAt(index);
  }

  getFormArray(arrayAccessor: string): FormArray {
    return this.form.get(arrayAccessor) as FormArray;
  }

  getFormNestedFormArray(
    parent: string,
    index: number,
    arrayAccessor: string
  ): FormArray {
    return this.form
      .get(parent)
      ?.get(index.toString())
      ?.get(arrayAccessor) as FormArray;
  }

  submit(): void {
    console.log(this.form.value);
  }

  cancel(): void {
    this.form.reset();
  }
}
