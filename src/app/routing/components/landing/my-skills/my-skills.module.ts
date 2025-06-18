import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SkillComponent } from './skill/skill.component';

const dependencies = [SkillComponent, SharedModule];

@NgModule({
  declarations: [],
  imports: [...dependencies],
  exports: [...dependencies],
})
export class MySkillsModule {}
