import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProductService } from 'app/shared/services/product/product.service';
import { CategoryGroupService } from 'app/shared/services/category-group/category-group.service';
import { SupplierService } from 'app/shared/services/supplier/supplier.service';
import { FeatureService } from 'app/shared/services/feature/feature.service';

import { GENDER } from 'app/shared/constants/constants';

declare var Cropper: any;

@Component({
  selector: 'mix-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy {
  @ViewChild('productImagePreview') productImagePreview;
  product: any;
  editProductForm: FormGroup;
  categories: any[] = [];
  suppliers: any[] = [];
  productImage: File;
  features: any[] = [];
  gender: any = GENDER;
  cropper: any;
  isSelectImage: boolean = false;
  formData: FormData = new FormData;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryGroupService: CategoryGroupService,
    private supplierService: SupplierService,
    private featureService: FeatureService
  ) { }

  ngOnInit() {
    this.editProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      category: ['', Validators.required],
      supplier: ['', Validators.required],
      features: [],
      gender: ['', Validators.required],
      active: [true, Validators.required ]
    });

    this.getSuppliers();
    this.getFeatures();
    this.patchValue();

    this.cropper = new Cropper(this.productImagePreview.nativeElement, {
      aspectRatio: 3 / 4,
      viewMode: 1
    });

  }

  ngOnDestroy() {
    this.getProducts();
  }

  patchValue() {
    setTimeout(() => {
      this.editProductForm.patchValue({
        name: this.product.name,
        price: this.product.price,
        discount: this.product.discount,
        category: this.product.category.id,
        supplier: this.product.supplier.id,
        gender: this.product.gender,
        active: this.product.active,
      });
      let features: any[] = [];
      this.product.featureValues.forEach(val => {
        features.push(val.id);
      });
      this.getCategories(this.product.gender);
      this.editProductForm.controls.features.setValue(features);
    });
  }

  getCategories(genderId: number) {
    this.categoryGroupService.getByGender(genderId)
    .subscribe(res => {
      this.categories = [];
      res.data.forEach(categoryGroup => {
        this.categories = this.categories.concat(categoryGroup.categories);
      });
    })
  }

  getSuppliers() {
    this.supplierService.getAll()
    .subscribe(res => {
      this.suppliers = res.data;
    });
  }

  getFeatures() {
    this.featureService.getAll()
    .subscribe(res => {
      this.features = res.data;
    });
  }

  getProducts() {
    this.productService.getAll()
    .subscribe(res => {
      this.productService.products = res.data;
    });
  }

  imageUploaded(e) {
    let oFReader = new FileReader();
    
    oFReader.readAsDataURL(e.file);
    oFReader.onload = (oFREvent) => {
      this.cropper.destroy();
      this.isSelectImage = true;
      this.cropper.replace(oFREvent.target['result']);
    }
  }

  imageRemoved() {
    this.isSelectImage = false;
    this.cropper.destroy();
  }

  onSubmit() {
    if (this.editProductForm.valid) {
      if (this.isSelectImage) {
        this.cropper.getCroppedCanvas().toBlob((productImage) => {
          this.formData.append('img', productImage);
        });
      }
      setTimeout(() => {
        this.sendData();
      }) 
    }
  }

  sendData() {
    for (let name in this.editProductForm.value) {
      this.formData.append(name, this.editProductForm.value[name]);
    }

    this.productService.add(this.formData)
    .subscribe(res => {
      this.bsModalRef.hide();
    });
  }
}
