import { Component, OnInit } from '@angular/core';
import { ExampleCreateRequest } from '../../api/examples';
import { ExampleService } from '../../services/example.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  isLoading: boolean = false;

  constructor(public exampleService: ExampleService) { }

  ngOnInit(): void {
  }

  create(){
    let request: ExampleCreateRequest = {
      name: 'AAAAAA'
    };
    this.isLoading = true;
    this.exampleService.createExample(request).subscribe(_ => {
      console.log("CREATED");
      this.isLoading = false;
    }, _ => this.isLoading = false);
  }

  list(){
    this.exampleService.listExample().subscribe(response => {
      console.log(response);
    });
  }

}
