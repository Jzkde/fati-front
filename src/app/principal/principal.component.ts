import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit{

  constructor(
        private toastr: ToastrService,
  ) { }
  ngOnInit(): void {
    this.toastr.clear();
    
  }

}
