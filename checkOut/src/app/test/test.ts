import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-test",
  templateUrl: "./test.html"
})
export class TestComponent implements OnInit {
  constructor() {

  }

  ngOnInit(): void {

  }

  required = true;

  hasError = false;
  error = 'The input has an error!';

  disabled = false;
}
