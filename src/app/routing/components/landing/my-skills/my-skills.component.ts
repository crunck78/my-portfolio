import { Component } from '@angular/core';
import { MySkillsModule } from './my-skills.module';

@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss'],
  imports: [MySkillsModule],
})
export class MySkillsComponent {}
