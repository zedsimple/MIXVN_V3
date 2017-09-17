import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ProductGroupService } from 'app/shared/services/product-group/product-group.service';

@Component({
  selector: 'mix-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent implements OnInit {
  addProductGroupForm: FormGroup;
  productGroupImage: File;
  productImages: File[] = [];
  productIds: any[] = [];
  selectedProduct: any = {};
  formData: FormData = new FormData;
  isPending: boolean = false;

  constructor(
    public snackBar: MdSnackBar,
    private fb: FormBuilder,
    private productGroupService: ProductGroupService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.addProductGroupForm = this.fb.group({
      active: [true, Validators.required],
      products: this.fb.array([])
    });
  }

  initProduct() {
    return this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      discount: [''],
      category: ['', Validators.required],
      supplier: ['', Validators.required],
      features: [''],
      active: [true, Validators.required]
    });
  }

  addProduct() {
    let control = <FormArray>this.addProductGroupForm.controls.products;
    control.push(this.initProduct());
  }

  removeProduct(i) {
    let control = <FormArray>this.addProductGroupForm.controls.products;
    control.removeAt(i);
  }

  addProductId(e) {
    if (!this.selectedProduct[e.index]) {
      this.productIds.push(e.productId);
      this.selectedProduct[e.index] = this.productIds.length;
    } else {
      this.productIds[this.selectedProduct[e.index] - 1] = e.productId;
    }
  }
  

  imageUploaded(e, name: string) {
    if (name === 'product_group_image') {
      this.productGroupImage = e.file;
    }
  }

  imageRemoved(e, name: string) {
    if (name === 'product_group_image') {
      this.productGroupImage = undefined;
    }
  }
  
  productImageChange(e) {
    this.productImages[e.index] = e.productImage;
  }

  onSubmit() {
    if (!this.isPending) {
      if (this.addProductGroupForm.valid && this.productGroupImage) {
        this.isPending = true;
        let valid: boolean = true;

        this.formData.append('img', this.productGroupImage, this.productGroupImage.name);
        this.formData.append('active', this.addProductGroupForm.value.active);
        this.productIds.forEach((val, i) => {
          this.formData.append(`productIds[${i}]`, val);
        });
        console.log(this.addProductGroupForm.controls);

        this.addProductGroupForm.controls.products['controls'].forEach((val, i) => {
          if (!this.selectedProduct[i]) {
            if (!this.productImages[i]) {
              valid = false;
              this.openSnackBar('Please upload product image');
              return;
            }

            this.formData.append(`products[${i}][img]`, this.productImages[i], this.productImages[i].name);
            this.formData.append(`products[${i}][name]`, val.value.name);
            this.formData.append(`products[${i}][price]`, val.value.price);
            this.formData.append(`products[${i}][discount]`, val.value.discount);
            this.formData.append(`products[${i}][category]`, val.value.category);
            this.formData.append(`products[${i}][supplier]`, val.value.supplier);
            this.formData.append(`products[${i}][features]`, val.value.features);
            this.formData.append(`products[${i}][active]`, val.value.active);
          }
        });
        
        if (valid) {
          this.productGroupService.add(this.formData)
          .subscribe(res => {
            this.isPending = false;
            this.openSnackBar('Successfully Added New Product Group');
            this.resetForm();
          });
        }
      } else {
        this.openSnackBar('Please fill in all require field');
        this.isPending = false;
      }
    }
  }

  resetForm() {
    this.addProductGroupForm.reset();
    this.addProductGroupForm.controls.active.setValue(true);
    let length = this.addProductGroupForm.controls.products['controls'].length;
    for (let i = length - 1; i > -1; i--) {
      this.removeProduct(i);
    }
    this.productIds = [];
    this.productImages = [];
    this.selectedProduct = {};
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'x', {
      duration: 5000,
    });
  }
}