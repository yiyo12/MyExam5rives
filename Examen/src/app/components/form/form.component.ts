import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PersonasService } from 'src/app/services/personas.service';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from "@angular/router";
import { People } from '../models/persona.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  public myForm: FormGroup;
  private unsuscribers$ = new Subject<void>();
  public personaModel: People | any;
  public edit: boolean = false;
  constructor(public fb: FormBuilder, private personaService: PersonasService,
    private route: Router, private activeRoute: ActivatedRoute) {
    this.myForm = this.fb.group({
      nombres: ['', [Validators.required,Validators.maxLength(40)]],
      apellidoP: ['', [Validators.required,Validators.maxLength(60)]],
      estado: ['', [Validators.required,Validators.maxLength(20)]],
      ciudad: ['', [Validators.required,Validators.maxLength(20)]],
      calle: ['', [Validators.required,Validators.maxLength(40)]],
      numExt: ['', [Validators.required,Validators.maxLength(3)]],
      idCliente: [''],

    });
  }
  ngOnDestroy(): void {
    this.unsuscribers$.next();
    this.unsuscribers$.complete();
  }

  onEdit(): void {
    const parametrosRuta = this.activeRoute.snapshot.params;
    
    if (parametrosRuta.idCliente) {
      console.log(parametrosRuta.idCliente);
      this.personaService.getPeople(parametrosRuta.idCliente).pipe(takeUntil(this.unsuscribers$))
        .subscribe(response => {
          console.log(response);
          this.edit = true;
          this.personaModel = response;
          this.myForm.get('nombres')?.setValue(this.personaModel[0].nombres);
          this.myForm.get('apellidoP')?.setValue(this.personaModel[0].apellidoP);
           this.myForm.get('estado')?.setValue(this.personaModel[0].estado);
           this.myForm.get('ciudad')?.setValue(this.personaModel[0].ciudad);
           this.myForm.get('calle')?.setValue(this.personaModel[0].calle);
           this.myForm.get('numExt')?.setValue(this.personaModel[0].numExt);
          if (this.edit) {
            this.myForm.get('idCliente')?.setValue(this.personaModel[0].idCliente);

          }
           
        });
    }
  }

  ngOnInit(): void {
    this.onEdit();

  }

  saveData() {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: 'Estas por guardar este registro de tu base de datos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Quiero registrarlo',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Guardado!',
          'Haz guardado el registro!',
          'success'
        )
        this.personaService.savePeople(this.myForm.value).pipe(takeUntil(this.unsuscribers$))
          .subscribe(response => { this.route.navigate(['/Persona']); });;

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'No guardaste el registro',
          'error'
        )
      }
    })
  }

  editPeople() {
    this.personaService.updatePeople(this.personaModel?.telefono, this.myForm.value).pipe(takeUntil(this.unsuscribers$))
      .subscribe(response => { this.route.navigate(['/Persona']); });;
  }
}
