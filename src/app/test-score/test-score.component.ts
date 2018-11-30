import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';


export interface ITest {
  id?: number;
  testName: string;
  pointsPossible: number;
  pointsReceived: number;
  percentage: number;
  grade: string;
}

@Component({
  selector: 'app-test-score',
  templateUrl: './test-score.component.html',
  styleUrls: ['./test-score.component.css']
})
export class TestScoreComponent implements OnInit {

  test: Array<ITest> = [];
  tests: Array<ITest> = [];
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    const tests = JSON.parse(localStorage.getItem('tests'));
    if(tests && tests.length > 0) {
      this.tests = tests;
    } else {
      this.tests = await this.loadTestsFromJSON();
    }
    this.tests = await this.loadTestsFromJSON();
    console.log('from loadTests.. ', this.tests);
  }

  async loadTestsFromJSON() {
    const data = await this.http.get('assets/tests.json').toPromise();
    console.log('from loadContacts... ', data.json());
    return data.json();
  }

  addTest() {
    const test: ITest = {
      id: null,
      testName: null,
      pointsPossible: null,
      pointsReceived: null,
      percentage: null,
      grade: null
    };
    this.tests.unshift(test);
    localStorage.setItem('tests',JSON.stringify(this.tests));

    };

    deleteTest(index: number) {
      this.tests.splice(index, 1);
      this.saveToLocalStorage();
    }

    saveToLocalStorage() {
      localStorage.setItem('tests', JSON.stringify(this.tests));
      console.log("saving to storage... ", this.tests);
      this.toastService.showToast('success', 4000, 'Success: Items Saved!');
    }

    computeGrade() {
      for(let i = 0; i < this.tests.length; i++) {
        console.log('index ', i, 'this.tests[i] ', this.tests[i]);
        this.router.navigate(['home', this.tests]);
      }
    }


  }
  

