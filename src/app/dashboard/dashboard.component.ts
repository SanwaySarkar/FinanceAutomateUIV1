import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModalModule } from './modal/modal.module'; // Import the ModalModule

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ModalModule], // Use ModalModule here
  templateUrl: './dashboard.component.html',
  styles: [`
    :host {
      display: block;
    }
    .bg-light-blue {
      background-color: #2a3b5a;
    }
    .hover\\:bg-dark-blue:hover {
      background-color: #1f2a3a;
    }
    .text-accent-blue {
      color: #4a90e2;
    }
    .btn-primary {
      background-color: #4a90e2;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      transition: background-color 0.3s ease;
    }
    .btn-primary:hover {
      background-color: #357ab8;
    }
    .form-input {
      width: 100%;
      padding: 0.5rem;
      border-radius: 0.375rem;
      border: 1px solid #ccc;
      background-color: #f7f7f7;
      color: #333;
    }
    .btn-details {
      background-color: #4a90e2;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .btn-details:hover {
      background-color: #357ab8;
    }
    .tooltip {
      position: relative;
      display: inline-block;
    }
    .tooltip .tooltiptext {
      visibility: hidden;
      width: 160px;
      background-color: #555;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      bottom: 125%; /* Position above the icon */
      left: 50%;
      margin-left: -80px;
      opacity: 0;
      transition: opacity 0.3s;
      font-size: 10px; /* Small font size */
    }
    .tooltip:hover .tooltiptext {
      visibility: visible;
      opacity: 1;
    }
    .fa-question-circle {
      color: #6b7280; /* Grey shade */
      transition: color 0.3s ease;
    }
    .fa-question-circle:hover {
      color: #4b5563; /* Darker grey on hover */
    }
  `]
})
export class DashboardComponent {
  showRetirementForm = true;
  showSpecificGoalForm = false;
  investmentPortfolio: any[] = [];
  recommendedPortfolio: any[] = [];
  planOverview: string = '';
  investmentportfolioFlag = true
  corpusAmount:number =0;
  monthlySavings:number =0;
  timeInyears: number =0;
  future_monthly_income: number =0;
  showModal = false; // Add this line
  mutFundData: any[] = [];
  retirementAge: string = '' ;
  currentAge:  string = '';
  monthlyIncome:  string = '';
  amountNeeded:  string = '';
  timeFrame:  string = '';
  monthlyExpectedSavings: string ='';
  monthlySavingsReq:string = '';
  riskTolerance: string = '';
  mutFundList: string = ''; 
  jsonAll: any;
    constructor(private http: HttpClient) {
    
  }

  fetchInvestmentPortfolio() {
    this.http.get<any[]>('your-backend-api-url/investment-portfolio').subscribe((data: any[]) => {
      this.investmentPortfolio = data; // Assign the fetched data to the investmentPortfolio array
    });
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

  filterMutFundData(assetType: string) {
    this.mutFundData = this.jsonAll.filter((fund: { categoryName: string }) => fund.categoryName === assetType);
    this.showModal = true;
  }
  isLoading: boolean = false; // Ensure this line is present

  submitRetirementForm() {
    this.isLoading = true; // Start loading animation
    // Call the backend endpoint for retirement form
    console.log('Submitting Retirement Form:', {
      retirementAge: this.retirementAge,
      currentAge: this.currentAge,
      monthlyExpectedSavings: this.monthlyExpectedSavings,
      riskTolerance: this.riskTolerance,
    });

    const formData = {
      currentAge: this.currentAge.toString(),
      retirementAge: this.retirementAge.toString(),
      riskTolerance: this.riskTolerance.toString(),
      monthlyInvestment: this.monthlyExpectedSavings.toString(),
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
        console.log('Response:', jsonData);

        this.corpusAmount = jsonData.corpusAmount;
        this.investmentPortfolio = jsonData.recommendedAllocation;
        this.planOverview = jsonData.planOverview;
        this.corpusAmount = jsonData.corpusAmount;
        this.monthlySavings = jsonData.monthlySavings;
        this.timeInyears = jsonData.timeInYear;
        this.future_monthly_income = jsonData.futureMonthlyIncome;
        this.recommendedPortfolio = jsonData.recommendedPortfolio;
        this.mutFundData = JSON.parse(response.mutFundList);

      }, error => {
        this.isLoading = false; // Stop loading animation on error
        console.error('Error submitting form', error);
      });
  }

  // Method to handle specific goal form submission
  submitSpecificGoalForm() {
    // Call the backend endpoint for specific goal form
    console.log('Submitting Specific Goal Form:', {
      amountNeeded: this.amountNeeded,
      timeFrame: this.timeFrame,
      monthlySavingsReq: this.monthlySavingsReq
    });
    // Add your HTTP request logic here
  }
}