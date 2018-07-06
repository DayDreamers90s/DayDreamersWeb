import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Auth } from '../../../providers/auth/auth';
import { CardCategoriesProvider } from '../../../providers/admin/cardcategories';
import { CardCategoryModel } from '../../../models/admin/cardCategoryModel';

@IonicPage()
@Component({
  selector: 'page-cardcategories',
  templateUrl: 'cardcategories.html',
})
export class CardcategoriesPage {
  private category: FormGroup;
  private editCategory: CardCategoryModel;
  private categories: CardCategoryModel[];

  constructor(private formBuilder: FormBuilder, public auth: Auth, public categoryProvider: CardCategoriesProvider) {
    this.category = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });
    this.categories = [];
    this.editCategory =new CardCategoryModel();
    this.getExistingCategories();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardcategoriesPage');
  }

  addCategory() {
    console.log(this.category.value);
    if (this.auth.checkAuthentication()) {
      this.categoryProvider.addCategory(this.category.value).then((res) => {
        this.categories.push(new CardCategoryModel(res));
        this.category.reset();
      });

    }
  }
  getExistingCategories() {
    this.categories = [];
    if (this.auth.checkAuthentication()) {
      this.categoryProvider.getCategories().then((res) => {
        for (var key in res) {
          if (res.hasOwnProperty(key)) {
            this.categories.push(new CardCategoryModel(res[key]));
          }
        }
      });

    }
  }


  EditCategory(category: CardCategoryModel) {
    this.editCategory = category;
  }

  updateCategory(){
    if (this.editCategory != undefined && this.editCategory._id != undefined) {
      this.categoryProvider.updateCategory(this.editCategory).then((res)=>{
        this.getExistingCategories();
        this.editCategory = new CardCategoryModel();
      });
    }
  }

  CancelUpdate(){
    this.editCategory = new CardCategoryModel();
    this.getExistingCategories();
  }

  DeleteCategory(category: CardCategoryModel) {
    if (category != undefined && category._id != undefined) {
      this.categoryProvider.deleteCategory(category._id).then((res) => {
        this.getExistingCategories();
      });
    }
  }

}
