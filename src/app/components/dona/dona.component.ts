import { Component, Input, OnInit } from '@angular/core';

import { ChartData, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css'],
})
export class DonaComponent implements OnInit {
  @Input() titulo: string = 'Sin titulo';
  @Input() labels: string[] = ['Label 1', 'Label 2', 'Label 3'];
  @Input() data: number[] = [100, 100, 100];

  // Doughnut
  // public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  // public doughnutChartData: ChartData<'doughnut'>
  public doughnutChartData: any;

  constructor() {}

  ngOnInit(): void {
    this.doughnutChartData = {
      labels: this.labels,
      datasets: [{ data: this.data }],
    };
  }
}
