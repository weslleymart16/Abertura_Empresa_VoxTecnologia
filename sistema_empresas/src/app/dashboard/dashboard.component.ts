import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from '../shared/models/company';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  showEditCompay: boolean = false;
  private subscriptions = new Subscription();
  companiesSaved!: Company[];
  companyById!: Company;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.savedOpeningRequests();
  }

  savedOpeningRequests() {
    this.subscriptions.add(
      this.dashboardService.getAll().subscribe((response) => {
        this.companiesSaved = response;
      })
    );
  }

  viewCompany(id: number) {
    this.subscriptions.add(
      this.dashboardService.getById(id).subscribe((response) => {
        this.companyById = response;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  refreshView() {
    this.showEditCompay = false;
    this.companyById = {} as Company;
    this.savedOpeningRequests();
  }
}
