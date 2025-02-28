import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ModalModule } from './modal/modal.module';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router'; // Import the ModalModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ModalModule,RouterModule,ReactiveFormsModule], // Use ModalModule here
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  retirementForm: FormGroup;
  specificGoalForm: FormGroup;
  showRetirementForm = true;
  showSpecificGoalForm = false;
  isLoading: boolean = false; // Ensure this line is present
  isDarkMode = false; 
  flagRetire = false;
  flagSpecific = false;// Add this property
  corpusProgress = 0; // Add this property
  searchTerm = ''; // Add this property
  filteredPortfolio: any[] = []; // Add this property
  investmentPortfolio: any[] = [];
  recommendedPortfolio: any[] = [];
  planOverview: string = '';
  investmentportfolioFlag = true;
  corpusAmount: number = 0;
  monthlySavings: number = 0;
  timeInyears: number = 0;
  targetAmount: string = '';
  monthlyInvest: string = '';
  durationInYears: string = '';
  future_monthly_income: number = 0;
  showModal = false;
  mutFundData: any[] = [];
  retirementAge: string = '';
  currentAge: string = '';
  monthlyExpectedSavings: string = '';
  amountNeeded: string = '';
  timeFrame: string = '';
  monthlySavingsReq: string = '';
  riskTolerance: string = '';
  mutFundList: string = '';
  jsonAll: any;
  message: string = '';
  isLoggedIn: boolean = false;
  userName: string = ''; // Example user name
  dropdownOpen: boolean = false;
  

  constructor(private http: HttpClient,private authService : AuthService,private router: Router,private fb: FormBuilder) {
    this.retirementForm = this.fb.group({
      retirementAge: ['', Validators.required],
      currentAge: ['', Validators.required],
      monthlyExpectedSavings: [''],
      riskTolerance: ['', Validators.required]
    });

    this.specificGoalForm = this.fb.group({
      amountNeeded: ['', Validators.required],
      timeFrame: ['', Validators.required],
      monthlySavingsReq: ['', Validators.required],
      riskTolerance: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    
    if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('access_token');
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });    this.http.get<any>('http://localhost:8000/protected', { headers }).subscribe(
      res => {
        this.isLoggedIn = true;
        this.userName = res.message;
      },
      err => {
        console.log(err);
          this.isLoggedIn = false;
          this.logout();
      }
    );
  }
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  filterPortfolio() {
    this.filteredPortfolio = this.recommendedPortfolio.filter(fund =>
      fund.fundName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleRetirementForm() {
    if (!this.showRetirementForm) {
      this.showRetirementForm = true;
      this.showSpecificGoalForm = false;
    }
  }

  selectSpecificGoal() {
    if (!this.showSpecificGoalForm) {
      this.showSpecificGoalForm = true;
      this.showRetirementForm = false;
    }
  }

  validationMessage: string = ''; // Add this property
  showValidationModal: boolean = false; // Add this property

  openValidationModal(message: string) {
    this.validationMessage = message;
    this.showValidationModal = true; // Use separate modal flag
  }

 

  submitRetirementFormDriver(){
    if(this.authService.isLoggedIn()){
      this.submitRetirementForm();
    }
    else{
      this.authService.logout();
    }
  }

  submitRetirementForm() {
   
    this.flagSpecific = false;
    this.flagRetire = false; 
    this.isLoading = true; // Start loading animation
    // const formData = {
    //   currentAge: this.currentAge.toString(),
    //   retirementAge: this.retirementAge.toString(),
    //   riskTolerance: this.riskTolerance.toString(),
    //   monthlyInvestment: this.monthlyExpectedSavings.toString(),
    //   hasEmergencyFund: 'false',
    //   hasCorpusFund: 'false',
    //   emergencyFundAmount: '0',
    //   corpusFundAmount: '0'
    // };
    const formData = {
      currentAge: this.retirementForm.get('currentAge')?.value.toString(),
      retirementAge: this.retirementForm.get('retirementAge')?.value.toString(),
      riskTolerance: this.retirementForm.get('riskTolerance')?.value.toString(),
      monthlyInvestment: this.retirementForm.get('monthlyExpectedSavings')?.value.toString(),
      hasEmergencyFund: 'false',
      hasCorpusFund: 'false',
      emergencyFundAmount: '0',
      corpusFundAmount: '0'
    };

    this.http.post('http://localhost:8000/uploadDetailsRetirement', formData)
      .subscribe((res: any) => {
        this.isLoading = false; // Stop loading animation
        const response = res;
        const jsonString = JSON.stringify(response.response);
        const jsonData: any = JSON.parse(jsonString);
        this.jsonAll = JSON.parse(response.mutFundList);
        this.corpusAmount = jsonData.corpusAmount;
        this.investmentPortfolio = jsonData.recommendedAllocation;
        this.planOverview = jsonData.planOverview;
        this.corpusAmount = jsonData.corpusAmount;
        this.monthlySavings = jsonData.monthlySavings;
        this.timeInyears = jsonData.timeInYear;
        this.future_monthly_income = jsonData.futureMonthlyIncome;
        this.recommendedPortfolio = jsonData.recommendedPortfolio;
        this.mutFundData = JSON.parse(response.mutFundList);
        this.flagRetire = true
        this.filterPortfolio(); // Update filtered portfolio
      }, error => {
        this.isLoading = false; // Stop loading animation on error
        console.error('Error submitting form', error);
      });
  }

  submitSpecificGoalForm() {
    this.isLoading = true;
    this.flagSpecific = false;
    this.flagRetire = false; // Start loading animation
    // const formData = {
    //   targetAmount: this.amountNeeded,
    //   timeFrame: this.timeFrame,
    //   monthlyInvestment: this.monthlySavingsReq,
    //   riskTolerance: this.riskTolerance.toString(),
    // };
    const formData = {
      targetAmount: this.specificGoalForm.get('amountNeeded')?.value.toString(),
      timeFrame: this.specificGoalForm.get('timeFrame')?.value.toString(),
      monthlyInvestment: this.specificGoalForm.get('monthlySavingsReq')?.value.toString(),
      riskTolerance: this.specificGoalForm.get('riskTolerance')?.value.toString(),
    };

    this.http.post('http://localhost:8000/uploadDetailsSpecificGoal', formData)
      .subscribe((res: any) => {
        this.isLoading = false; // Stop loading animation
        // Handle response
        this.mutFundData = JSON.parse(res.mutFundList);
        const jsonString = JSON.stringify(res.response);
        const jsonData: any = JSON.parse(jsonString);
        this.jsonAll = JSON.parse(res.mutFundList);
        this.planOverview = jsonData.planOverview;
        this.recommendedPortfolio = jsonData.recommendedPortfolio;
        this.investmentPortfolio = jsonData.recommendedAllocation;
        this.targetAmount = jsonData.targetAmount;
        this.monthlyInvest = jsonData.monthlyInvest;
        this.durationInYears = jsonData.durationInYears;
        this.flagSpecific = true;

      }, error => {
        this.isLoading = false; // Stop loading animation on error
        console.error('Error submitting form', error);
      });
  }

  filterMutFundData(assetType: string) {
    this.mutFundData = this.jsonAll.filter((fund: { categoryName: string }) => fund.categoryName === assetType);
    this.showModal = true;
  }
}