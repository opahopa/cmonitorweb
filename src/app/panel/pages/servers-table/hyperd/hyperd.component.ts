import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ServiceStateModalComponent} from '../service-state-modal/service-state-modal.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CodiusVariablesEnum} from '../../../models/server-codius';

@Component({
  selector: 'app-hyperd',
  templateUrl: './hyperd.component.html',
  styleUrls: ['./hyperd.component.scss']
})
export class HyperdComponent implements OnInit {
  podsForm: FormGroup;
  // hyperd: any;
  error = {
    cli: ''
  };

  hyperd = {
    version: '1.1.1',
    pods: [
      {
        id: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
        name: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
        vm_name: 'vm-iewhfeh98fh8923hf89',
        status: 'active'
      },
      {
        id: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
        name: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
        vm_name: 'vm-iewhfeh98fh8923hf89',
        status: 'running'
      },
      {
        id: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
        name: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
        vm_name: 'vm-iewhfeh98fh8923hf89',
        status: 'deleted'
      },
      {
        id: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
        name: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
        vm_name: 'vm-iewhfeh98fh8923hf89',
        status: 'running'
      },
      {
        id: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
        name: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
        vm_name: 'vm-iewhfeh98fh8923hf89',
        status: ''
      },
      {
        id: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
        name: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
        vm_name: 'vm-iewhfeh98fh8923hf89',
        status: ''
      },
      {
        id: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
        name: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
        vm_name: 'vm-iewhfeh98fh8923hf89',
        status: ''
      },
    ]
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ServiceStateModalComponent>,
              private fb: FormBuilder) {
    this.podsForm = this.makeFormGroup();
  }

  ngOnInit() {
    // this.hyperd = this.data;
  }

  onSubmit() {
    if (!this.podsForm.valid) {
      return;
    }

    let result = [];
    for (let pod of this.hyperd.pods) {
      if (this.podsForm.get(pod.id + '_delete').value) {
        result.push(pod);
      }
    }
    this.dialogRef.close(result);
  }

  getErrorMessage(name: string) {
    return null;
  }

  makeFormGroup() {
    let group: any = {};


    if (this.hyperd) {
      this.hyperd.pods.forEach(pod => {
        group[pod.id + '_delete'] = new FormControl(false);
      });
    } else {
      this.error.cli = 'CodiusMonitor client is outdated. Please update to use this functionality.';
    }
    return new FormGroup(group);
  }
}
