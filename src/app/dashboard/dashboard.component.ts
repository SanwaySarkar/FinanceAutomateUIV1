import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Add HttpClientModule here
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
  `]
})
export class DashboardComponent {
  showRetirementForm = false;
  showSpecificGoalForm = false;
  investmentPortfolio: any[] = [];
  investmentportfolioFlag = true
  data = {'planOverview': 'To achieve the target corpus of ₹152,731,698 by the age of 50 with a monthly investment of ₹115,109, the following portfolio allocation is recommended. The plan focuses on diversification across different asset types to mitigate risk while maximizing returns.', 'corpusAmount': '152731698', 'recommendedPortfolio': [{'assetType': 'Mid Cap Fund', 'allocationPercentage': 30, 'fundName': 'Motilal Oswal Midcap Fund - Direct Plan - Growth', 'allocationAmount': 34532, '1W': '-8.74%', '1M': '30.29%', '3M': '-8.74%', '6M': '-4.89%', '1Y': '30.29%', '2Y': '39.57%', '3Y': '29.48%', '5Y': '28.82%', '10Y': '19.08%', 'averageReturn': 23.96, 'reason': 'High average return, excellent Crisil rating, and strong long-term performance make this fund ideal for high growth.'}, {'assetType': 'Focused Fund', 'allocationPercentage': 25, 'fundName': 'HDFC Focused 30 Fund - Direct Plan - Growth', 'allocationAmount': 28777, '1W': '-3.73%', '1M': '20.17%', '3M': '-3.73%', '6M': '-1.96%', '1Y': '20.17%', '2Y': '27.87%', '3Y': '23.63%', '5Y': '23.50%', '10Y': '14.40%', 'averageReturn': 18.51, 'reason': 'Consistent returns, high Crisil rating, and moderate risk make this fund suitable for stable growth.'}, {'assetType': 'Flexi Cap Fund', 'allocationPercentage': 20, 'fundName': 'Parag Parikh Flexi Cap Fund - Direct Plan - Growth', 'allocationAmount': 23022, '1W': '-0.08%', '1M': '20.50%', '3M': '-0.08%', '6M': '2.37%', '1Y': '20.50%', '2Y': '28.85%', '3Y': '18.68%', '5Y': '24.84%', '10Y': '18.12%', 'averageReturn': 20.15, 'reason': 'Diversified portfolio, high average return, and flexibility in investment strategy make this fund attractive.'}, {'assetType': 'Large & Mid Cap Fund', 'allocationPercentage': 15, 'fundName': 'Quant Large and Mid Cap Fund - Direct Plan - Growth', 'allocationAmount': 17266, '1W': '-8.01%', '1M': '8.34%', '3M': '-8.01%', '6M': '-14.04%', '1Y': '8.34%', '2Y': '27.09%', '3Y': '21.14%', '5Y': '25.04%', '10Y': '17.53%', 'averageReturn': 18.93, 'reason': 'Balanced approach, decent returns, and moderate risk make this fund a good addition for diversification.'}, {'assetType': 'Index Funds/ETFs', 'allocationPercentage': 10, 'fundName': 'UTI Nifty 50 Index Fund - Direct Plan - Growth', 'allocationAmount': 11511, '1W': '-7.00%', '1M': '6.00%', '3M': '-7.00%', '6M': '-5.00%', '1Y': '6.00%', '2Y': '14.00%', '3Y': '9.00%', '5Y': '14.00%', '10Y': '12.00%', 'averageReturn': 11.27, 'reason': 'Low risk, stable returns, and diversification benefits make this fund a safe choice for the portfolio.'}], 'recommendedAllocation': [{'assetType': 'Mid Cap Fund', 'allocationPercentage': '30%'}, {'assetType': 'Focused Fund', 'allocationPercentage': '25%'}, {'assetType': 'Flexi Cap Fund', 'allocationPercentage': '20%'}, {'assetType': 'Large & Mid Cap Fund', 'allocationPercentage': '15%'}, {'assetType': 'Index Funds/ETFs', 'allocationPercentage': '10%'}]};

  constructor(private http: HttpClient) {
    this.investmentPortfolio = this.data.recommendedAllocation
    this.showRetirementForm = true;
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
}