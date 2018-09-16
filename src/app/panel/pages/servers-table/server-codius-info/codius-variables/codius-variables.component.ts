import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ServiceStateModalComponent} from '../../service-state-modal/service-state-modal.component';
import {CodiusVariablesEnum, ServerCodius} from '../../../../models/server-codius';
import {UtilsService} from '../../../../services/utils.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Message, MessageCommands, MessageTypes} from '../../../../models/message';


interface Versioning {
  number: string;
  variables: CodiusVariablesEnum[];
}

@Component({
  selector: 'app-codius-variables',
  templateUrl: './codius-variables.component.html',
  styleUrls: ['./codius-variables.component.scss']
})
export class CodiusVariablesComponent implements OnInit {
  codius: ServerCodius;
  variablesForm: FormGroup;
  deleteArray: FormGroup;
  variables: any[] = [];
  variables_changed: any[] = [];
  versioning: Versioning[] = [
    {
      number: '1.2.4',
      variables: [
        CodiusVariablesEnum.CODIUS_SELF_TEST_INTERVAL,
        CodiusVariablesEnum.CODIUS_SELF_TEST_RETRIES
      ]
    }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ServiceStateModalComponent>,
              private fb: FormBuilder,
              private utils: UtilsService) {
    this.variablesForm = this.makeFormGroup();
    console.log(this.variablesForm);
  }

  ngOnInit() {
    this.codius = this.data.codius;
    this.initVariables();
  }

  initVariables() {
    for (const key of Object.keys(CodiusVariablesEnum)) {
      const used = this.data.codius.variables.find((v) => v.name === key);
      if (used) {
        this.variables.push({name: key, value: used.value, enabled: true});
      } else {
        this.variables.push({name: key, value: '', enabled: true});
      }
    }
    if (this.codius.version) {
      this.disableVersionVars();
    }
  }

  onSubmit() {
    if (!this.variablesForm.valid) {
      return;
    }
    Object.keys(CodiusVariablesEnum).forEach(key => {
      if (this.variablesForm.get(key).value.length > 0) {
        let del = false;
        if (this.variablesForm.get(key + '_checkbox').value) {
          del = true;
        }
        this.variables_changed.push({name: key, value: this.variablesForm.get(key).value, delete: del});
      }
      if (this.variablesForm.get(key + '_checkbox').value && !this.variables_changed.find(e => e.name === key)) {
        this.variables_changed.push({name: key, value: '', delete: true});
      }
    });
    this.dialogRef.close(this.variables_changed);
  }

  disableVersionVars() {
    //disable variables for editing
    for (const version of this.versioning) {
      if (this.utils.versionCompare(version.number, this.codius.version, {lexicographical: true}) > 0) {
        for (const variable of this.variables) {
          if (version.variables.indexOf(CodiusVariablesEnum[CodiusVariablesEnum[variable.name]]) !== -1) {
            const index = this.variables.findIndex(item => item.name === variable.name);
            this.variables[index].enabled = false;
          }
        }
      }
    }
    return this.variables;
  }

  getErrorMessage(name: string) {
    return this.variablesForm.controls[name].hasError('maxlength') ? 'Max lenght 200' : '';
  }

  makeFormGroup() {
    let group: any = {};

    Object.keys(CodiusVariablesEnum).forEach(variable => {
      group[variable] = new FormControl('', Validators.maxLength(200));
      group[variable + '_checkbox'] = new FormControl(false);
    });
    return new FormGroup(group);
  }

  navToDoc() {
    window.open('https://github.com/codius/codiusd', '_blank');
  }
}
