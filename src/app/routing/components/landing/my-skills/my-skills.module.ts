import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySkillsComponent } from './my-skills.component';
import { SkillComponent } from './skill/skill.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [MySkillsComponent, SkillComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [MySkillsComponent]
})
export class MySkillsModule { }
