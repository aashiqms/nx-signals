import { Component } from '@angular/core';
import { NxWelcomeComponent } from './nx-welcome.component';
import { DemoNgZorroAntdModule } from './ng-zorro-ant.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [   
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
     NxWelcomeComponent, DemoNgZorroAntdModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
      }

      .trigger:hover {
        color: #1890ff;
      }

      .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
      }

      nz-header {
        background: #fff;
        padding: 0;
      }

      nz-content {
        margin: 0 16px;
      }

      nz-breadcrumb {
        margin: 16px 0;
      }

      .inner-content {
        padding: 24px;
        background: #fff;
        min-height: 360px;
      }

      nz-footer {
        text-align: center;
      }
    `
  ]
})
export class AppComponent {
  title = 'poc-workspace';
  isCollapsed = false;

}
