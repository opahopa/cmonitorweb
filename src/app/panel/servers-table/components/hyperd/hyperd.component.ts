import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ServiceStateModalComponent} from '../service-state-modal/service-state-modal.component';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-hyperd',
  templateUrl: './hyperd.component.html',
  styleUrls: ['./hyperd.component.scss']
})
export class HyperdComponent implements OnInit {
  podsForm: FormGroup;
  removeAll = false;
  hyperd: any;
  error = {
    cli: ''
  };

  // hyperd = {
  //   version: '1.1.1',
  //   pods: [
  //     {
  //       id: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
  //       name: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
  //       vm_name: 'vm-iewhfeh98fh8923hf89',
  //       status: 'active'
  //     },
  //     {
  //       id: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
  //       name: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
  //       vm_name: 'vm-iewhfeh98fh8923hf89',
  //       status: 'running'
  //     },
  //     {
  //       id: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
  //       name: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
  //       vm_name: 'vm-iewhfeh98fh8923hf89',
  //       status: 'deleted'
  //     },
  //     {
  //       id: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
  //       name: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
  //       vm_name: 'vm-iewhfeh98fh8923hf89',
  //       status: 'running'
  //     },
  //     {
  //       id: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
  //       name: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
  //       vm_name: 'vm-iewhfeh98fh8923hf89',
  //       status: ''
  //     },
  //     {
  //       id: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
  //       name: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
  //       vm_name: 'vm-iewhfeh98fh8923hf89',
  //       status: ''
  //     },
  //     {
  //       id: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
  //       name: 'oihowhu3hroihrio34hroi3htio43igob34ogbb34oib',
  //       vm_name: 'vm-iewhfeh98fh8923hf89',
  //       status: ''
  //     },
  //   ]
  // }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ServiceStateModalComponent>,
              private fb: FormBuilder) {
    this.hyperd = this.data.hyperd;

  }

  ngOnInit() {
    this.podsForm = this.makeFormGroup();
    console.log(this.hyperd);
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
    this.dialogRef.close({pods: result, all: this.removeAll});
  }

  getErrorMessage(name: string) {
    return null;
  }

  removeAllBtn() {
    this.removeAll ? this.removeAll = false : this.removeAll = true;
    for (const pod of this.hyperd.pods) {
        this.podsForm.get(pod.id + '_delete').setValue(this.removeAll);
    }
  }

  makeFormGroup() {
    let group: any = {};

    if (this.hyperd.pods && this.hyperd.pods.length > 0) {
      this.hyperd.pods.forEach(pod => {
        group[pod.id + '_delete'] = new FormControl(false);
      });
    } else {
      // this.error.cli = 'CodiusMonitor client is outdated. Please update to use this functionality.';
    }
    return new FormGroup(group);
  }
}
