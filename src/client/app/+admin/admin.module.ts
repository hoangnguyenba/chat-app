import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { ContentHeaderService } from './shared/content-header.service';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [AdminComponent],
    exports: [AdminComponent],
    providers: [ContentHeaderService]
})

export default class AdminModule { }
